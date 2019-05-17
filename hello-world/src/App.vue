<template>
  <div id="app" class="hello" v-if="1">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld 
      :msg="msg"
      :name="name"
      :age="age"
      hardcoded="this is a hardcoded string"
    />
  </div>
  <div class="secondary" v-else>SHOWN UP!</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  data() {
    return {
      msg: 'Hello from the Parent Component',
      name: 'sean',
      age: '',
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
