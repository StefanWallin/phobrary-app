import { StyleSheet } from 'react-native';
import colors from '~config/colors';

export default StyleSheet.create({
  buttonTouchable: {
    alignSelf: 'center',
    borderRadius: 40,
  },
  button_type_primary_touchable: {
    backgroundColor: 'transparent',
  },
  button: {
    borderRadius: 40,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  button_primary: {
    borderColor: colors.white,
    borderWidth: 0.5,
    borderRadius: 40,
  },
  button_type_primary_pressed: {
    backgroundColor: `rgba(
      ${colors.hexToRgb(colors.white).r},
      ${colors.hexToRgb(colors.white).g},
      ${colors.hexToRgb(colors.white).b},
      0.4)`,
  },
  text_type_link_pressed: {
    color: colors.grey,
  },
  button_link: {
    borderWidth: 0,
  },
  text: {
    color: colors.white,
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 16,
    marginTop: -3,
    fontWeight: '100',
  },
  text_primary: {
    fontSize: 22,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
