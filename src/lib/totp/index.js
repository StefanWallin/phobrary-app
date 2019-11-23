import hotp from 'otplib/hotp';
import totp from 'otplib/totp';
import authenticator from 'otplib/authenticator';
import crypto from './crypto';
import Buffer from 'buffer';
global.Buffer = Buffer;
/**
 * otplib
 *
 * One-Time Password Library
 *
 * ```js
 * {
 *    authenticator // instance
 *    hotp // instance
 *    totp // instance
 * }
 * ```
 *
 * @module otplib
 * @since 3.0.0
 */
authenticator.defaultOptions = { crypto, Buffer };
hotp.defaultOptions = { crypto, Buffer };
totp.defaultOptions = { crypto, Buffer };

export { authenticator, hotp, totp };
