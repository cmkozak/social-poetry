<template>
  <nav id="header">
    <div v-if="$auth.loggedIn">
      <LogoutButton />
      <NuxtLink :to="`/user/${$auth.user._id}`">Profile</NuxtLink>
    </div>
    <NuxtLink v-else to="/login">Login</NuxtLink>
    {{ $auth.user }}
    <NuxtLink to="/">Home</NuxtLink>
  </nav>
</template>

<script>
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
