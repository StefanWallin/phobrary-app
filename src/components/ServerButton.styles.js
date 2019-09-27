import { StyleSheet } from 'react-native';
import colors from '~config/colors';

export default StyleSheet.create({
  buttonTouchable: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  button: {
    paddingLeft: 20,
    paddingRight: 20,
    borderTopColor: colors.white,
    borderTopWidth: 0.5,
    width: '100%',
  },
  button_pressed: {
    backgroundColor: `rgba(
      ${colors.hexToRgb(colors.white).r},
      ${colors.hexToRgb(colors.white).g},
      ${colors.hexToRgb(colors.white).b},
      0.4)`,
  },
  text: {
    color: colors.white,
    backgroundColor: 'transparent',
    marginTop: -3,
    fontWeight: '100',
    fontSize: 22,
    paddingTop: 10,
    paddingBottom: 5,
  },
  sub_text: {
    color: colors.white,
    fontSize: 16,
    paddingBottom: 10,
  }
});
