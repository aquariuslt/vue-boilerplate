<template>
  <md-app md-mode="reveal">
    <md-app-toolbar md-mode="flexible">
      <div class="md-toolbar-row">
        <md-button class="md-icon-button" @click="collapse = !collapse">
          <md-icon v-if="!collapse">menu</md-icon>
          <md-icon v-else>clear_all</md-icon>
        </md-button>
        <router-link
          to="/"
          class="md-title app-title">
          {{title}}
        </router-link>
      </div>
    </md-app-toolbar>

    <md-app-drawer
      :md-active.sync="collapse"
    >
      <md-toolbar
        class="md-transparent"
        md-elevation="0"
      >
        <router-link
          to="/"
          class="md-title app-title"
        >
          <span>{{title}}</span>
        </router-link>
      </md-toolbar>

      <nav-menu-list :menus="menus"/>
    </md-app-drawer>

    <md-app-content>
      <slot></slot>
    </md-app-content>
  </md-app>
</template>

<script>
  import NavMenuList from '@/core/components/NavMenuList';

  export default {
    name: 'Navigation',
    components: { NavMenuList },
    props: {
      title: String,
      menus: Array
    },
    data: () => ({
      collapse: false
    }),
    methods: {}
  };
</script>

<style lang="less" scoped>
  .app-title {
    &:hover {
      cursor: pointer;
      text-decoration: none;
    }
  }

  /* override md-app overlay style */
  .md-app {
    min-height: 100vh;
  }
</style>
