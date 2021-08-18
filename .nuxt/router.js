import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5deaf513 = () => interopDefault(import('..\\client\\pages\\categories.vue' /* webpackChunkName: "pages/categories" */))
const _08463924 = () => interopDefault(import('..\\client\\pages\\defaul-record.vue' /* webpackChunkName: "pages/defaul-record" */))
const _77e8f72d = () => interopDefault(import('..\\client\\pages\\history.vue' /* webpackChunkName: "pages/history" */))
const _2df01bc2 = () => interopDefault(import('..\\client\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _f21eccd8 = () => interopDefault(import('..\\client\\pages\\planning.vue' /* webpackChunkName: "pages/planning" */))
const _6d8509c2 = () => interopDefault(import('..\\client\\pages\\profile.vue' /* webpackChunkName: "pages/profile" */))
const _26ac0048 = () => interopDefault(import('..\\client\\pages\\record.vue' /* webpackChunkName: "pages/record" */))
const _d201644c = () => interopDefault(import('..\\client\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _644878ab = () => interopDefault(import('..\\client\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/categories",
    component: _5deaf513,
    name: "categories"
  }, {
    path: "/defaul-record",
    component: _08463924,
    name: "defaul-record"
  }, {
    path: "/history",
    component: _77e8f72d,
    name: "history"
  }, {
    path: "/login",
    component: _2df01bc2,
    name: "login"
  }, {
    path: "/planning",
    component: _f21eccd8,
    name: "planning"
  }, {
    path: "/profile",
    component: _6d8509c2,
    name: "profile"
  }, {
    path: "/record",
    component: _26ac0048,
    name: "record"
  }, {
    path: "/register",
    component: _d201644c,
    name: "register"
  }, {
    path: "/",
    component: _644878ab,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
