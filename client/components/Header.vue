<template>
  <nav id="header">
    <NuxtLink v-if="$store.state.loggedIn" to="/profile">Profile</NuxtLink>
    <NuxtLink v-else to="/login">Login</NuxtLink>
    <NuxtLink to="/">Home</NuxtLink>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#header {
  width: 100%;
  height: 6vh;
  border-bottom: 2px solid white;
}

a {
  text-decoration: none;
  font-size: 30px;
  margin-left: 10px;
  margin-right: 10px;
  float: right;
}
</style>
