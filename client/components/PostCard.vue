<template>
  <div class="post">
    <div
      v-if="user._id === $auth.user._id"
      class="delete"
      @click="deletePost(post._id)"
    >
      <img src="../static/trashcan.png" alt="delete post" />
    </div>
    <div class="top-info">
      <div class="top-content">
        <div class="name">
          {{ user.name }}
        </div>
        <div class="date">
          {{ formatDate(post.createdAt) }}
        </div>
      </div>
      <div class="title">
        {{ post.title }}
      </div>
    </div>
    <hr />
    <div class="content" v-html="post.content"></div>
  </div>
</template>

<script>
import moment from 'moment';
import swal from 'sweetalert';
export default {
  props: {
    post: {
      type: Object,
      default: null,
    },
    user: {
      type: Object,
      default: null,
    },
  },
  methods: {
    formatDate(date) {
      return moment.utc(date).local().format('dddd, MMM Do YYYY');
    },
    async deletePost(id) {
      if (confirm('Are you sure you want to delete this post?')) {
        const userId = this.$auth.user._id;
        await this.$axios
          .delete('/post/deletePost', { data: { id, userId } })
          .then(() => {
            swal('Success', 'Post Deleted', 'success');
          })
          .catch((error) => {
            swal('Error', error.data.message, 'error');
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.post {
  margin-top: 40px;
  width: 100%;
  border-radius: 1vw;
  padding: 20px;
  border: 1px solid #3f3f3f;
  background-color: #222222;
  box-shadow: -1px 1px 1px #3f3f3f;
  font-size: 18px;
}

.top-info {
  display: flex;
  height: 20px;
  margin-bottom: 10px;
  .top-content {
    line-height: 20px;
    .name {
      font-size: 20px;
      font-style: italic;
    }
    .date {
      font-size: 12px;
    }
  }
  .title {
    margin-left: 9px;
  }
}

.content {
  margin-top: 20px;
}

.delete {
  float: right;
  img {
    width: 15px;
  }
}
</style>
