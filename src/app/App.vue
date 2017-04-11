<template>
  <div>
    <logo></logo>
  </div>
</template>


<script>
  import Logo from './components/logo/Logo.vue';
  export default {
    components: {
      Logo
    },
    data () {
      return {
        message: 'Hello Vue'
      };
    }
  };


</script>

<style>

</style>
