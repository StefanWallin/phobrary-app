import urijs from "urijs";
import { connect } from 'react-redux';
import config from "~config/config";
import AnySuccesfulPromise from "~lib/anySuccessfulPromise";
import store from '~src/store';

import { totp } from '~lib/totp';

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
  if(!host || !path) throw new Error();
  const uri = urijs(`http://${host}`)
    .pathname(path)
    .search(Api.searchPart())
    .toString();
  const fetchOptions = {
    ...defaultFetchOptions,
    ...options,
  };
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
    // Another new promise is a work around for sagas attaching then and catch
    // dynamically which can happen later than catch actually triggered by request.
    return new Promise((resolve, reject) => {
      const hostPromises = [];
      const { port } = server;
      hosts.forEach(host => {
        const enrichResult = { host, server, port };
        const address = `${host}:${port}`;
        hostPromises.push(Api.getStatus(address, enrichResult));
      });
      new AnySuccesfulPromise(hostPromises).then(resolve).catch(reject);
    });
  }

  static getStatus(address, enrichResult) {
    return new Promise((resolve, reject) => {
      request(address, apiPaths.showStatus).then((result) => {
        result.json().then((json) => {
          if(json.status == 'ok') {
            resolve({ ...json, ...enrichResult});
          } else {
            reject({ ...json, ...enrichResult});
          }
        }).catch(reject);
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
      })
    }
    const { selectedServer } = state.network;
    const { preferredHost, port }  = selectedServer;
    const requestPromise = request(`${preferredHost}:${port}`, apiPaths.createSession, options)
    const failCallback = (error) => { return null; };
    return Api.parseJSON(requestPromise, selectedServer, failCallback)
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
    const secret = store.getState().session.secret;
    const totpCode = totp.generate(secret)
    return { 'X-PHOB-TOTP': totpCode };
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
