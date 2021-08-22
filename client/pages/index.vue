<template>
  <div>
    <NuxtLink v-if="$auth.loggedIn" to="/post/new">Create New Post</NuxtLink>
  </div>
</template>

<script></script>

<style scoped></style>
