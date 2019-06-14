<template>
  <div class="dashboard--outer cmp--base">
    <h1>{{ title }}</h1>
    {{ content }}
    <br><br>
    <br><br>
    Count: {{ count }}
    <br>
    <br>
    <button @click="count++">Plus One</button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Dashboard',
      content: 'This is an awesome dashboard yo!',
      count: 0
    }
  },
}
</script>
