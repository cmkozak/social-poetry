<template>
  <div>
    <pre>{{ post }}</pre>
  </div>
</template>

<script>
import swal from 'sweetalert';
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
        swal('Error', error.message, 'error');
      });
  },
};
</script>

<style lang="scss" scoped></style>
