<template>
  <div>
    <h2>Edit Post</h2>
    <PostEditor
      v-if="post.title"
      :title="post.title"
      :content="post.content"
      @submitPost="updatePost"
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
  async created() {
    await this.$axios
      .get(`/post/getPost/${this.$route.params.id}`)
      .then((response) => {
        this.post.title = response.data.post.title;
        this.post.content = response.data.post.content;
      })
      .catch((error) => {
        this.$toast.error(error.message);
      });
  },
  mounted() {
    this.post.userToken = localStorage['auth._token.local'];
  },
  methods: {
    async updatePost(title, content) {
      this.post.title = title;
      this.post.content = content;
      await this.$axios
        .post('/post/updatePost', this.post)
        .then((res) => {
          this.$toast.success('Post Edited Successfuly');
          this.$router.push(`/post/${res.data.data._id}`);
        })
        .catch((error) => {
          this.$toast.error(error.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
