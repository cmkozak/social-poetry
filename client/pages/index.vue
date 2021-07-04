<template>
  <div></div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode';
export default {
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.getUserDetails();
  },
  methods: {
    getUserDetails() {
      if (process.browser) {
        const token = localStorage.getItem('jwt') || '';
        const decoded = VueJwtDecode.decode(token);
        this.user = decoded;
      }
    },
    logUserOut() {
      if (process.browser) {
        localStorage.removeItem('jwt');
      }
    },
  },
};
</script>

<style scoped></style>
