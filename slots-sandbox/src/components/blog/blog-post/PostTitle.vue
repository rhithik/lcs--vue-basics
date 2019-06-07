<template>
  <div class="post--title">
    {{ title }}
  </div>
</template>

<script>

export default {
  props: ['title']
}
</script>

<style scoped>
.post--title {
  font-size: 1.5rem;
  margin-bottom: .25rem;
  padding-bottom: .25rem;
  border-bottom: 1px solid #000;
}
</style>
