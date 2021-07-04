<template>
  <div id="register">
    <form id="register-form" @submit.prevent="registerUser">
      <h2>Register</h2>
      <div class="inputs">
        <input
          id="name"
          v-model="register.name"
          placeholder="Display Name"
          required
        />
        <input
          id="email"
          v-model="register.email"
          placeholder="Email"
          required
        />
        <input
          id="password"
          v-model="register.password"
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <p>Already have an account? <NuxtLink to="/login">Sign In</NuxtLink></p>
      <button class="register-btn" type="submit">Register</button>
    </form>
  </div>
</template>
<script>
import swal from 'sweetalert';
import axios from 'axios';
export default {
  data() {
    return {
      register: {
        name: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post(
          'http://localhost:4000/user/register',
          this.register
        );
        const token = response.data.token;
        if (token) {
          localStorage.setItem('jwt', token);
          swal('Success', 'Registration Was successful', 'success');
        } else {
          swal('Error', 'Something Went Wrong', 'error');
        }
      } catch (err) {
        const error = err.response;
        if (error.status === 409) {
          swal('Error', error.data.message, 'error');
        } else {
          swal('Error', error.data.err.message, 'error');
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#register-form {
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
    margin-top: 15px;
    &:last-child {
      margin-bottom: 10px;
    }
  }
}

.register-btn {
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
