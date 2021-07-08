<template>
  <div id="register">
    <form id="register-form" @submit.prevent="registerUser">
      <h2>Register</h2>
      <div class="inputs">
        <input id="name" v-model="register.name" placeholder="Display Name" />
        <div v-if="!$v.register.name.required && submitted" class="error">
          Name is required
        </div>
        <div v-if="!$v.register.name.minLength && submitted" class="error">
          Name must be longer than 4 characters
        </div>
        <div v-if="!$v.register.name.maxLength && submitted" class="error">
          Name must not be longer than 50 characters
        </div>
        <input id="email" v-model="register.email" placeholder="Email" />
        <div v-if="!$v.register.email.required && submitted" class="error">
          Email is required
        </div>
        <div v-if="!$v.register.email.email && submitted" class="error">
          Please enter a valid email
        </div>
        <input
          id="password"
          v-model="register.password"
          type="password"
          placeholder="Password"
        />
        <div v-if="!$v.register.password.required && submitted" class="error">
          Password is required
        </div>
        <div v-if="!$v.register.password.minLength && submitted" class="error">
          Password must be longer than 6 characters
        </div>
      </div>
      <p>Already have an account? <NuxtLink to="/login">Sign In</NuxtLink></p>
      <button class="register-btn" type="submit">Register</button>
    </form>
  </div>
</template>
<script>
import swal from 'sweetalert';
import {
  required,
  minLength,
  maxLength,
  email,
} from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      register: {
        name: '',
        email: '',
        password: '',
      },
      submitted: false,
    };
  },
  validations: {
    register: {
      name: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(50),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  methods: {
    async registerUser() {
      this.$v.$touch();
      this.submitted = true;
      if (this.$v.$invalid) return;
      await this.$axios
        .post('/user/register', this.register)
        .then(() => {
          this.$auth.loginWith('local', {
            data: this.register,
          });
        })
        .then(() => {
          swal('Success', 'Login Successful', 'success');
        })
        .catch((error) => {
          if (error.status === 409) {
            swal('Error', error.data.message, 'error');
          } else {
            swal('Error', error.data.err.message, 'error');
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#register-form {
  margin: auto;
  text-align: center;
  background-color: #2e2e2e;
  height: 350px;
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

.error {
  font-size: 14px;
  margin-top: 2px;
  color: red;
}
</style>
