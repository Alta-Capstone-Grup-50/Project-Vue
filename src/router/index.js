import Vue from "vue";
import VuerRouter from "vue-router";
import HomeAdmin from "@/views/admin/HomeAdmin";
import DataDokter from "@/views/admin/DataDokter";
import HomeDokter from "@/views/dokter/HomeDokter";
import DataPerawat from "@/views/admin/DataPerawat";
import DataPerawatDokter from "@/views/dokter/DataPerawat.vue"
import HomePage from "@/views/HomePage";
import ManageAccount from "@/views/ManageAccount";
import AddAccount from "@/views/AddAccount";
import PasienRawatJalan from "@/views/admin/PasienRawatJalan.vue"
import PasienRawatJalanDokter from "@/views/dokter/PasienRawatJalan.vue"

import DataPasien from '@/views/admin/DataPasien.vue'
import DataPasienDokter from '@/views/dokter/DataPasien.vue'
import Default from "@/layout/default.vue";
import LoginPage from "@/views/LoginPage";


import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)



Vue.use(VuerRouter);

const routes = [
  {
    path: "/",
    name: "Layout",
    component :Default,
    children : [
      {
        path:"/HomeAdmin",
        name:"HomeAdmin",
        component: HomeAdmin,
      },
      {
        path:"/DataDokter",
        name:"DataDokter",
        component: DataDokter,
      },
      {
        path: "/DataPasien",
        name: "DataPasien",
        component : DataPasien,
      },
      {
        path: "/PasienRawatJalan",
        name: "PasienRawatJalan",
        component : PasienRawatJalan,
      },
      {
        path: "/DataPerawat",
        name: "DataPerawat",
        component : DataPerawat,
      },
      {
        path: "/DataPerawatDokter",
        name: "DataPerawatDokter",
        component : DataPerawatDokter,
      },
      {
        path:"/HomeDokter",
        name:"HomeDokter",
        component: HomeDokter,
      },
      {
        path:"/PasienRawatDokter",
        name:"PasienRawatDokter",
        component: PasienRawatJalanDokter,
      },
      {
        path: "/AddAccount",
        name: "AddAccount",
        component: AddAccount,
      },
      {
        path: "/DataPasienDokter",
        name: "DataPasienDokter",
        component: DataPasienDokter,
      },
    ]
    
  },
  {
    path:"/",
    name:"LoginPage",
    component: LoginPage,
  },
  {

    path: "/HomePage",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/TestPage",
    name: "TestPage",

  },
  {
    path: "/ManageAccount",
    name: "ManageAccount",
    component: ManageAccount,
  },
  
];
const router = new VuerRouter({
    mode:"history",
    base: "/",
    routes,
  });

export default router;