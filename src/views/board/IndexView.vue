<template>
  <v-card>
    <v-card-title>Board Test</v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
    >
      <template v-slot:[`item.id`]="{ item }">
        <v-btn icon @click="openDialog(item)"><v-icon icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon @click="remove(item)"><v-icon icon>mdi-delete</v-icon></v-btn>
      </template>
    </v-data-table>
    <v-card-actions>
      <v-btn @click="openDialog(null)"><v-icon left>mdi-pencil</v-icon></v-btn>
    </v-card-actions>
    <v-dialog max-width="500" v-model="dialog">
      <v-card>
        <v-form>
          <v-card-text>
            <v-text-field v-model="form.title"></v-text-field>
            <v-text-field v-model="form.content"></v-text-field>
          </v-card-text>
          <v-card-actions>
          <v-spacer/>
            <v-btn @click="update" v-if="selectedItem">edit</v-btn>
            <v-btn @click="save" v-else>save</v-btn>
          </v-card-actions>
          </v-form>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import { collection, addDoc, getFirestore, updateDoc, doc, deleteDoc, onSnapshot, query } from 'firebase/firestore'
export default {
  data () {
    return {
      headers: [
        { value: 'title', text: '제목' },
        { value: 'content', text: '내용' },
        { value: 'id', id: 'id' }
      ],
      items: [],
      form: {
        title: '',
        content: ''
      },
      dialog: false,
      selectedItem: null,
      unsubscribe: null,
      db: null
    }
  },
  created () {
    // this.read()
    this.db = getFirestore()
    this.subscribe()
  },
  destroyed () {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  },
  methods: {
    async subscribe () {
      const q = query(collection(this.db, 'board'))
      this.unsubscribe = onSnapshot(q, (sn) => {
        console.log(11)
        this.items = sn.docs.map((v) => {
          const item = v.data()
          return {
            id: v.id,
            title: item.title,
            content: item.content
          }
        })
      })
    },
    openDialog (item) {
      if (!item) {
        this.form.title = ''
        this.form.content = ''
      } else {
        this.selectedItem = item
        this.form.title = item.title
        this.form.content = item.content
      }
      this.dialog = true
    },
    async save () {
      const db = getFirestore()
      await addDoc(collection(db, 'board'), this.form)

      this.dialog = false
    },
    async update () {
      const db = getFirestore()
      const row = doc(db, 'board', this.selectedItem.id)
      await updateDoc(row, this.form)
      this.dialog = false
    },
    async remove (item) {
      const db = getFirestore()
      await deleteDoc(doc(db, 'board', item.id))
    }
  }
}
</script>
