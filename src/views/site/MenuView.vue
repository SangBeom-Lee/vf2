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
          <v-list-item-action>
            <v-btn @click="openDialogItem(i)" icon><v-icon>mdi-pencil</v-icon></v-btn>
          </v-list-item-action>
        </template>

        <v-list-item
          v-for="(subitem, j) in menu.subitems"
          :key="j"
          :to="subitem.to"
        >
          <v-list-item-content>
            <v-list-item-title v-text="subitem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
              <v-list-item-title>추가하기</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-item @click="openDialogItem(-1)">
        <v-list-item-icon>
          <v-icon>mdi-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title>추가하기</v-list-item-title>
          </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-dialog v-model="dialogItem" max-width="400">
      <v-card>
        <v-card-title>
          수정하기
          <v-spacer/>
          <v-btn icon @click="saveItem"><v-icon>mdi-content-save</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="formItem.title"></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { getDatabase, ref, update } from 'firebase/database'

export default {
  props: ['items'],
  data () {
    return {
      menus: this.items,
      dialogItem: false,
      dialogSubItem: false,
      formItem: {
        title: '',
        icon: ''
      },
      selectedItemIdx: -1
    }
  },
  methods: {
    openDialogItem (idx) {
      this.selectedItemIdx = idx
      this.dialogItem = true

      if (idx < 0) {
        this.formItem.title = ''
      } else {
        this.formItem.title = this.menus[idx].title
      }
    },
    saveItem () {
      if (this.selectedItemIdx < 0) {
        this.menus.push(this.formItem)
      } else {
        this.menus[this.selectedItemIdx] = this.formItem
      }
      this.save()
    },
    async save () {
      try {
        const db = getDatabase()
        update(ref(db, '/site/'), {
          items: this.items
        })
      } finally {
        this.dialogItem = false
      }
    }
  }
}
</script>
