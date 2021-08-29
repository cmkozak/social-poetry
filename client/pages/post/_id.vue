<template>
  <div>
    <pre>{{ post }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      post: {},
    };
  },
  async created() {
    await this.$axios
      .get(`/post/getPost/${this.id}`)
      .then((response) => {
        this.post = response.data.post;
      })
      .catch((error) => {
        this.$toast.error(error.message);
      });
  },
};
</script>

<style lang="scss" scoped></style>
