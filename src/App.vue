<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>


<script>
  import Navigation from '@/core/components/Navigation';
  export default {
    components: { Navigation },
    data () {
      return {
      };
    },
    mounted: function () {
    }
  };
</script>
