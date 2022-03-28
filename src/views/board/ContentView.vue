<template>
  <v-container fulid>
    <v-card>
      <v-toolbar color="accent" dense falt dark>
        <v-toolbar-title v-text="info.title"></v-toolbar-title>
        <v-spacer/>
        <v-btn v-icon @click="write"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn v-icon @click="articleWrite"><v-icon>mdi-plus</v-icon></v-btn>
      </v-toolbar>
      <v-card-text v-if="info.createdAt">
        <v-alert color="info" outlined dismissible>
          <div style="white-space: pre-line">{{ info.description }}</div>
          <div class="text-right font-italic caption">{{ info.createdAt.toDate() }}</div>
          <div class="text-right font-italic caption">{{ info.updatedAt.toDate() }}</div>
        </v-alert>
      </v-card-text>
      <v-card-text>
        articles
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { getFirestore, onSnapshot, doc } from 'firebase/firestore'
export default {
  props: ['document'],
  data () {
    return {
      unsubscribe: null,
      info: {
        category: '',
        title: '',
        description: ''
      },
      loading: false,
      db: null
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
  destroyed () {
    if (this.unsubscribe) this.unsubscribe()
  },
  methods: {
    subscribe () {
      if (this.unsubscribe) this.unsubscribe()
      this.unsubscribe = onSnapshot(doc(this.db, 'boards', this.document), (me) => {
        if (!me.data()) return this.write()
        this.info = me.data()
      })
    },
    async write () {
      this.$router.push(this.$route.path + '/config-write')
    },
    async articleWrite () {
      this.$router.push({ path: this.$route.path + '/article-write', query: { articleId: 'new' } })
    }
  }
}
</script>
