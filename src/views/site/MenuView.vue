<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class='title'>
          Application
        </v-list-item-title>
        <v-list-item-subtitle>
          subtext
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list>
      <v-list-group
        v-for="(menu, i) in menus"
        :key="i"
        v-model="menu.active"
        :prepend-icon="menu.icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="menu.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="subitem in menu.subitems"
          :key="subitem.title"
          :to="subitem.to"
        >
          <v-list-item-content>
            <v-list-item-title v-text="subitem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>
<script>
export default {
  props: ['items'],
  data () {
    return {
      menus: this.items
    }
  }
}
</script>
