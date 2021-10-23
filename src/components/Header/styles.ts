import { StyleSheet } from 'react-native'

import { COLORS, FONTS } from '../../theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoutText: {
    marginRight: 20,
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
  }
})