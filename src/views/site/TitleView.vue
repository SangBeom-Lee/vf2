<template>
    <v-toolbar-title>
        {{ title }}
        <v-btn icon @click="openDialog"><v-icon>mdi-grease-pencil</v-icon></v-btn>
        <v-dialog v-model="dialog" max-width="400">
          <v-card-title>
            제목 수정
            <v-spacer />
            <v-btn icon @click="dialog=false"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="text" outlined label='제목' @keypress.enter="save" hide-details/>
          </v-card-text>
        </v-dialog>

    </v-toolbar-title>
</template>
<script>
import { getDatabase, ref, update } from 'firebase/database'
export default {
  props: ['title'],
  data () {
    return {
      dialog: false,
      text: this.title
    }
  },
  methods: {
    openDialog () {
      this.dialog = true
    },
    save () {
      try {
        const db = getDatabase()
        const data = {
          title: this.text
        }
        const updates = {}
        updates['/site/'] = data
        console.log(updates)
        update(ref(db), updates)
      } catch (e) {
        console.log(e.message)
      } finally {
        this.dialog = false
      }
    }
  }
}
</script>
