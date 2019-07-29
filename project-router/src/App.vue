<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/user">User</router-link> |
      <a href="#" @click="navToProfile">Your Profile</a>
    </div>
    <br>
    <br>
    <div class="name-input">
      <label>Whats Your Name?</label>
      <input type="text" v-model="name" >
    </div>
    <router-view class="router-view"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    }
  },
  methods: {
    navToProfile() {
      this.$router.push({
        path: `dynamic-profile/${this.name}?name=Sean`,
      });
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
  font-size: 36px;
}
.name-input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
input {
  font-size: 2rem;
}
.router-view {
  margin-top: 8rem;
  border: 3px solid black;
}
</style>
