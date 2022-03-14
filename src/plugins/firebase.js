import Vue from 'vue'
import * as firebase from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../firebaseConfig'
import store from '../store/'

firebase.initializeApp(firebaseConfig)

const auth = getAuth()
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.commit('setFireUser', user)
    console.log(user)
  } else {
    // User is signed out
    // ...
  }
})

Vue.prototype.$firebase = firebase
