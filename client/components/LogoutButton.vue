<template>
  <a @click="logoutUser"> Logout </a>
</template>

<script>
export default {
  methods: {
    logoutUser() {
      this.$auth.logout();
    },
  },
};
</script>

<style lang="scss" scoped></style>
