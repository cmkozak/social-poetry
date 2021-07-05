<template>
  <div id="login">
    <form id="login-form" @submit.prevent="loginUser">
      <h2>Log In</h2>
      <div class="inputs">
        <input id="email" v-model="login.email" placeholder="Email" />
        <div v-if="!$v.login.email.required && submitted" class="error">
          Email is required
        </div>
        <input
          id="password"
          v-model="login.password"
          type="password"
          placeholder="Password"
        />
        <div v-if="!$v.login.password.required && submitted" class="error">
          Password is required
        </div>
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
import { required } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
      submitted: false,
    };
  },
  validations: {
    login: {
      email: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    async loginUser() {
      this.$v.$touch();
      this.submitted = true;
      if (this.$v.$invalid) return;
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
  height: 300px;
  width: 400px;
  padding: 20px;
}

h2 {
  font-size: 50px;
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
    margin-top: 15px;
    &:last-child {
      margin-bottom: 10px;
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

.error {
  font-size: 14px;
  margin-top: 2px;
  color: red;
}
</style>
