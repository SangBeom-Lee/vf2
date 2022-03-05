<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"/>
      <site-title :title="title"></site-title>
      <v-btn icon @click="save"><v-icon>mdi-check</v-icon></v-btn>
      <v-btn icon @click="read"><v-icon>mdi-numeric</v-icon></v-btn>
      <v-btn icon @click="readOne"></v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer">
      <site-menu></site-menu>
    </v-navigation-drawer>

    <v-content>
      <router-view/>
    </v-content>
    <site-footer :footer="footer"></site-footer>

  </v-app>
</template>

<script>
import SiteTitle from '@/views/site/TitleView'
import SiteFooter from '@/views/site/FooterView'
import SiteMenu from '@/views/site/MenuView'
import { getDatabase, ref, set, onValue, get, child } from 'firebase/database'

export default {
  components: { SiteTitle, SiteFooter, SiteMenu },
  name: 'App',
  data () {
    return {
      drawer: false,
      title: '나의 타이틀입니다.',
      footer: '푸터입니다.'
    }
  },
  mounted () {
    console.log(this.$firebase)
  },
  methods: {
    save () {
      console.log('save@@@')
      const db = getDatabase()
      set(ref(db, 'abcd'), {
        title: 'abcd',
        text: 'tttt'
      })
    },
    read () {
      const db = getDatabase()
      const starCountRef = ref(db, 'abcd')
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val()
        console.log(data)
      })
    },
    readOne () {
      const dbRef = ref(getDatabase())
      get(child(dbRef, 'abcd')).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val())
        } else {
          console.log('No data available')
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>
