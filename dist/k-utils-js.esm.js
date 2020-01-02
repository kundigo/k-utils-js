import n from"axios";import{Utils as t}from"k-utils-js";import e from"moment";function r(n,t){var e={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&-1===t.indexOf(r)&&(e[r]=n[r]);return e}var o=function(){};o.setCSRFToken=function(){n.defaults.headers.common.Accept="application/json",n.defaults.headers.common["X-Requested-With"]="XMLHttpRequest"},o.setCancelToken=function(e){var r=this.getCancelToken(e);t.isBlank(r)||r.cancel(e+" request canceled by the user."),this.cancelTokenSources[e]=n.CancelToken.source()},o.getCancelToken=function(n){return this.cancelTokenSources[n]},o.later=function(n,t){return new Promise((function(e){setTimeout(e,n,t)}))},o.axiosRequest=function(t){var e=t.onSuccess,o=t.onError,i=r(t,["onSuccess","onError"]);return new Promise((function(t){return n(i).then((function(n){e(n),t()})).catch((function(n){o(n),t()}))}))},o.sendRequest=function(n){var e=n.delay,o=n.url,i=r(n,["delay","url"]);this.setCSRFToken(),this.setCancelToken(o);var u=this.getCancelToken(o).token,s=Object.assign(i,{url:o,cancelToken:u}),c=300;return window&&window.AppInfo&&"test"===AppInfo.railsEnv&&(c=5),t.isTruthy(e)&&c>0?this.later(c,s).then(this.axiosRequest):this.axiosRequest(s)},o.cancelTokenSources={},o.active=0,n.interceptors.request.use((function(n){return o.active+=1,n}),(function(n){return o.active-=1,Promise.reject(n)})),n.interceptors.response.use((function(n){return o.active-=1,n}),(function(n){return o.active-=1,Promise.reject(n)})),window.Api=o;var i={isString:function(n){return"string"==typeof n},isUndefined:function(n){return void 0===n},isUndefinedOrNull:function(n){return this.isUndefined(n)||null===n},isEmpty:function(n){return this.isObject(n)?0===Object.keys(n).length:this.isString(n)?0===n.length:void 0},isNotEmpty:function(n){return!this.isEmpty(n)},isBlank:function(n){return this.isUndefinedOrNull(n)||this.isEmpty(n)},isFalsy:function(n){return this.isBlank(n)||!1===n},isTruthy:function(n){return!this.isFalsy(n)},isUUID:function(n){return"string"==typeof n&&/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(n)},toUnderscore:function(n){return"string"==typeof n?n.replace(/([A-Z])/g,(function(n){return"_"+n.toLowerCase()})):n},toLowerCamelCase:function(n){return"string"==typeof n?n.replace(/(_[a-z])/g,(function(n){return n.toUpperCase().replace("_","")})):n},isObject:function(n){return"object"==typeof n},isArray:function(n){return n.constructor===Array},isFunction:function(n){return"function"==typeof n},noop:function(){},getMaxOfArray:function(n){return Math.max.apply(null,n)},compareStrings:function(n,t){return n.localeCompare(t)},compareNumbers:function(n,t){return n-t},generateIntegerHashFromString:function(n){for(var t=5381,e=n.length;e;)t=33*t^n.charCodeAt(--e);return t>>>0},dateHasIsoFormat:function(n){return n.match(/^\d{4}[\-](0[1-9]|1[012])[\-](0[1-9]|[12][0-9]|3[01])$/)},dateTimeHasIsoFormat:function(n){return n.match(/^\d{4}[\-](0[1-9]|1[012])[\-](0[1-9]|[12][0-9]|3[01]) ([01][0-9]|2[0-3]):([0-5][0-9])$/)},dateTimeHasStrictISO8601Format:function(n){return!e(n,"YYYY-MM-DD HH:mm",!0).isValid()},dateHasCustomFormat:function(n){return n.match(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/)},dateTimeHasCustomFormat:function(n){return n.match(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4} (0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/)},count:function(n,t,e,r){void 0===n&&(n=0),void 0===t&&(t=1),void 0===e&&(e=1),void 0===r&&(r=[]);for(var o=[],i=n;i<=t;i+=e)!r.includes(i)&&o.push(i);return o},compareBy:function(n){return function(t,e){return t[n]<e[n]?-1:t[n]>e[n]?1:0}}},u=Object.freeze({__proto__:null,Api:o,Utils:i});var s={install:function n(t){n.installed||(n.installed=!0,Object.keys(u).forEach((function(n){t.component(n,u[n])})))}},c=null;"undefined"!=typeof window?c=window.Vue:"undefined"!=typeof global&&(c=global.Vue),c&&c.use(s);export default s;export{o as Api,i as Utils};
