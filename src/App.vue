<template>
  <div id="app">
    <navigation/>
    <router-view/>
  </div>
</template>


<script>
  import Navigation from '@/core/components/Navigation';

  export default {
    components: { Navigation }
  };
</script>
