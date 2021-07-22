<template>
  <div class="main">
    <div class="left-sidebar">
      <div id="name">{{ user.name }}</div>
      <div id="bio">{{ user.bio }}</div>
      <div id="country">{{ user.country }}</div>
    </div>
    <div class="posts">
      <PostForm />
      <PostCard
        v-for="post in posts.data"
        :key="post.id"
        :user="user"
        :post="post"
      />
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
export default {
  data() {
    return {
      id: this.$route.params.id,
      user: {
        name: '',
        bio: '',
        country: '',
      },
      posts: {},
    };
  },
  async created() {
    await this.$axios
      .get(`/user/getuserinfo/${this.id}`)
      .then((response) => {
        this.user = response.data.user;
      })
      .catch((error) => {
        this.$router.back();
        swal('Error', error.message, 'error');
      });
    await this.$axios
      .get(`/post/getPostsByUser/${this.id}`)
      .then((response) => (this.posts = response.data))
      .catch((error) => {
        swal('Error', error.data.message, 'error');
      });
  },
};
</script>

<style lang="scss" scoped>
.left-sidebar {
  display: inline-block;
  vertical-align: top;
  width: 26vw;
  margin-left: 10vw;
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
#name {
  font-size: 50px;
  font-weight: bold;
}
#country {
  font-style: italic;
  font-size: 14px;
}

.posts {
  display: inline-block;
  width: 50vw;
}
</style>
