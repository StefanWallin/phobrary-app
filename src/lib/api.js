import urijs from "urijs";
import config from "~config/config";
import AnySuccesfulPromise from "~lib/anySuccessfulPromise";

const apiPaths = {
  showStatus: "/api/status/v1/",
  createPhoto: "/api/photos/v1/"
};

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const defaultFetchOptions = {
  headers: new Headers(defaultHeaders),
  method: 'get',
}

function searchPart() {
  const { appVersion, deviceId } = config;
  return { appVersion, deviceId };
}

function request(host, path, options) {
  const uri = urijs(`http://${host}`)
    .pathname(path)
    .search(searchPart())
    .toString();
  const fetchOptions = {
    ...defaultFetchOptions,
    ...options,
  };
  return fetch(uri, fetchOptions);
}

function discoverConnectableHost(hosts, server) {
  const hostPromises = [];
  hosts.forEach(host => {
    hostPromises.push(status(host, server));
  });
  return new AnySuccesfulPromise(hostPromises);
}

function status(host, server) {
  return new Promise(function(resolve, reject) {
    let port = server.port;
    fetchResult = request(`${host}:${port}`, apiPaths.showStatus);
    fetchResult.then((result) => {
      resolve({ host, server, port, success: true, ...result });
    }).catch((result) => {
      reject({ host, server, port, success: false, ...result });
    });
  });
}

function createPhoto(fileObj, metadata, token) {
  let uploadData = new FormData();
  const options = {
    method: 'post',
    headers: authorizedHeaders(token),
    body: uploadData,
  }
  uploadData.append('raw_file', fileObj);
  uploadData.append('metadata', JSON.stringify(imageNode));

  return request(host, apiPaths.createPhoto, options);
}

function createSession() {
  console.error("NotImplementedYet");
  return
}

export default {
  createSession,
  discoverConnectableHost,
  status,
};
