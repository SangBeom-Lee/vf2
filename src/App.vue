<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"/>
      <site-title :title="site.title"></site-title>
      <v-spacer/>
      <site-sign></site-sign>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" width="400">
      <site-menu :items="site.items"></site-menu>
    </v-navigation-drawer>

    <v-content>
      <router-view/>
    </v-content>
    <site-footer :footer="site.footer"></site-footer>

  </v-app>
</template>

<script>
import SiteTitle from '@/views/site/TitleView'
import SiteFooter from '@/views/site/FooterView'
import SiteMenu from '@/views/site/MenuView'
import SiteSign from '@/views/site/SignView'
import { getDatabase, ref, set, onValue, get, child } from 'firebase/database'

export default {
  components: { SiteTitle, SiteFooter, SiteMenu, SiteSign },
  name: 'App',
  data () {
    return {
      drawer: false,
      site: {
        items: [],
        title: '',
        footer: ''
      },
      db: null
    }
  },
  created () {
    this.db = getDatabase()
    this.subscribe()
  },
  methods: {
    // 최초메뉴 불러오기
    subscribe () {
      const starCountRef = ref(this.db, 'site')
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          this.site = data
          console.log(this.site)
        } else {
          set(ref(this.db, 'site'), {
            title: 'Title',
            footer: 'Footer',
            items: [
              {
                title: 'Home',
                icon: 'mdi-home',
                active: true,
                subitems: [
                  {
                    title: 'Dashboard',
                    to: '/'
                  },
                  {
                    title: 'About',
                    to: '/about'
                  }
                ]
              }
            ]
          })
          this.site.title = 'Title'
          this.site.footer = 'Footer'
        }
      }, (e) => {
        console.log(e.message)
      })
    },
    save () {
      const db = getDatabase()
      set(ref(db, 'site'), {
        title: 'Title',
        text: 'Text',
        footer: 'Footer'
      })
    },
    read () {
      const db = getDatabase()
      const starCountRef = ref(db, 'site')
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val()
        console.log(data)
      })
    },
    readOne () {
      const dbRef = ref(getDatabase())
      get(child(dbRef, 'site')).then((snapshot) => {
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
