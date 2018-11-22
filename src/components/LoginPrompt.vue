
<!--
Defines a login component with:
 - user field
 - password field
 - login button

Interacting with this.$axios and this.$auth, the component handles
all the logic for logging in, as well as for posting error alerts.

If a login is successful, the component instead displays:
 - user name
 - user email
 - logout button

TODO: convert library to vuex instead of being a plugin.

provides multiple events:
  login:request   - login attempt started
  login:block     - If a user is already logged in, or there is another attempt in progress.
  login:fail      - login attempt failed.
  login           - login attempt succeeded

  logout:request  - prompt displayed if the user wants to logout.
  logout:fail     - if the logout step was canceled
  logout          - if the logout step was completed

  update          - if the login state changes, ie both @login and @logout
-->

<template>
  <!-- IF NOT LOGGED IN -->
  <b-field v-if="!auth.token">
    <b-input v-model="details.username" @keyup.enter.native="logIn" size="is-small" placeholder="Email"></b-input>
    <b-input v-model="details.password" @keyup.enter.native="logIn" size="is-small" type="Password" placeholder="password"/>
    <p class="control"><button
      :disabled="!canLogin" @click="logIn"
      :class="['button', 'is-small', 'is-success', { 'is-loading': auth.loginInProgress }]"
    > Log In </button></p>
  </b-field>
  <!-- IF LOGGED IN -->
  <div v-else class="level">
    <div class="level-left has-margin-right-md">
      <p class="content is-small has-text-right">
        <span class="has-text-weight-bold"> {{ auth.token.username }} </span>
        <br> {{ auth.token.email }}
      </p>
    </div>
    <b-field class="level-right">
      <p class="control"><button @click="logOut" class="button is-small is-warning"> Log Out </button></p>
    </b-field>
  </div>
</template>

<script>

export default {
  name: 'OpinionatedNavbarLogin',
  data() {
    return {
      details: {},
      auth: this.$auth, // make the property reactive.
    };
  },
  computed: {
    canLogin() {
      return this.details.username
        && this.details.password
        && !this.auth.loginInProgress;
    },
  },
  methods: {
    /**
     * Log in logic - cannot log in if
     * either the username or password are not set.
     */
    logIn() {
      this.$emit('login:request');
      if (!this.canLogin) {
        this.$emit('login:block');
        return;
      }
      this.auth.login(
        this.details,
        {
          onSuccess: (token) => {
            this.$emit('login', token);
            this.$emit('update', token);
          },
          onError: (error) => {
            this.showAlert(error.message);
            this.$emit('login:fail', error);
          },
        },
      );
    },
    /**
     * force logout
     */
    logOut() {
      this.emit('logout:request');
      this.$dialog.confirm({
        title: 'Please Confirm',
        message: 'Are you sure you want to log out?',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: () => {
          const { email } = this.auth.token;
          this.auth.logout();
          this.details = {};
          this.showAlert(`Successfully logged off as: ${email}`);
          this.emit('logout');
          this.$emit('update', null);
        },
        onCancel: () => {
          this.emit('logout:fail');
        },
      });
    },
    /**
     * Helper function to display an alert.
     * some of the types can be found at, i couldnt find the right page after 10s of looking:
     * https://bulma.io/documentation/elements/button/
     * @param {String} message
     * @param {'is-*'} type
     */
    showAlert(message, type = 'is-warning') {
      this.$toast.open({
        message, duration: 3000, position: 'is-bottom', type,
      });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
