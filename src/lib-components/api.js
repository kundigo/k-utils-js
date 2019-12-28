import axios from 'axios'
import Utils from './utils.js'


class Api {

  static setCSRFToken(){
    //axios.defaults.headers.common['X-CSRF-Token'] = RailsCsrfToken.get();
    axios.defaults.headers.common['Accept'] = 'application/json';
  }

  static setCancelToken (url) {
    const tokenSource =  this.getCancelToken(url);
    if (!Utils.isBlank(tokenSource)) {
      tokenSource.cancel(`${url} request canceled by the user.`);
    }
    this.cancelTokenSources[url] = axios.CancelToken.source();
  }

  static getCancelToken (url) {
    return this.cancelTokenSources[url];
  }

  static later(delay, value) {
    return new Promise(function(resolve) {
      setTimeout(resolve, delay, value);
    });
  }

  static axiosRequest({url, data, method, onSuccess, onError, cancelToken}){
    return new Promise((resolve) =>
      axios({ method, url, data, cancelToken })
        .then(response => {
          onSuccess(response);
          resolve();
        })
        .catch(response => {
          onError(response);
          resolve();
        })
    )
  }

  static sendRequest ({url, data, method, onSuccess, onError, delay}) {
    this.setCSRFToken();
    this.setCancelToken(url);

    let cancelToken =  this.getCancelToken(url).token;

    // returning a promise is a way to mimic the complete function of JQuery, when it is needed
    let axiosArguments = {
      url: url,
      data: data,
      method: method,
      onSuccess: onSuccess,
      onError: onError,
      cancelToken: cancelToken
    };

    let delay_in_ms = 300;

    if (window && window.AppInfo && AppInfo.railsEnv === 'test') { delay_in_ms = 5 }  // speeds up the tests

    if (Utils.isTruthy(delay) && delay_in_ms > 0) {
      return this.later(delay_in_ms, axiosArguments).then(this.axiosRequest)
    } else {
      return this.axiosRequest(axiosArguments)
    }
  }
}


Api.cancelTokenSources = {};
Api.active = 0;

// keep track of the 'active' API requests
axios.interceptors.request.use(function (config) {
  Api.active += 1;
  // console.log(`Api request, opening, now ${Api.active} open requests`);
  return config;
}, function (error) {
  Api.active -= 1;
  //console.log(`Api request, error, ${Api.active} open requests`);
  return Promise.reject(error);
});

axios.interceptors.response.use(function(response) {
  Api.active -= 1;
  //console.log(`Api response, closing, ${Api.active} open requests`);
  return response;
}, function(error) {
  Api.active -= 1;
  //console.log(`Api response, error, closing, ${Api.active} open requests`);
  return Promise.reject(error);
});

window.Api = Api;
export default Api