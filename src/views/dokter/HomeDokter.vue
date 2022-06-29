<template>
  <div class="text-center">
    <navbar />
    <b-container>
      <div>
        <b-img src="https://i.postimg.cc/wBYm6Dvv/beautiful-shot-ponte-vecchio-florence-tuscany-italy-1.png" rounded class="mt-5 shadow" fluid alt="Responsive image"></b-img>
      </div>
      <div class="mt-5 mb-5 text-center mr-auto ml-auto">
        <div class="row justify-content-center">
          <div class="col-4">
            <div class="card border shadow">
              <img src="https://i.postimg.cc/rpXF7vBX/Frame-12-1.png" class="card-img-top p-4" alt="">
              <div class="card-body text-center">
                <p class="card-text text-center"><router-link class="text-decoration-none text-black" to="/DataPasienDokter"><strong>Data Pasien</strong></router-link></p>
                <a href="#" class="btn btn-primary"><router-link class="text-decoration-none text-white" to="/DataPasienDokter"><strong>Lebih Lanjut</strong></router-link></a>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="card border shadow">
              <img src="https://i.postimg.cc/rpXF7vBX/Frame-12-1.png" class="card-img-top p-4" alt="">
              <div class="card-body text-center">
                <p class="card-text text-center"><router-link class="text-decoration-none text-black" to="/TenagaKesehatan"><strong>Data Dokter dan Perawat</strong></router-link></p>
                <a href="#" class="btn btn-primary"><router-link class="text-decoration-none text-white" to="/TenagaKesehatan"><strong>Lebih Lanjut</strong></router-link></a>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="card border shadow">
              <img src="https://i.postimg.cc/rpXF7vBX/Frame-12-1.png" class="card-img-top p-4" alt="">
              <div class="card-body text-center">
                <p class="card-text text-center"><router-link class="text-decoration-none text-black" to="/PasienRawatJalan"><strong>Data Rawat Jalan</strong></router-link></p>
                <a href="#" class="btn btn-primary"><router-link class="text-decoration-none text-white" to="/PasienRawatJalan"><strong>Lebih Lanjut</strong></router-link></a>
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
export default{
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