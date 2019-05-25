<template>
  <div class="child--outer">
    <h4>Child Component</h4>
    <input type="text" v-model="enteredData">
    <button @click="callCustomEvent">Send Data</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enteredData: '',
    }
  },
  methods: {
    callCustomEvent() {
      this.$emit('send-to-parent', this.enteredData)
    }
  }
}
</script>

<style scoped>
.child--outer {
  padding: 3rem 0;
  border: 1px solid #121212;
}


</style>

