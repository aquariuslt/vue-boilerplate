<template>
  <div>
    <h1>Navigation:</h1>
    <router-link to="/login">Login</router-link>
    <router-link to="/home">Home</router-link>
    <router-view></router-view>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        message: 'Hello Vue'
      };
    }
  };


</script>

<style>

</style>
