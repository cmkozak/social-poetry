<template>
  <div id="login">
    <form id="login-form" @submit.prevent="loginUser">
      <h2>Log In</h2>
      <div class="inputs">
        <input
          id="email"
          v-model="login.email"
          type="text"
          placeholder="Email"
        />
        <input
          id="password"
          v-model="login.password"
          type="password"
          placeholder="Password"
        />
      </div>
      <p>
        Dont have an account?
        <NuxtLink to="/register">Create an Account</NuxtLink>
      </p>
      <button class="sign-in-btn" type="submit">Sign In</button>
    </form>
  </div>
</template>
<script>
import swal from 'sweetalert';
import axios from 'axios';
export default {
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post(
          'http://localhost:4000/user/login',
          this.login
        );
        const token = response.data.token;
        localStorage.setItem('jwt', token);
        if (token) {
          swal('Success', 'Login Successful', 'success');
        }
      } catch (err) {
        swal('Error', 'Something Went Wrong', 'error');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#login-form {
  margin: auto;
  text-align: center;
  background-color: #2e2e2e;
  height: 400px;
  width: 400px;
  padding: 20px;
}

h2 {
  font-size: 60px;
  margin: 0;
  font-weight: bold;
}

.inputs {
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  width: 80%;
  ::placeholder {
    color: inherit;
    opacity: 0.5;
  }
  input {
    padding: 5px;
    font-size: 14px;
    &:last-child {
      margin-top: 20px;
    }
  }
}

.sign-in-btn {
  width: 90%;
  margin: auto;
  border-radius: 8px;
  font-size: 16px;
  padding: 16px;
  background-color: #08fdd8;
  color: #000;
  &:hover {
    cursor: pointer;
  }
}
</style>
