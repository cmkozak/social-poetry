<template>
  <div id="app">
    <Header />
    <div id="container">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
export default {
  components: { Header },
};
</script>

<style lang="scss">
* {
  background-color: inherit;
  color: #fff;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

html {
  background-image: linear-gradient(to bottom right, #0b0c10, #24262c);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

#container {
  margin-top: 30px;
}
</style>
