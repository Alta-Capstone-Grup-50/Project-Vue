<template>
<nav class="navbar navbar-expand-lg navbar-light shadow bg-light" sticky fixed="top">
  <b-container>
    <a class="navbar-brand" href="#">
      <img src="https://i.postimg.cc/CKjq1Vg7/logo-klinik-1.png">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <b-navbar-nav class="ms-auto mb-2 mb-lg-0">
        <b-nav-item ><router-link class="text-decoration-none text-black" to="/HomeDokter"><strong>Home</strong></router-link></b-nav-item>
        <b-nav-item ><router-link class="text-decoration-none text-black" to="/DataPasienDokter"><strong>Data Pasien</strong></router-link></b-nav-item>
        <b-nav-item ><router-link class="text-decoration-none text-black" to="/PasienRawatDokter"><strong>Data Rawat Jalan</strong></router-link></b-nav-item>
        <b-nav-item ><router-link class="text-decoration-none text-black" to="/TenagaKesehatan"><strong>Data Tenaga Kesehatan</strong></router-link></b-nav-item>
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

</style>

