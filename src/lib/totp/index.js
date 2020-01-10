import hotp from 'otplib/hotp';
import totp from 'otplib/totp';
import authenticator from 'otplib/authenticator';
import crypto from './crypto';
/**
 * This is to supply the custom node-replica crypto lib to otplib
 */
authenticator.defaultOptions = { crypto };
hotp.defaultOptions = { crypto };
totp.defaultOptions = { crypto };
export { authenticator, hotp, totp };


// import { totp } from '~lib/totp';
// const secret = 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD';
// try {
//   const isValid = totp.verify({token: 'blarb', secret })
//   Alert.alert("isValid: " + isValid);
// } catch (err) {
//   // Error possibly thrown by the thirty-two package
//   // 'Invalid input - it is not base32 encoded string'
//   Alert.alert("error: " + err);
// }
