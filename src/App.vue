<template>
  <MagicChat />
</template>

<script>
import MagicChat from './components/MagicChat.vue'

export default {
  name: 'App',
  components: {
    MagicChat
  }
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
