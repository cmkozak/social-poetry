<template>
  <div class="post">
    <div class="top-info">
      <div class="name">
        {{ user.name }}
      </div>
      <div class="date">
        {{ formatDate(post.createdAt) }}
      </div>
      <div class="title">
        {{ post.title }}
      </div>
    </div>
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
      return moment.utc(date).local();
    },
  },
};
</script>

<style lang="scss" scoped>
.post {
  display: inline-block;
  vertical-align: top;
  width: 100%;
  border: 1px white solid;
  min-height: fit-content;
  border-radius: 2vw;
  padding: 20px;
  border: 1px solid white;
  background-color: #222222;
  box-shadow: -4px 4px 3px white;
  font-size: 18px;
  line-height: 10px;
  div {
    margin-top: 30px;
  }
}
</style>
