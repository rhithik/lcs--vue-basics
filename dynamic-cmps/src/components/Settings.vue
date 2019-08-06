<template>
  <div class="settings--outer cmp--base">
    <h1>{{ title }}</h1>
    {{ content }}
  </div>
</template>

<script>
import { value, onCreated, onActivated, onDeactivated } from 'vue-function-api';

export default {
  props: {
    name: String,
    isAdmin: Boolean,
  },
  setup(props) {
    const title = value('Settings');
    const content = value('Change up the settings a bit.');

    onCreated(() => console.log('The [SETTINGS] component was just created!'));

    onActivated(() => console.log('The [SETTINGS] component was just activated!'));

    onDeactivated(() => console.log('The [SETTINGS] component was just deactivated!'))

    return {
      title,
      content
    }
  }
}
</script>

<style>
.settings--outer {
  background-color: rgb(31, 212, 152);
}
</style>
