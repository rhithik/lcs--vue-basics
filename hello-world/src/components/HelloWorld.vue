<template>
  <div class="hello">
    <h1 id="header">{{ msg }}</h1>
    <input type="text" :placeholder="name" v-model="text">
    <button @click="callCustomEvent">Send Data!</button>
    <h4>Received: {{ sentText }}</h4>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      text: '',
      sentText: '',
    }
  },
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
  },
  methods: {
    callCustomEvent() {
      const payload = this.text;
      this.$emit('send-data', payload)
    }
  },
  mounted() {
    this.$on('send-data', payload => {
      this.sentText = payload;
    })
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

.hello > * {
  margin: 1rem 0;
}

</style>
