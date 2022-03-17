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
            <v-list-item-title>
              {{ menu.title }}
              <span>
                <v-btn @click="openDialogItem(i)" icon><v-icon>mdi-pencil</v-icon></v-btn>
                <v-btn icon @click="moveItem(menus, i, -1)" v-if="i > 0"><v-icon>mdi-chevron-double-up</v-icon></v-btn>
                <v-btn icon @click="moveItem(menus, i, 1)" v-if="i < items.length - 1"><v-icon>mdi-chevron-double-down</v-icon></v-btn>
                <v-btn icon @click="deleteItem(menus, i)"><v-icon>mdi-delete</v-icon></v-btn>
              </span>
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
          </v-list-item-action>
        </template>

        <v-list-item
          v-for="(subitem, j) in menu.subitems"
          :key="j"
          :to="subitem.to"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ subitem.title }}
              <span>
                <v-btn @click="openDialogSubItem(i, j)" icon><v-icon>mdi-pencil</v-icon></v-btn>
                <v-btn icon @click="moveItem(menu.subitems, j, -1)" v-if="j > 0"><v-icon>mdi-chevron-double-up</v-icon></v-btn>
                <v-btn icon @click="moveItem(menu.subitems, j, 1)" v-if="j < menu.subitems.length - 1"><v-icon>mdi-chevron-double-down</v-icon></v-btn>
                <v-btn icon @click="deleteItem(menu.subitems, j)"><v-icon>mdi-delete</v-icon></v-btn>
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="openDialogSubItem(i,-1)">
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
          1차 메뉴 수정
          <v-spacer/>
          <v-btn icon @click="saveItem"><v-icon>mdi-content-save</v-icon></v-btn>
          <v-btn icon @click="dialogItem=false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="formItem.icon" label="mdi icon" outlined clearable required></v-text-field>
          <v-text-field v-model="formItem.title" label="메뉴 이름" outlined hide-details></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogSubItem" max-width="400">
      <v-card>
        <v-card-title>
          서브 아이템 수정
          <v-spacer/>
          <v-btn icon @click="saveSubItem"><v-icon>mdi-content-save</v-icon></v-btn>
          <v-btn icon @click="dialogSubItem=false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="formSubItem.title" label="메뉴 이름" outlined required></v-text-field>
          <v-text-field v-model="formSubItem.to" label="경로" outlined hide-details></v-text-field>
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
    console.log(this.items)
    return {
      menus: this.items,
      dialogItem: false,
      dialogSubItem: false,
      formItem: {
        title: '',
        icon: 'mdi-crosshairs-question'
      },
      formSubItem: {
        title: '',
        to: ''
      },
      selectedItemIdx: -1,
      selectedSubItemIdx: -1
    }
  },
  methods: {
    // 메뉴 Dialog 창
    openDialogItem (idx) {
      this.selectedItemIdx = idx

      if (idx < 0) {
        this.formItem.icon = 'mdi-crosshairs-question'
        this.formItem.title = ''
      } else {
        this.formItem.icon = this.menus[idx].icon
        this.formItem.title = this.menus[idx].title
      }
      this.dialogItem = true
    },
    // 1차 저장
    saveItem () {
      if (this.selectedItemIdx < 0) {
        this.menus.push(this.formItem)
      } else {
        this.menus[this.selectedItemIdx] = this.formItem
      }
      this.save()
    },
    // firebase 저장
    async save () {
      try {
        const db = getDatabase()
        update(ref(db, '/site/'), {
          items: this.menus
        })
      } finally {
        this.dialogItem = false
        this.dialogSubItem = false
      }
    },
    // 2차 메뉴 팝업
    openDialogSubItem (idx, subIdx) {
      this.selectedItemIdx = idx
      this.selectedSubItemIdx = subIdx
      if (subIdx < 0) {
        this.formSubItem.title = ''
        this.formSubItem.to = ''
      } else {
        this.formSubItem.title = this.menus[idx].subitems[subIdx].title
        this.formSubItem.to = this.menus[idx].subitems[subIdx].to
      }
      this.dialogSubItem = true
    },
    // 2차 저장
    async saveSubItem () {
      if (this.selectedSubItemIdx < 0) {
        console.log(this.selectedItemIdx)
        if (!this.menus[this.selectedItemIdx].subitems) {
          this.menus[this.selectedItemIdx].subitems = []
        }
        this.menus[this.selectedItemIdx].subitems.push({
          title: this.formSubItem.title,
          to: this.formSubItem.to
        })
      } else {
        this.menus[this.selectedItemIdx].subitems[this.selectedSubItemIdx].title = this.formSubItem.title
        this.menus[this.selectedItemIdx].subitems[this.selectedSubItemIdx].to = this.formSubItem.to
      }
      this.save()
    },
    // 메뉴 위로 이동
    moveItem (menus, i, arrow) {
      const menu = menus.splice(i, 1)[0]
      menus.splice(i + arrow, 0, menu)
      this.save()
    },
    // 삭제
    deleteItem (menus, i) {
      menus.splice(i, 1)
      this.save()
    }
  }
}
</script>
