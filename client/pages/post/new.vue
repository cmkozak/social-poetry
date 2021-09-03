<template>
  <div>
    <h2>Create Post</h2>
    <PostEditor
      :title="post.title"
      :content="post.content"
      @submitPost="createPost"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        content: '',
        user: this.$auth.user._id,
        userToken: '',
      },
    };
  },
  mounted() {
    this.post.userToken = localStorage['auth._token.local'];
  },
  methods: {
    async createPost(title, content) {
      this.post.title = title;
      this.post.content = content;
      await this.$axios
        .post('/post/createPost', this.post)
        .then(() => {
          this.$toast.success('Post Creation Successful');
        })
        .catch((error) => {
          this.$toast.error(error.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 50px;
  margin: 0;
  font-weight: bold;
}
</style>
