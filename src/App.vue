<template>
  <div id="app">
    <navigation
      :title="title"
      :menus="menus"
    >
      <transition>
        <router-view/>
      </transition>
    </navigation>
  </div>
</template>


<script>
  import Navigation from '@/core/components/Navigation';
  import { mapGetters } from 'vuex';

  export default {
    components: { Navigation },
    name: 'App',
    computed: mapGetters([
      'title',
      'menus'
    ])
  };
</script>


