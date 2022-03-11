<template>
  <v-footer app color="primary" dark absolute>
    <v-spacer/>
    <div>&copy; {{ new Date().getFullYear() + ' ' + footer }}</div>
    <v-btn icon @click="openDialog"><v-icon>mdi-grease-pencil</v-icon></v-btn>
      <v-dialog v-model="dialog" max-width="400">
        <v-card-title>
          푸터 수정
          <v-spacer />
          <v-btn icon @click="dialog=false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="text" outlined label='제목' @keypress.enter="save" hide-details/>
        </v-card-text>
      </v-dialog>
  </v-footer>
</template>

<script>
import { getDatabase, ref, update } from 'firebase/database'
export default {
  props: ['footer'],
  data () {
    return {
      dialog: false,
      text: this.footer
    }
  },
  methods: {
    openDialog () {
      this.dialog = true
    },
    save () {
      try {
        const db = getDatabase()
        update(ref(db, '/site/'), {
          footer: this.text
        })
      } finally {
        this.dialog = false
      }
    }
  }
}
</script>
