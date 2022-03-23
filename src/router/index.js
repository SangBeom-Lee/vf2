import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/board',
    name: 'board',
    component: () => import('../views/board/IndexView.vue')
  },
  {
    path: '/storage',
    name: 'storage',
    component: () => import('../views/StorageView.vue')
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('../views/EditorView.vue')
  },
  {
    path: '/:collection/:document',
    name: 'collection-document',
    component: () => import('../views/RenderView.vue')
  },
  {
    path: '/:collection/:document/:action',
    name: 'collection-document',
    component: () => import('../views/RenderView.vue')
  },
  {
    path: '*',
    name: 'error',
    component: () => import('../views/ErrorView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
