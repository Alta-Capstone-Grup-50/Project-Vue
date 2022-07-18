<template>
<nav class="navbar fixed-top navbar-expand-lg navbar-light shadow bg-light" >
  <b-container>
    <a class="navbar-brand" href="#">
      <img src="https://i.postimg.cc/CKjq1Vg7/logo-klinik-1.png">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <b-navbar-nav class="ms-auto mb-2 mb-lg-0" >
        <b-nav-item ><router-link class="text-decoration-none item text-black" to="/HomeAdmin">Home</router-link></b-nav-item>
        <b-nav-item ><router-link class="text-decoration-none item text-black" to="/DataPasien">Data Pasien</router-link></b-nav-item>
        <b-nav-item ><router-link class="text-decoration-none item text-black" to="/PasienRawatJalan">Data Rawat Jalan</router-link></b-nav-item>
        <b-nav-item ><router-link class="text-decoration-none item text-black" to="/TenagaKesehatanPage">Data Tenaga Kesehatan</router-link></b-nav-item>
        <b-nav-item ><router-link class="text-decoration-none item text-black" to="/ManageAccount">Manage Account</router-link></b-nav-item>
        <b-button size="sm" v-on:click="logout" type="logout" class="btn btn-warning text-white">Logout</b-button>
      </b-navbar-nav>
    </div>
  </b-container>
</nav>
</template>
<script>
export default {
  name: 'NavbarPage',
  methods:{
    logout()
    {
      localStorage.clear();
      this.$router.push({name:"LoginPage"})
    }
  },
  components: {

  },
};
</script>
<style>
.item {
  font-weight: 700 !important;
  font-size: 18px !important;
  margin-left: 20px;
}
</style>

