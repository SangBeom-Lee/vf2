<template>
  <v-container fluid>
    <v-form>
      <v-card :loading="loading">
        <v-toolbar color='accent' dense flat dark>
          <v-toolbar-title>게시판 정보 작성</v-toolbar-title>
          <v-spacer/>
          <v-btn v-icon @click="$router.push('/board/' + document)"><v-icon>mdi-arrow-left</v-icon></v-btn>
          <v-btn v-icon @click="save"><v-icon>mdi-content-save</v-icon></v-btn>
        </v-toolbar>
        <v-card-text>
          <v-text-field v-model="form.category" outlined label="종류"></v-text-field>
          <v-text-field v-model="form.title" outlined label="제목"></v-text-field>
          <v-text-field v-model="form.description" outlined label="설명"></v-text-field>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>
<script>
import { getFirestore, onSnapshot, doc, setDoc, updateDoc } from 'firebase/firestore'
export default {
  props: ['document', 'action'],
  data () {
    return {
      unsubscribe: null,
      form: {
        category: '',
        title: '',
        description: ''
      },
      exists: false,
      loading: false,
      ref: null,
      db: null
    }
  },
  created () {
    this.db = getFirestore()
    this.subscribe()
  },
  methods: {
    subscribe () {
      if (this.unsubscribe) this.unsubscribe()
      this.ref = doc(this.db, 'boards', this.document)
      this.unsubscribe = onSnapshot(this.ref, (me) => {
        this.exists = me.exists
        if (this.exists) {
          const item = me.data()
          this.form.category = item.category
          this.form.title = item.title
          this.form.description = item.description
        }
      })
    },
    async save () {
      const form = {
        category: this.form.category,
        title: this.form.title,
        description: this.form.description
      }
      this.loading = true
      try {
        if (this.exists) {
          form.createdAt = new Date()
          await setDoc(this.ref, form)
        } else {
          form.updatedAt = new Date()
          await updateDoc(this.ref, form)
        }

        this.$router.push('/board/' + this.document)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
