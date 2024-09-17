import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { requiresAuth: true },
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
    meta: { requiresAuth: true },
    component: () => import('@/views/edit-profile/EditProfileView.vue')
  },
  {
    path: '/edit-profile/change-password/:id',
    name: 'EditProfileChangePassword',
    meta: { requiresAuth: true },
    component: () => import('@/views/edit-profile/EditProfileChangePasswordView.vue')
  },
  {
    path: '/edit-profile/appearance/:id',
    name: 'EditProfileAppearance',
    meta: { requiresAuth: true },
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
    meta: { requiresAuth: true, requiresRole: 1 },
    component: () => import('@/views/admin/ManageUsersView.vue')
  },
  {
    path: '/admin/pending-users',
    name: 'PendingUsers',
    meta: { requiresAuth: true, requiresRole: 1 },
    component: () => import('@/views/admin/PendingUsersView.vue')
  },
  {
    path: '/admin/modify-user/:id',
    name: 'ModifyUser',
    meta: { requiresAuth: true, requiresRole: 1 },
    component: () => import('@/views/admin/ModifyUserView.vue')
  },
  {
    path: '/admin/add-user',
    name: 'AddUser',
    meta: { requiresAuth: true, requiresRole: 1 },
    component: () => import('@/views/admin/AddUserView.vue')
  },
  // Artist
  {
    path: '/artist/edit-public-profile',
    name: 'EditPublicProfile',
    meta: { requiresAuth: true, requiresRole: 3 },
    component: () => import('@/views/artist/EditPublicProfileView.vue')
  },
  {
    path: '/artist/manage-songs',
    name: 'ManageSongs',
    meta: { requiresAuth: true, requiresRole: 3 },
    component: () => import('@/views/artist/ManageSongsView.vue')
  },
  {
    path: '/artist/analytics',
    name: 'ArtistAnalytics',
    meta: { requiresAuth: true, requiresRole: 3 },
    component: () => import('@/views/artist/ArtistAnalytics.vue')
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
    } else if (to.matched.some(record => record.meta.requiresRole)) {
      const requiredRole = to.meta.requiresRole;
      const userRole = store.getters.user.roleId;
      if (userRole !== requiredRole) {
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
