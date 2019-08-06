<template>
  <div id="app">
    <div class="header">
      <img alt="Vue logo" src="./assets/logo.png">
      <h1>Dynamic Components</h1>
    </div>
    <button @click="selectedComponent = 'Dashboard'">Dashboard</button>
    <button @click="selectedComponent = 'Settings'">Settings</button>
    <keep-alive>
      <component 
        :name="name"
        :isAdmin="isAdmin"
        :is="selectedComponent"
        >Component Not Found
      </component>
    </keep-alive>
  </div>
</template>

<script>
import { value } from 'vue-function-api';

import Dashboard from './components/Dashboard.vue';
import Settings from './components/Settings.vue';

export default {
  name: 'app',
  components: {
    Dashboard,
    Settings,
  },
  setup() {
    const selectedComponent = value('Dashboard');
    const name = value('Sean RabbitWerks');
    const isAdmin = value(true);
    return {
      selectedComponent,
      name,
      isAdmin,
    }
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
  margin-top: 60px;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  margin-bottom: 2rem;
}
.cmp--base {
  width: 70%;
  min-height: 60vh;
  margin-left: 15%;
  border: 3px solid rgb(10, 34, 49);
}
</style>
