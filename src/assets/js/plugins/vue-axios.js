import axios from 'axios';
import cachios from 'cachios';


/* AXIOS - https://github.com/axios/axios */

export const axiosOptions = {
  baseURL: `http://${process.env.VUE_APP_API}/`,
  timeout: 30 * 1000, // 30 seconds
};

Object.freeze(axiosOptions);

export const axiosInstance = axios.create(axiosOptions);

if (process.env.NODE_ENV !== 'production') {
  axiosInstance.interceptors.response.use((response) => {
    console.log(
      'Request  |', response.config.method, response.config.url,
      '\nResponse |', response.request.status, { response },
    );
    return response;
  }, (error) => {
    console.log('Request failed:\n', error);
    return error;
  });
}


/* CACHIOS - https://www.npmjs.com/package/cachios */

// No mutations to the objects returned will affect things stored in the cache :)
export const cachiosOptions = {
  ttl: 600, // persist 30 seconds
  getCacheIdentifier(config) {
    return {
      method: config.method,
      url: config.url,
      params: config.params,
      data: config.data,
      headers: config.headers, // not in default implementation, required for authentication
    };
  },
};

Object.freeze(cachiosOptions);

export const cachiosInstance = cachios.create(axiosInstance, cachiosOptions);


/* debug */
console.log('CREATED: axios & cachios instances');


/**
 * Similar to the VueRouter packege...
 * but the variable names didnt follow convention.
 *
 * Access axios without importing inside a component with:
 * this.$axios OR this.$http OR Vue.$axios
 *
 * @param {Vue} Vue
 */
function installVueAxios(Vue) {
  if (installVueAxios.installed) {
    return;
  }
  installVueAxios.installed = true;
  if (!axios) {
    throw Error('Axios is required');
  }

  /**
   * @memberOf {Vue}
   * @member {cachios} $axios
   */
  Object.defineProperties(Vue, {
    $axios: { get() { return cachiosInstance; } },
  });

  /**
   * @memberOf {Vue.prototype}
   * @member {cachios} $axios
   */
  Object.defineProperties(Vue.prototype, {
    $axios: { get() { return cachiosInstance; } },
  });

  /**
   * @memberOf {Vue.prototype}
   * @member {cachios} $http
   */
  Object.defineProperties(Vue.prototype, {
    $http: { get() { return cachiosInstance; } },
  });
}

export default {
  install: installVueAxios,
};
