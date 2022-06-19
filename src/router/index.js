import Vue from "vue";
import VuerRouter from "vue-router";
import LoginPage from "@/views/LoginPage";
import DataDokter from "@/views/admin/DataDokter";
import HomeDokter from "@/views/dokter/HomeDokter";
import HomePage from "@/views/HomePage";
import ManageAccount from "@/views/ManageAccount";
import AddAccount from "@/views/AddAccount";
Vue.use(VuerRouter);

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component : LoginPage,

  },
  {
    path: "/HomePage",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/HomeDokter",
    name: "HomeDokter",
    component: HomeDokter,
  },
  {
    path: "/DataDokter",
    name: "DataDokter",
    component: DataDokter,
  },
  {
    path: "/ManageAccount",
    name: "ManageAccount",
    component: ManageAccount,
  },
  {
    path: "/AddAccount",
    name: "AddAccount",
    component: AddAccount,
  }
];
const router = new VuerRouter({
    mode:"history",
    base: process.env.BASE_URL,
    routes,
  })

export default router;