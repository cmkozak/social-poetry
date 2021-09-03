<template>
  <form id="post-form" @submit.prevent="gatherData">
    <div class="inputs">
      <input
        v-model="postTitle"
        class="title-input"
        placeholder="Enter a post title"
      />
      <div v-if="!$v.postTitle.required && submitted" class="error">
        Title is required
      </div>
      <div v-if="!$v.postTitle.minLength && submitted" class="error">
        Title must be longer than 4 characters
      </div>
      <editor-content :editor="editor" />
      <div v-if="!$v.postContent.required && submitted" class="error">
        Conent must not be blank
      </div>
    </div>
    <button class="submit" type="submit">Submit</button>
  </form>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';

export default {
  components: {
    EditorContent,
  },
  props: {
    title: {
      type: String,
      default: '',
      required,
    },
    content: {
      type: String,
      default: '',
      required,
    },
  },
  validations: {
    postTitle: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(100),
    },
    postContent: {
      required,
    },
  },
  data() {
    return {
      editor: null,
      submitted: false,
      postTitle: '',
      postContent: '',
    };
  },
  created() {
    this.postTitle = this.title;
    this.postContent = this.content;
  },
  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit],
      content: this.postContent,
    });
  },
  beforeUnmount() {
    this.editor.destroy();
  },
  methods: {
    gatherData() {
      this.postContent = this.editor.getHTML();
      this.$v.$touch();
      this.submitted = true;
      if (this.$v.$invalid) return;
      this.$emit('submitPost', this.postTitle, this.postContent);
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
