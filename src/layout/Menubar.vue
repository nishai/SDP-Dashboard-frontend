<template>
  <div class="menubar w-100 d-flex flex-row">
    <div class="menubar-left p-2">
      <img class="menubar-img img-fluid" src="../../public/img/logo/wits-logo-white.png"/>
    </div>
    <div class="menubar-right p-2 ml-auto">
      <div v-if="!loggedIn" class="d-flex flex-row">
        <b-form-input class="mx-2" v-model="username" type="text" size="sm" placeholder="Username"></b-form-input>
        <b-form-input class="mx-2" v-model="password" type="password" size="sm" placeholder="Password"></b-form-input>
        <b-button class="mx-2" variant="outline-success" size="sm" @click="logIn"> Log In </b-button>
      </div>
      <div v-if="loggedIn" class="d-flex flex-row">
        {{ username }}
        <b-button class="mx-2" variant="outline-danger" size="sm" @click="logOut"> Log Out </b-button>
      </div>
    </div>

    <b-alert :show="failedCountdown"
             class="alert-fixed"
             dismissible
             variant="warning"
             @dismissed="failedCountdown=0"
             @dismiss-count-down="failedCountdownChanged">
      Failed To Login
    </b-alert>

  </div>
</template>

<script>
import queryApi from '../assets/js/api/witsapi';

export default {
  name: 'Menubar',
  data: () => ({
    username: null,
    password: null,
    token: null,
    failedCountdown: 0,
    dismissSecs: 5,
  }),
  computed: {
    loggedIn() {
      return this.token !== null;
    },
  },
  methods: {
    logIn() {
      console.log(`logging in as: ${this.username}`);
      queryApi.getLoginToken(this.username, this.password)
        .then((request) => {
          console.log(request.data);
          if (request.data.token !== null) {
            this.token = request.data.token;
            this.password = null;
          } else {
            this.showFailedAlert();
          }
        })
        .catch((error) => {
          console.log('Login Failed');
          this.showFailedAlert();
        });
    },
    logOut() {
      this.token = null;
      this.username = null;
      this.password = null;
    },
    failedCountdownChanged(dismissCountdown) {
      this.failedCountdown = dismissCountdown;
    },
    showFailedAlert() {
      this.failedCountdown = this.dismissSecs;
    },
  },
};
</script>

<style scoped>
.menubar {
  color: var(--text-color-sidebar-heading);
  background-color: var(--bg-color-sidebar-light);
  text-transform: uppercase;
}

.menubar-left {
  width: calc(var(--sidebar-width));
  min-width: calc(var(--sidebar-width));
}
.menubar-img {
  width: 100px;
}

.alert-fixed {
  position:fixed;
  top: 80px; /* menubar height - make var */
  left: var(--sidebar-width);
  width: 100%;
  z-index:9999;
  border-radius:0px
}

/*.sidebar_nav_group {*/
  /*flex-grow: 1;*/
/*}*/
</style>
