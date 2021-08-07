<template>
  <div class="post">
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
    <hr>
    <div class="content" v-html="post.content"></div>
  </div>
</template>

<script>
import moment from 'moment';
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
  },
};
</script>

<style lang="scss" scoped>
.post {
  margin-top: 40px;
  width: 100%;
  border-radius: 1vw;
  padding: 20px;
  border: 1px solid rgb(63, 63, 63);
  background-color: #222222;
  box-shadow: -1px 1px 1px rgb(63, 63, 63);
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
</style>
