<template>
  <div class="container">
    <h1 class="sm-title">Vue Session Manager</h1>
    <div class="sm-card">
      <div v-if="isLoggedIn">
        <button @click="logoutUser" class="logout-button">Logout</button>
        <table class="table">
          <thead class="thead-dark">
            <tr class="table-headers">
              <th scope="col">ID</th>
              <th scope="col">name</th>
              <th scope="col">email</th>
              <th scope="col">token</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-rows">
              <th scope="table-row">{{ this.getUserId }}</th>
              <th scope="table-row">{{ this.getUserName }}</th>
              <th scope="table-row">{{ this.getUserEmail }}</th>
              <th scope="table-row">{{ this.getAuthToken }}</th>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else>
        <h3>Sign Up</h3>
        <form @submit="onSignUp" class="sign-up-form">
          <input v-model="signUpName" type="text" class="sign-up-form-email" placeholder="Name" />
          <input
            v-model="signUpEmail"
            type="email"
            class="sign-up-form-email"
            placeholder="Email"
          />
          <input
            v-model="signUpPassword"
            type="password"
            class="sign-up-form-password"
            placeholder="Password"
          />
          <br />
          <input type="submit" class="sign-up-form-submit" value="Sign Up" />
        </form>
        <hr />
        <br />
        <h3>Login</h3>
        <form @submit="onLogin" class="login-form">
          <input
            v-model="loginEmail"
            type="email"
            class="login-form-email"
            placeholder="Email"
          />
          <input
            v-model="loginPassword"
            type="password"
            class="login-form-password"
            placeholder="Password"
          />
          <br />
          <input type="submit" class="login-form-submit" value="Login" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import "@/store/index.js";
  import { mapActions, mapGetters } from "vuex";
  export default {
    name: "SessionManager",
    computed: {
      ...mapGetters(["getAuthToken", "getUserId", "getUserEmail", "getUserName", "isLoggedIn"]),
    },
    data() {
      return {
        signUpEmail: "",
        signUpPassword: "",
        loginEmail: "",
        loginPassword: "",
      };
    },
    methods: {
      ...mapActions(["registerUser", "loginUser", "logoutUser"]),
      onSignUp(event) {
        event.preventDefault();
        let data = {
          user: { email: this.signUpEmail, password: this.signUpPassword, name: this.signUpName, },
        };
        this.registerUser(data);
        this.resetData();
      },
      onLogin(event) {
        event.preventDefault();
        let data = {
          user: { email: this.loginEmail, password: this.loginPassword, },
        };
        this.loginUser(data);
        this.resetData();
      },
      resetData() {
        this.signUpEmail = "";
        this.signUpPassword = "";
        this.loginEmail = "";
        this.loginPassword = "";
      },
    },
  }
</script>


<style scoped>
.sm-title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  font-family: "Roboto", sans-serif;
}

.container {
  width: 90%;
  margin: 0 auto;
}

.sm-card {
  width: 75%;
  padding: 20px;
  margin: 0 auto;
  height: 25em;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
}

.sign-up-form {
  width: 100%;
}

.sign-up-form-email {
  width: 55%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.sign-up-form-password {
  width: 55%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.sign-up-form-submit {
  width: 15%;
  padding: 1em;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #1a77ce;
  color: #fff;
  border: none;
}

.sign-up-form-submit:hover {
  background-color: #0d5c8a;
  cursor: pointer;
}

.login-form {
  width: 100%;
}

.login-form-email {
  width: 55%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.login-form-password {
  width: 55%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.login-form-submit {
  width: 15%;
  padding: 1em;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #1a77ce;
  color: #fff;
  border: none;
}

.login-form-submit:hover {
  background-color: #0d5c8a;
  cursor: pointer;
}

.logout-button {
  width: 15%;
  padding: 1em;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #1a77ce;
  color: #fff;
  border: none;
}

.logout-button:hover {
  background-color: #0d5c8a;
  cursor: pointer;
}

.table-headers {
  background-color: #2b3b49;
  color: #fff;
  max-width: 90%;
  margin: 0 auto;
}

.table-rows {
  background-color: #f2f2f2;
  margin: 0 auto;
}

.table-row {
  word-break: break-all;
  text-align: center;
  padding: 10px;
}

.table-row-username {
  width: 30%;
}</style>