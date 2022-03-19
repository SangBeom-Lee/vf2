<template>
  <v-card>
    <v-card-title>Board Test</v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      :options="options"
      :server-items-length="serverItemsLength"
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
import { collection, addDoc, getFirestore, updateDoc, doc, deleteDoc, onSnapshot, query, limit } from 'firebase/firestore'
import { head, last } from 'lodash'

export default {
  data () {
    return {
      headers: [
        { value: 'title', text: '제목' },
        { value: 'content', text: '내용' },
        { value: 'createdAt', text: '작성일' },
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
      unsubscribeCount: null,
      serverItemsLength: 0,
      options: {},
      docs: [],
      db: null
    }
  },
  watch: {
    options: {
      handler (n, o) {
        console.log(o)
        console.log(n)
        this.unsubscribe()
      },
      deep: true
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
      this.unsubscribeCount = onSnapshot(doc(this.db, 'meta', 'boards'), (me) => {
        this.serverItemsLength = me.data().count
      })
      const q = query(collection(this.db, 'board'), limit(this.options.itemsPerPage))
      this.unsubscribe = onSnapshot(q, (sn) => {
        this.docs = sn.docs
        console.log(head(sn.docs).data())
        console.log(last(sn.docs).data())
        this.items = sn.docs.map((v) => {
          const item = v.data()
          return {
            id: v.id,
            title: item.title,
            content: item.content,
            createdAt: item.createdAt
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
      const item = {
        createdAt: this.$getNowDate(),
        title: this.form.title,
        content: this.form.content
      }
      await addDoc(collection(this.db, 'board'), item)

      this.dialog = false
    },
    async update () {
      const row = doc(this.db, 'board', this.selectedItem.id)
      await updateDoc(row, this.form)
      this.dialog = false
    },
    async remove (item) {
      await deleteDoc(doc(this.db, 'board', item.id))
    }
  }
}
</script>
