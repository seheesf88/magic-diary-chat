<template>
  <ul class="nav">
    <li class="nav-item">
      <router-link :to="{ name: 'MagicChat'}" class="nav-link active">
        MagicChat
      </router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'CreateApi'}" class="nav-link active">
        Make my api
      </router-link>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="wwww.seheeson.com">about sehee</a>
    </li>
  </ul>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  background-image: url('~@/assets/parchment.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
}
</style>
