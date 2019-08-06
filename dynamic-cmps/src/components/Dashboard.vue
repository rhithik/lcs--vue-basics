<template>
  <div class="dashboard--outer cmp--base">
    <h1>{{ title }}</h1>
    {{ fullContent }}
    <br><br>
    <br><br>
    Count: {{ count }}
    <br>
    <br>
    <button @click="addThree">Plus One</button>

  </div>
</template>

<script>
import { value, computed } from 'vue-function-api';

export default {
  props: {
    name: String,
    isAdmin: Boolean,
  },
  setup(props) {
    console.log(props);
    const title = value('Dashboard');
    const content = value('This is an awesome dashboard');
    const count = value(0);

    const fullContent = computed(() => `${content.value}, ${props.name}!`)

    const addThree = () => {
      count.value += 3;
    }

    return {
      title,
      content,
      count,
      addThree,
      fullContent,
    }
  },

}
</script>
