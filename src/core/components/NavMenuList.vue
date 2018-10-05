<template>
  <div>
    <md-list>
      <md-list-item
        v-for="menu in menus"
        :key="menu.value"
        md-expand
      >
        <md-icon>{{menu.icon}}</md-icon>
        <span class="md-list-item-text">{{$t(menu.label)}}</span>

        <md-list v-if="menu.children" slot="md-expand">
          <md-list-item
            v-for="children in menu.children"
            :key="children.value"
            :to="children.value"
          >
            <md-icon>{{children.icon}}</md-icon>
            <span class="md-list-item-text">{{$t(children.label)}}</span>
          </md-list-item>
        </md-list>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
  export default {
    name: 'NavMenuList',
    props: {
      menus: Array
    }
  };
</script>

<style scoped>

</style>
