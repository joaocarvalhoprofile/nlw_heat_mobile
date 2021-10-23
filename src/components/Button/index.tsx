import React from 'react'
import {
  ActivityIndicator,
  Text,
  ColorValue,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { styles } from './styles'

type Props = TouchableOpacityProps & {
  title: string
  color: ColorValue
  backgroundColor: ColorValue
  icon?: React.ComponentProps<typeof AntDesign>['name']
  isLoading?: boolean
}

export function Button({
  title,
  color,
  backgroundColor,
  icon,
  isLoading = false,
  ...rest }: Props
) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >

      {
        isLoading ?
          <>
            <ActivityIndicator color={color} />
            <Text style={[styles.buttonTitle, { color }]}>
              Aguarde...
            </Text>
          </>
          :
          <>
            <AntDesign name={icon} size={24} style={styles.icon} />
            <Text style={[styles.buttonTitle, { color }]}>
              {title}
            </Text>
          </>
      }
    </TouchableOpacity>
  );
}