import React, { useState } from 'react'

import {
  Alert,
  Keyboard,
  TextInput,
  View
} from 'react-native'
import { api } from '../../services/api'

import { COLORS } from '../../theme'
import { Button } from '../Button'

import { styles } from './styles'

export function SendMessageForm() {
  const [message, setMessage] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)

  async function handleMessageSubmit() {
    const messageFormatted = message.trim()

    if (messageFormatted.length > 0) {
      try {
        setSendingMessage(true)
        await api.post('/messages', { message: messageFormatted })

        setMessage('')
        Keyboard.dismiss()
        Alert.alert('Mensagem enviada com sucesso !')
      } catch (error) {
        Alert.alert('Erro ao enviar mensagem.')
      } finally {
        setSendingMessage(false)
      }

    } else {
      Alert.alert('Escreva uma mensagem para enviar.')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento ?"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        onChangeText={setMessage}
        value={message}
        style={styles.textInput}
        editable={!sendingMessage}
      />

      <Button
        title="ENVIAR MENSAGEM"
        color={COLORS.WHITE}
        backgroundColor={COLORS.PINK}
        onPress={handleMessageSubmit}
        isLoading={sendingMessage}
      />
    </View>
  );
}