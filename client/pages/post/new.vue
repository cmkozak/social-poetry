<template>
  <div id="post-form-container">
    <form id="post-form" @submit.prevent="createPost">
      <h2>Create Post</h2>
      <div class="inputs">
        <input
          v-model="post.title"
          class="title-input"
          placeholder="Enter a post title"
        />
        <div v-if="!$v.post.title.required && submitted" class="error">
          Title is required
        </div>
        <div v-if="!$v.post.title.minLength && submitted" class="error">
          Title must be longer than 4 characters
        </div>
        <textarea
          v-model="post.content"
          class="content-input"
          placeholder="Post content"
        />
        <div v-if="!$v.post.content.required && submitted" class="error">
          Title is required
        </div>
      </div>
      <button class="submit" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import swal from 'sweetalert';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      post: {
        title: '',
        content: '',
        user: this.$auth.user._id,
        userToken: '',
      },
      submitted: false,
    };
  },
  validations: {
    post: {
      title: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(100),
      },
      content: {
        required,
      },
    },
  },
  mounted() {
    this.post.userToken = localStorage['auth._token.local'];
  },
  methods: {
    async createPost() {
      await this.$axios
        .post('/post/createPost', this.post)
        .then(() => {
          swal('Success', 'Post Creation Successful', 'success');
        })
        .catch((error) => {
          swal('Error', error.message, 'error');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#post-form {
  margin: auto;
  text-align: center;
  background-color: #2e2e2e;
  height: 100%;
  width: 700px;
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
  input,
  textarea {
    padding: 5px;
    font-size: 14px;
    margin-top: 15px;
    &:last-child {
      margin-bottom: 10px;
    }
  }
}

.content-input {
  height: 200px;
}

.submit {
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
