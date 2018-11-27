import { axiosInstance } from './vue-axios';


// TODO: this should be converted to vuex
// TODO: this should be converted to vuex
// TODO: this should be converted to vuex
// TODO: this should be converted to vuex
// TODO: this should be converted to vuex
// TODO: this should be converted to vuex
// TODO: this should be converted to vuex
// TODO: this should be converted to vuex


class VueJWT {
  /**
   * @param localStorageName
   */
  constructor(localStorageName = 'auth_token') {
    if (typeof localStorageName !== 'string' && localStorageName.length < 1) {
      throw Error('A valid string of length > 0 must be passed as the localStorageName');
    }
    this._localStorageName = localStorageName;
    /* data */
    this._tokenStr = null;
    this._token = null;
    /* cache */
    this._cachedTokenStr = false;
    this._cachedToken = false;
    /* login being attempted */
    this._loginInProgress = false;
  }

  /* ========================================================================== */
  /* Getters & Cache                                                            */
  /* ========================================================================== */

  _invalidateCache() {
    this._cachedTokenStr = false;
    this._cachedToken = false;
  }

  /**
   * @return {null|String}
   */
  get tokenStr() {
    if (!this._cachedTokenStr) {
      this._tokenStr = localStorage.getItem(this._localStorageName);
      this._cachedTokenStr = true;
    }
    return this._tokenStr;
  }

  /**
   * @return {null|object}
   */
  get token() {
    if (!this._cachedToken) {
      this._token = VueJWT.parseJwt(this.tokenStr);
      this._cachedToken = true;
    }
    return this._token;
  }

  /* ========================================================================== */
  /* Auth, Login, Logout                                                        */
  /* ========================================================================== */


  /**
   * If the token was parsed successfully.
   * ie. the user is logged in.
   * @return {boolean}
   */
  get authorized() {
    return !!this.token;
  }

  /**
   * logout the user
   */
  logout() {
    localStorage.removeItem(this._localStorageName);
    this._invalidateCache();
  }

  /* ========================================================================== */
  /* Axios requests                                                             */
  /* ========================================================================== */

  /**
   * Manual login method.
   * @param tokenStr {string|null}
   * @return {boolean} If the login attempt was successful, ie. the jwtToken was parsed correctly.
   */
  loginWithJwt(tokenStr) {
    if (typeof tokenStr !== 'string' && tokenStr !== null) {
      throw Error('Token must be a string');
    }
    if (this.authorized) {
      throw Error('Please explicitly logout first');
    }
    localStorage.setItem(this._localStorageName, tokenStr);
    this._invalidateCache();
    return this.authorized;
  }

  /**
   * Is long running login in progress.
   * @return {boolean}
   */
  get loginInProgress() {
    return this._loginInProgress;
  }

  _assertNotLogginIn() {
    if (this._loginInProgress) {
      throw Error('Login event in progress, please wait until it finishes.');
    }
  }

  /**
   * @param {Object} data | normally of type {{username: String, password: String}}
   * @param {String} url
   * @param {Function} getRequestToken
   * @param {Function} onSuccess
   * @param {Function} onError
   * @param axiosInstance
   */
  login(data,
    {
      url = '/auth/token/obtain',
      getRequestToken = (dat) => dat.token,
      onSuccess = (token) => console.log('Logged In', token),
      onError = (error) => console.log('Log In Error: ', error),
    },
  ) {
    this._assertNotLogginIn();
    this._loginInProgress = true;
    axiosInstance.post(url, data)
      .then((response) => {
        const loggedIn = this.loginWithJwt(getRequestToken(response.data));
        /* allow more login attempts */
        this._loginInProgress = false;
        /* handle callback */
        if (loggedIn && onSuccess) {
          try {
            onSuccess(this.token);
          } catch (e) {
            // pass
          }
        } else {
          try {
            onError(new Error('Failed to login'));
          } catch (e) {
            // pass
          }
        }
      })
      .catch((error) => {
        /* allow more login attempts */
        this._loginInProgress = false;
        if (onError) {
          try {
            onError(error);
          } catch (e) {
            // pass
          }
        }
      });
  }

  /* ========================================================================== */
  /* Jwt Parser                                                                 */
  /* ========================================================================== */

  /**
   * @param {String} token
   * @return {object|null}
   */
  static parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (e) {
      return null;
    }
  }
}

export const authInstance = new VueJWT();

/**
 * Register this plugin with Vue
 * @param {Vue} Vue
 * @param {String} localStorageName
 */
function installVueJwt(Vue, localStorageName = 'auth_token') {
  /* dont install twice */
  if (installVueJwt.installed) {
    return;
  }
  installVueJwt.installed = true;
  /* install */

  /**
   * @memberOf {Vue}
   * @member {VueJWT} $auth
   */
  Object.defineProperties(Vue, { $auth: { get() { return authInstance; } } });

  /**
   * @memberOf {Vue.prototype}
   * @member {VueJWT} $auth
   */
  Object.defineProperties(Vue.prototype, { $auth: { get() { return authInstance; } } });
}


/**
 * PACKAGE EXPORT
 */
export default {
  install: installVueJwt,
  VueJWT: authInstance,
};
