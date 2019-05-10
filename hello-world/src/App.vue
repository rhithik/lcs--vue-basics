<template>
  <div id="app" class="hello" v-if="1">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld :msg="msg"/>
  </div>
  <div class="secondary" v-else>SHOWN UP!</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  data() {
    return {
      msg: 'RabbitWerks Ruulz!',
      name: 'sean',
      age: 27,
    }
  },
  components: {
    HelloWorld,
  },
};
</script>

<style scoped>
@import './assets/main.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
