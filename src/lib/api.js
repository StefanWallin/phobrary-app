import urijs from "urijs";
import config from "~config/config";
import AnySuccesfulPromise from "~lib/anySuccessfulPromise";

const apiPaths = {
  status: "/api/status/v1/"
};

const defaultHeaders = {
  headers: new Headers({
    Accept: "application/json",
    "Content-Type": "application/json"
  })
};

function searchPart() {
  const { appVersion, deviceId } = config;
  return { appVersion, deviceId };
}

function request(host, path, headers = defaultHeaders) {
  const uri = urijs(host)
    .pathname(path)
    .search(searchPart())
    .toString();
  return fetch(uri, headers);
}

function discoverConnectableHost(hosts, server) {
  const hostPromises = [];
  hosts.forEach(host => {
    hostPromises.push(wrappedStatus(host, server));
  });
  return new AnySuccesfulPromise(hostPromises);
}

function wrappedStatus(host, server) {
  return new Promise(function(resolve, reject) {
    let port = server.port;
    fetchResult = status(host, port)
    fetchResult.then((result) => {
      resolve({ host, server, port, success: true, ...result });
    }).catch((result) => {
      reject({ host, server, port, success: false, ...result });
    });
  });
}

function status(host, port) {
  return request(`http://${host}:${port}`, apiPaths.status);
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
