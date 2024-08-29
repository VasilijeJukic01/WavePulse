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
  {
    path: '/edit-profile/:id',
    name: 'EditProfile',
    component: () => import('@/views/edit-profile/EditProfileView.vue')
  },
  {
    path: '/edit-profile/change-password/:id',
    name: 'EditProfileChangePassword',
    component: () => import('@/views/edit-profile/EditProfileChangePasswordView.vue')
  },
  {
    path: '/edit-profile/appearance/:id',
    name: 'EditProfileAppearance',
    component: () => import('@/views/edit-profile/EditProfileAppearanceView.vue')
  },
  {
    path: '/terms-of-service',
    name: 'TermsOfService',
    component: () => import('@/views/policies/TermsOfServiceView.vue')
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/policies/PrivacyPolicyView.vue')
  },
  // Admin
  {
    path: '/admin/manage-users',
    name: 'Admin',
    // meta: { requiresAuth: true, requiresAdmin: true },
    component: () => import('@/views/admin/ManageUsersView.vue')
  },
  {
  path: '/admin/modify-user/:id',
  name: 'ModifyUser',
  // meta: { requiresAuth: true, requiresAdmin: true },
  component: () => import('@/views/admin/ModifyUserView.vue')
  },
  { path: '*', redirect: '/' },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
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
