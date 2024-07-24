import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue')
  },
  /*{
    path: '/admin',
    name: 'Admin',
    meta: { requiresAuth: true, requiresAdmin: true },
    component: () => import('@/views/AdminPanelView.vue')
  },*/
  {
    path: '/edit-profile/:id',
    name: 'EditProfile',
    component: () => import('@/views/EditProfileView.vue')
  },
  /*{
    path: '/admin/edit/:id',
    name: 'EditUser',
    meta: { requiresAuth: true, requiresAdmin: true },
    component: () => import('@/views/EditProfileView.vue')
  },*/
  { path: '*', redirect: '/' },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else if (to.matched.some(record => record.meta.requiresAdmin)) {
      if (store.getters.userRole !== 'Admin') {
        next({
          path: '/',
        })
      } else {
        next()
      }
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
