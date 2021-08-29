<template>
  <form @submit.prevent="updateProfile">
    <div class="field name">
      <label for="user.name"></label>
      <input v-model="user.name" />
    </div>
    <div class="field email">
      <input v-model="user.email" />
    </div>
    <div class="field bio">
      <input v-model="user.bio" />
    </div>
    <div class="field country">
      <input v-model="user.country" />
    </div>

    <button class="submit" type="submit">Submit</button>
  </form>
</template>

<script>
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
        this.$toast.error(error.message);
      });
  },
  methods: {
    async updateProfile() {
      const userToken = localStorage['auth._token.local'];
      await this.$axios
        .patch('/user/updateuser', { data: this.user, userToken })
        .then(() => {
          this.$toast.success('User Updated');
        })
        .catch((error) => {
          this.$toast.error(error.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  margin: auto;
  text-align: center;
  background-color: #2e2e2e;
  height: 100%;
  width: 700px;
  padding: 20px;
}
.field {
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  width: 80%;
  padding: 5px;
  font-size: 14px;
  margin-top: 15px;
  &:last-child {
    margin-bottom: 10px;
  }
}
</style>
