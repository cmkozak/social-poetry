<template>
  <div>
    <PostForm v-if="$auth.loggedIn" />
  </div>
</template>

<script>
import PostForm from '../components/PostForm.vue';
export default {
  components: { PostForm },
};
</script>

<style scoped></style>
