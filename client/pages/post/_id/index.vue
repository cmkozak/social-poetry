<template>
  <div class="main">
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

<style lang="scss" scoped>
.main {
  width: 90%;
  margin: auto;
  border: 1px white solid;
  min-height: fit-content;
  border-radius: 2vw;
  padding: 40px;
  border: 1px solid white;
  background-color: #222222;
  box-shadow: -4px 4px 3px white;
  font-size: 18px;
  line-height: 28px;
  div {
    margin-top: 30px;
  }
}
</style>
