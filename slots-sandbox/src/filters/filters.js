import Vue from 'vue';

Vue.filter('uppercase', (value) => {
  value.toString();
  return value.toUpperCase();
})

Vue.filter('lowercase', (value) => {
  value.toString();
  return value.toLowerCase();
})

