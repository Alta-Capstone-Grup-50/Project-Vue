import Vue from "vue";
import VuerRouter from "vue-router";
import HomeAdmin from "@/views/admin/HomeAdmin";
import DataDokter from "@/views/admin/DataDokter";
import HomeDokter from "@/views/dokter/HomeDokter";
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
        path:"/",
        name:"DataDokter",
        component: DataDokter,
      },
      {
        path:"/HomeDokter",
        name:"HomeDokter",
        component: HomeDokter,
      }
    ]
    
  },
  {
    path:"/LoginPage",
    name:"LoginPage",
    component: LoginPage,
  },
];
const router = new VuerRouter({
    mode:"history",
    base: "/",
    routes,
  });

export default router;