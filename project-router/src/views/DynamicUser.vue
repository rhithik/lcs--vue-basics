<template>
  <div>
    <h1>Dynamic User</h1>
    <h5>Welcome! Your name is {{ $route.params.name || 'User' }}!</h5>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
