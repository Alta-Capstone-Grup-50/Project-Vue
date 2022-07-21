import Vue from "vue";
import VuerRouter from "vue-router";
import LoginPage from "@/views/LoginPage";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)



Vue.use(VuerRouter);

const routes = [
  {
    path: '/HomeAdmin',
    name: 'HomeAdmin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/HomeAdmin.vue')
  },
  {
    path: '/DataPasien',
    name: 'DataPasien',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/DataPasien.vue')
  },
  {
    path: '/PasienRawatJalan',
    name: 'PasienRawatJalan',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/PasienRawatJalan.vue')
  },
  {
    path: '/DataDokter',
    name: 'DataDokter',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/DataDokter.vue')
  },
  {
    path: '/DataPerawat',
    name: 'DataPerawat',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/DataPerawat.vue')
  },
  {
    path: '/TenagaKesehatanPage',
    name: 'TenagaKesehatan',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/TenagaKesehatanPage.vue')
  },
  {
    path: '/ManageAccount',
    name: 'ManageAccount',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ManageAccount.vue')
  },
  {
    path: '/DataDokterFlowDokter',
    name: 'DataDokterDokter',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/dokter/DataDokter.vue')
  },
  {
    path: '/DataPasienDokter',
    name: 'DataPasienDokter',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/dokter/DataPasien.vue')
  },
  {
    path: '/DataPerawatDokter',
    name: 'DataPerawatDokter',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/dokter/DataPerawat.vue')
  },
  {
    path: '/HomeDokter',
    name: 'HomeDokter',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/dokter/HomeDokter.vue')
  },
  {
    path: '/PasienRawatDokter',
    name: 'PasienRawatJalan',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/dokter/PasienRawatJalan.vue')
  },
  {
    path: '/TenagaKesehatan',
    name: 'TenagaKesehatan',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/dokter/TenagaKesehatan.vue')
  },

  {
    path: '/',
    name: 'LoginPage',
    component : LoginPage
  }
]

const router = new VuerRouter({
  mode:"history",
  base: "/",
  routes,
});
export default router
