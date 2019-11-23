import CryptoJS from 'crypto-js';

/**
 * Crypto replacement using crypto-js
 *
 * @module otplib-cryptojs/crypto
 */
class CryptoExpo {
  constructor(algorithm, secret) {
    this.algorithm = algorithm.toLowerCase();
    this.secret = secret.toString('ascii');
  }

  static createHmac(algorithm, hmacSecret) {
    return new CryptoExpo(algorithm, hmacSecret);
  }

  update(bufferHex) {
    this.hex = bufferHex.toString('hex');
    return this;
  }

  getEncoder() {
    switch (this.algorithm) {
      case 'sha1':
        return CryptoJS.HmacSHA1;
      case 'sha256':
        return CryptoJS.HmacSHA256;
      case 'sha512':
        return CryptoJS.HmacSHA512;
      default:
        throw new Error(
          `Unsupported algorithm ${
            this.algorithm
          }. Accepts: sha1, sha256, sha512`
        );
    }
  }

  digest() {
    const encoder = this.getEncoder();
    const message = CryptoJS.enc.Hex.parse(this.hex);
    const strDigest = String(encoder(message, this.secret));
    return Buffer.from(strDigest, 'hex');
  }
}

export default CryptoExpo;
