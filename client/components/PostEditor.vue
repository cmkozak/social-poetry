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
      <div v-if="editor" class="editor-buttons">
        <button
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          @click.prevent="
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          "
        >
          H1
        </button>
        <button
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          @click.prevent="
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          "
        >
          H2
        </button>
        <button
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
          @click.prevent="
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          "
        >
          H3
        </button>
        <button
          :class="{ 'is-active': editor.isActive('paragraph') }"
          @click.prevent="editor.chain().focus().setParagraph().run()"
        >
          Paragraph
        </button>
        <button
          :class="{ 'is-active': editor.isActive('bold') }"
          @click.prevent="editor.chain().focus().toggleBold().run()"
        >
          Bold
        </button>
        <button
          :class="{ 'is-active': editor.isActive('italic') }"
          @click.prevent="editor.chain().focus().toggleItalic().run()"
        >
          Italic
        </button>
        <button
          :class="{ 'is-active': editor.isActive('strike') }"
          @click.prevent="editor.chain().focus().toggleStrike().run()"
        >
          Strike
        </button>
        <button
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
          @click.prevent="editor.chain().focus().setTextAlign('left').run()"
        >
          Left
        </button>
        <button
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
          @click.prevent="editor.chain().focus().setTextAlign('center').run()"
        >
          Center
        </button>
        <button
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
          @click.prevent="editor.chain().focus().setTextAlign('right').run()"
        >
          Right
        </button>
      </div>
      <editor-content :editor="editor" class="editor" />
      <div v-if="!$v.postContent.required && submitted" class="error">
        Content must not be blank
      </div>
    </div>
    <button class="submit" type="submit">Submit</button>
  </form>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
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
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
      ],
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

.editor-buttons {
  margin: 10px 0px;
}

.editor {
  text-align: left;
}
</style>

<style lang="scss">
.ProseMirror {
  height: 500px;
  padding: 7px;
  outline: -webkit-focus-ring-color auto 1px;
  h1,
  h2,
  h3,
  p {
    margin-top: 0;
  }
}
</style>
