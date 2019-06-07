<template>
  <div id="app">
    <div class="header--wrapper">
      <img alt="Vue logo" src="./assets/logo.png" class="logo">
      <span class="header--text">Vue.js Slots</span>
    </div>
    <BlogContainer />
  </div>
</template>

<script>
import BlogContainer from '@/components/blog/BlogContainer.vue';

export default {
  name: 'app',
  components: {
    BlogContainer,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header--wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}
.header--text {
  font-size: 5rem;
}
@media screen and (max-width: 480px) {
.logo {
  width: 30%;
  margin: 0 2rem 0 2.5%;
}
.header--text {
  font-size: 3.75rem;
  text-align: left;
  line-height: 3.5rem;
}
}
</style>
