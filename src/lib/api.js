// Shimming node crypto library for OTP generation
// var buffer = require('safe-buffer')
// const createHmac = require('create-hmac');
// const randomBytes = require('randombytes');
// const crypto = { createHmac, randomBytes };
// module.exports = crypto;

// import authenticator from 'otplib/authenticator';
// const override = { crypto: { createHmac, randomBytes }, buffer };
// authenticator.defaultOptions = override;
// totp.defaultOptions = override;
// hotp.defaultOptions = override;
// End shimming


import urijs from "urijs";
import { connect } from 'react-redux';
import config from "~config/config";
import AnySuccesfulPromise from "~lib/anySuccessfulPromise";
import store from '~src/store';

// console.log("OTP:", otp);

const apiPaths = {
  showStatus: "/api/status/v1/",
  createPhoto: "/api/photos/v1/",
  createSession: "/api/sessions/v1/",
};

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const defaultFetchOptions = {
  headers: new Headers(defaultHeaders),
  method: 'get',
}


function request(host, path, options) {
  if(!host || !path) throw new ArgumentError();
  const uri = urijs(`http://${host}`)
    .pathname(path)
    .search(Api.searchPart())
    .toString();
  const fetchOptions = {
    ...defaultFetchOptions,
    ...options,
  };
  console.log("fetching: ", uri, fetchOptions);
  return
  return fetch(uri, fetchOptions);
}

class Api {
  static parseJSON(requestPromise, enrichResult, failCallback) {
    return new Promise((resolve, reject) => {
      requestPromise.then((result)=> {
        result.json().then((json)=> {
          if (json.status === 'ok') {
            resolve({ ...json, ...enrichResult });
          }
          reject({ ...json, ...enrichResult });
        }).catch((error) => {
          failCallback(error);
          reject(error);
        });
      }).catch((error) => {
        console.log("error", error);
        failCallback(error);
        reject(error);
      });
    });
  }

  static searchPart() {
    const { appVersion } = config;
    const { deviceId } = store.getState().device;
    return {
      "app_version": appVersion,
      "device_id": deviceId,
    };
  }


  static discoverConnectableHost(hosts, server) {
    const hostPromises = [];
    hosts.forEach(host => {
      const port = server.port;
      const enrichResult = { host, server, port };
      hostPromises.push(Api.status(host, port, enrichResult));
    });
    return new AnySuccesfulPromise(hostPromises);
  }

  static status(host, port, enrichResult) {
    return new Promise((resolve, reject) => {
      const failCallback = (error) => { console.info(error); };
      request(`${host}:${port}`, apiPaths.showStatus).then((result) => {
        resolve({ result, ...enrichResult})
      }).catch(reject);
    });
  }

  static createSession(one_time_code) {
    const state = store.getState();

    const options = {
      method: 'post',
      body: JSON.stringify({ one_time_code: one_time_code.toLowerCase() }),
      headers: new Headers({
        ...defaultHeaders,
        ...Api.totpHeader(),
      })
    }
    const requestPromise = request(state.network.uri, apiPaths.createSession, options)
    const failCallback = (error) => { console.error(error); };
    const enrichResult = {
      selectedServer: {
        ...state.network.selectedServer
      }
    }
    return Api.parseJSON(requestPromise, enrichResult, failCallback)
  }
  static authorizedHeaders() {
    return {
      headers: new Headers({
        ...defaultHeaders,
        ...Api.totpHeader(),
        ...Api.accessTokenHeader()
      })
    }
  }
  static totpHeader() {
    try{
      const secret = store.getState().network.selectedServer.secret;
      // const totp = authenticator.generate(secret)
      const totp = '';
      return { 'X-PHOB-TOTP': totp };
    } catch (e) {
      console.warn("BLARG!! ", e);
    }
  }
  static accessTokenHeader() {
    return { 'X-PHOB-Token': ''}
  }
  // static createPhoto(fileObj, metadata, token) {
  //   const state = store.getState();
  //   const uploadData = new FormData();
  //   uploadData.append('raw_file', fileObj);
  //   uploadData.append('metadata', JSON.stringify(imageNode));
  //
  //   const options = {
  //     method: 'post',
  //     headers: authorizedHeaders(),
  //     body: uploadData,
  //   }
  //
  //   return request(state.network.uri, apiPaths.createPhoto, options);
  // }


};

export default Api;
