<template>
  <v-container fluid>
    <v-form>
      <v-card :loading="loading">
        <v-toolbar color='accent' dense flat dark>
          <v-toolbar-title>게시판 글 작성</v-toolbar-title>
          <v-spacer/>
          <v-btn icon @click="$router.push('/board/' + document)"><v-icon>mdi-arrow-left</v-icon></v-btn>
          <v-btn icon @click="save"><v-icon>mdi-content-save</v-icon></v-btn>
        </v-toolbar>
        <v-card-text>
          <v-text-field v-model="form.title" outlined label="제목"></v-text-field>
          <toastEditor :initialValue="form.content" ref="editor"></toastEditor>
          <toastViewer v-if="toggle" :initialValue="text"></toastViewer>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>
<script>
import { getFirestore, doc, onSnapshot, writeBatch, getDoc } from 'firebase/firestore'
export default {
  props: ['document', 'action'],
  data () {
    return {
      unsubscribe: null,
      toggle: false,
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
  computed: {
    articleId () {
      return this.$route.query.articleId
    }
  },
  watch: {
    document () {
      this.subscribe()
    }
  },
  created () {
    this.db = getFirestore()
    this.subscribe()
  },
  methods: {
    subscribe () {
      console.log(this.articleId)
      if (this.articleId) return

      if (this.unsubscribe) this.unsubscribe()
      this.ref = doc(this.db, 'boards', this.document, 'articles')
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
      this.loading = true
      try {
        const createdAt = new Date()
        // const id = createdAt.getTime().toString()
        const boardData = doc(this.db, 'boards', this.document)
        const boardDataSn = await getDoc(boardData)
        const boardCnt = boardDataSn.data().count
        const data = {
          title: this.form.title,
          updatedAt: createdAt
        }
        console.log(this.ref)
        const batch = await writeBatch(this.db)
        console.log(2222)
        if (!this.articleId) {
          data.createdAt = createdAt
          data.commentCount = 0
          batch.set(boardData, data)
          console.log(3333)
          batch.update(boardData, { count: boardCnt + 1 })
          console.log(4444)
        } else {
          const articleDataRef = doc(this.db, 'boards', this.document, 'articles')
          batch.update(articleDataRef, data)
        }
        await batch.commit()
      } finally {
        this.loading = false
        // this.$router.push({ path: this.$route.path + '/article-write' })
      }
    }
  }
}
</script>
