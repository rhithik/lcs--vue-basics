<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" :placeholder="name">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  computed: {
    uppercaseMsg() {
      return this.msg.toUpperCase();
    }
  },
  // props: ['msg', 'name', 'age', 'hardcoded'],
  props: {
    msg: {
      type: String,
    },
    name: {
      type: String,
      required: true
    },
    age: {
      type: [String, Number],
      required: true,
      default: 132,
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.hello {
  color: #31b810;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
