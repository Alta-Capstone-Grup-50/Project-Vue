<template>
  <div class="text-center">
    <navbar />
    <b-container>
      <div>
        <b-img src="https://i.postimg.cc/nV5gmjBN/Frame-168-1.png" class="margintop" fluid alt="Responsive image"></b-img>
      </div>
      <div class="mt-5 mb-5 text-center mr-auto ml-auto">
        <div class="row justify-content-center">
          <div class="col-12 col-md-4">
            <div class="card border text-white" >
              <img src="https://i.postimg.cc/d3Kg3bG0/Rectangle-44.png" class="card-img border" alt="...">
              <div class="card-img-overlay">
               <div class="bg-text d-flex align-items-center center justify-content-center">
                  <p class="card-text text-white text-center"><router-link class="text-decoration-none text-white" to="/DataPasien"><strong>Data Pasien</strong></router-link></p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="card border text-white">
              <img src="https://i.postimg.cc/9FrT5m8z/Rectangle-44.png" class="card-img border" alt="...">
              <div class="card-img-overlay">
               <div class="bg-text d-flex align-items-center center justify-content-center">
                  <p class="card-text text-white text-center"><router-link class="text-decoration-none text-white" to="/PasienRawatJalan"><strong>Data Rawat Jalan</strong></router-link></p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="card border text-white">
              <img src="https://i.postimg.cc/T2cWFkr7/Rectangle-44-1.png" class="card-img border" alt="...">
              <div class="card-img-overlay">
               <div class="bg-text d-flex align-items-center center justify-content-center">
                  <p class="card-text text-white text-center"><router-link class="text-decoration-none text-white" to="/TenagaKesehatanPage"><strong>Data Tenaga Kesehatan</strong></router-link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>

import navbar from '@/components/navbar.vue'
export default{
  components : {
      navbar
    },
   mounted()
    {
      let user= localStorage.getItem('adminLogin');
      if(!user){
        this.$router.push({name:"LoginPage"})
      } 
    }
}

</script>

<style>

.margintop{
  margin-top: 150px;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.border {
  border-radius: 30px !important;
  background: rgba(34,34,34,0.75);
}
</style>