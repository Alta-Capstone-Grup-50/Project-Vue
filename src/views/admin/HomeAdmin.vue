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
            <div class="maintxt shadow">
                <div class="bg-text d-flex align-items-center justify-content-center">
                  <p class="card-text text-white text-center"><router-link class="text-decoration-none text-white" to="/DataPasien"><strong>Data Pasien</strong></router-link></p>
                </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="maintenaga shadow">
                <div class="bg-text d-flex align-items-center justify-content-center">
                  <p class="card-text text-white text-center"><router-link class="text-decoration-none text-white" to="/TenagaKesehatanPage"><strong>Data Tenaga Kesehatan</strong></router-link></p>
                </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="mainpasien shadow">
                <div class="bg-text d-flex align-items-center justify-content-center">
                  <p class="card-text text-white text-center"><router-link class="text-decoration-none text-white" to="/PasienRawatjalan"><strong>Pasien Rawat Jalan</strong></router-link></p>
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
div.card{
   border-radius: 30px;
}
.margintop{
  margin-top: 150px;
}
.maintxt {
    background-image: url(https://i.postimg.cc/d3Kg3bG0/Rectangle-44.png);
    width: 420px;
    height: 318px;
    border-radius: 25px;
}
.bg-text {
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0, 0.4); /* Black w/opacity/see-through */
  color: white;
  font-weight: bold;
  width: 420px;
  height: 318px;
  border-radius: 25px;
}
.maintenaga {
    background-image: url(https://i.postimg.cc/9FrT5m8z/Rectangle-44.png);
    width: 420px;
    height: 318px;
    border-radius: 25px;
}
.mainpasien {
    background-image: url(https://i.postimg.cc/XJrQQp1W/Rectangle-44-2.png);
    width: 420px;
    height: 318px;
    border-radius: 25px;
}
</style>