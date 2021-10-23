# Libs using in Project

> Custom Fonts
* how install
`expo install expo-font @expo-google-fonts/Roboto`

> Lib Expo App Loading
* how install
`expo install expo-app-loading`

> Lib react-native-svg / for using svg in app
* how install / Create file in ./ metro.config.js
* Definir types para reconher os arquivos .svg
  criar pasta @types no ./ e criar o arquivo svg.d.ts e png.d.ts
`expo install react-native-svg`
`yarn add --dev react-native-svg-transformer`
* link lib: https://github.com/kristerkari/react-native-svg-transformer

> Lib React-native-iphone-x-helper
* how install
`yarn add react-native-iphone-x-helper`

> Lib linear-gradient
* how install
`expo install expo-linear-gradient`

> Lib moti - animation
* how install and add plugin in babel.config.js 
** {
     plugins: ['react-native-reanimated/plugin']
   }
`yarn add moti`
`expo install react-native-reanimated`

> Lib expo-auth-session and expo-random
* how install
`expo install expo-auth-session expo-random`

> Lib axios
* how install
`yarn add axios`

> Lib @react-native-async-storage/async-storage
* how install
`expo install @react-native-async-storage/async-storage`


> Lib socket.io
* how install
`yarn add socket.io-client`

> Steps of Project
* Install fonts
* Config fonts in app.tsx
* Install lib AppLoading
* Config theme and StatusBar app.tsx
* Create folders components
* Create component Header
* Create component Message
* Create component MessageList
* Creating animation with moti in component Message
* Creating Component button
* Creating Component SignInbox
* Creating Component SendMessageForm
* Creating Hooks, using an context
* Creating Authentication with GITHUB
* Creating Acessando a API, Authenticate
* Saving info user in AsyncStorage using async-storage expo
* Conecting with API socket and listing all messages in realtime
  using socket.io-client
