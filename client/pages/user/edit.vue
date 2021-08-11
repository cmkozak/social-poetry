<template>
  <pre>{{ user }}</pre>
  <!-- this file will eventually contain information for changing settings -->
</template>

<script>
import swal from 'sweetalert';
export default {
  data() {
    return {
      user: {},
    };
  },
  async mounted() {
    const userToken = localStorage['auth._token.local'];
    const userId = this.$auth.user._id;
    await this.$axios
      .get('/user/getusersettings', { params: { userId, userToken } })
      .then((response) => {
        this.user = response.data.user;
      })
      .catch((error) => {
        swal('Error', error.message, 'error');
      });
  },
};
</script>

<style lang="scss" scoped></style>
