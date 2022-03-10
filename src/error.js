import Vue from 'vue'

Vue.config.errorHandler = e => {
  console.error(e.message)
  console.log('hello')
}
