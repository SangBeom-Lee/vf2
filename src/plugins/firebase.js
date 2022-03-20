import Vue from 'vue'
import * as firebase from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import firebaseConfig from '../../firebaseConfig'
import store from '../store/'

firebase.initializeApp(firebaseConfig)

const auth = getAuth()
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.commit('setFireUser', user)
  } else {
    // User is signed out
    // ...
  }
})

const getNowDate = function () {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
}

Vue.prototype.$firebase = firebase
Vue.prototype.$getNowDate = getNowDate
