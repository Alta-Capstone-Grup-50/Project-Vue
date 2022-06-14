import Vue from "vue";
import VuerRouter from "vue-router";
import LoginPage from "@/views/LoginPage";
import DataDokter from "@/views/admin/DataDokter";
import HomeDokter from "@/views/dokter/HomeDokter";
import DataPasien from '@/views/admin/DataPasien.vue'
import TestPage from '@/views/TestPage.vue'

Vue.use(VuerRouter);

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component : LoginPage,

  },
  {
    path: "/HomeDokter",
    name: "HomeDokter",
    component: HomeDokter,
  },
  {
    path: "/DataDokter",
    name: "DataDokter",
    component : DataDokter,
  },
  {
    path: "/DataPasien",
    name: "DataPasien",
    component : DataPasien,
  },
  {
    path: "/TestPage",
    name: "TestPage",
    component : TestPage,
  },
];
const router = new VuerRouter({
    mode:"history",
    base: process.env.BASE_URL,
    routes,
  })

export default router;