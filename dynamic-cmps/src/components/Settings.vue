<template>
  <div class="settings--outer cmp--base">
    <h1>{{ title }}</h1>
    {{ content }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Settings',
      content: 'Change up the settings a bit.'
    }
  },
  created() {
    console.log('created');
  },
  activated() {
    console.log('activated');
  },
  deactivated() {
    console.log('deactivated');
  }
}
</script>

<style>
.settings--outer {
  background-color: rgb(31, 212, 152);
}
</style>
