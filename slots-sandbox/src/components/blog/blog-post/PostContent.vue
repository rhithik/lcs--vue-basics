<template>
  <div class="post--content">
    {{ content }}
  </div>
</template>

<script>

export default {
  props: ['content']
}
</script>

<style>
.post--content {
  flex: 1;
  display: flex;
  align-items: center;
}
</style>
