<template>
  <div class="text-center">
    <navbar />
    <b-container class="mt-3">
      <div class="mt-5 mb-5 text-center mr-auto ml-auto">
        <div class="row justify-content-center">
          <div class="col-6">
            <div class="card border shadow">
              <img src="https://i.postimg.cc/rpXF7vBX/Frame-12-1.png" class="card-img-top p-4" alt="">
              <div class="card-body text-center">
                <p class="card-text text-center"><router-link class="text-decoration-none text-black" to="/DataDokterFlowDokter"><strong>Data Dokter</strong></router-link></p>
                <a href="#" class="btn btn-primary"><router-link class="text-decoration-none text-white" to="/DataDokterFlowDokter"><strong>Lebih Lanjut</strong></router-link></a>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="card border shadow">
              <img src="https://i.postimg.cc/rpXF7vBX/Frame-12-1.png" class="card-img-top p-4" alt="">
              <div class="card-body text-center">
                <p class="card-text text-center"><router-link class="text-decoration-none text-black" to="/DataPerawatDokter"><strong>Data Perawat</strong></router-link></p>
                <a href="#" class="btn btn-primary"><router-link class="text-decoration-none text-white" to="/DataPerawatDokter"><strong>Lebih Lanjut</strong></router-link></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>

import navbar from '@/components/NavbarDokter.vue'
export default {
  components : {
    navbar
  },
   mounted()
    {
      let user= localStorage.getItem('userLogin');
      if(!user){
        this.$router.push({name:"LoginPage"})
      } 
    }
}
</script>

<style>
div.card{
   border-radius: 30px;
}
</style>