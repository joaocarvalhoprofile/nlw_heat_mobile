import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

import * as AuthSessions from 'expo-auth-session'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { api } from '../services/api'
import { Alert } from 'react-native'
export { api } from '../services/api'
type User = {
  id: string
  name: string
  login: string
  avatar_url: string
}

const CLIENT_ID = 'ba320ea198c77987c262'
const SCOPE = 'read:user'
const USER_STORAGE = '@nlwheat:user'
const TOKEN_STORAGE = '@nlwheat:token'

type AuthContextData = {
  user: User | null
  isSigningIn: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthResponse = {
  token: string
  user: User
}

type AuthorizationResponse = {
  params: {
    code?: string
    error?: string
  },
  type?: string
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [isSigningIn, setIsSigningIn] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  async function signIn() {
    try {
      setIsSigningIn(true)
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
      const authSessionResponse = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponse;

      if (authSessionResponse.type === 'success' && authSessionResponse.params.code != 'access_denied') {
        const authResponse = await api.post<AuthResponse>('/authenticate', { code: authSessionResponse.params.code })
        const { user, token } = authResponse.data

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
        await AsyncStorage.setItem(TOKEN_STORAGE, JSON.stringify(token))
        setUser(user)
      }
    } catch (error) {
      Alert.alert("Houve um erro fazer login com GITHUB")
    } finally {
      setIsSigningIn(false)
    }
  }

  async function signOut() {
    setUser(null)

    await AsyncStorage.removeItem(USER_STORAGE)
    await AsyncStorage.removeItem(TOKEN_STORAGE)
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE)
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE)

      if (userStorage && tokenStorage) {
        api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(tokenStorage)}`
        setUser(JSON.parse(userStorage))
      }

      setIsSigningIn(false)
    }

    loadUserStorageData()
  }, [])

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isSigningIn }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth }