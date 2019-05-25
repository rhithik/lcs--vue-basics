<template>
  <div>
    <ChildComponent @send-to-parent="handleCustomEvent" />
    Received Data: {{ receivedData || 'natta' }}
  </div>
</template>

<script>
import ChildComponent from './ChildComponent/ChildComponent';

export default {
  data() {
    return {
      receivedData: '',
    }
  },
  components: {
    ChildComponent
  },
  methods: {
    handleCustomEvent(payload) {
      this.receivedData = payload;
    }
  }
}
</script>

<style>

</style>

