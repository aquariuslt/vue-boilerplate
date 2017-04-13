<template>
  <div>
    <workflow :width="800" :height="400"></workflow>
  </div>
</template>


<script>
  import Workflow from './components/workflow/Workflow.vue';
  export default {
    components: {
      Workflow
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
