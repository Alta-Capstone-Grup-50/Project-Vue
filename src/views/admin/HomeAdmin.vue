<template>
  <div>
    <b-container class="mt-3">
      <div>
        <b-img src="https://i.postimg.cc/wBYm6Dvv/beautiful-shot-ponte-vecchio-florence-tuscany-italy-1.png" rounded class="mt-5 shadow" fluid alt="Responsive image"></b-img>
      </div>
      <div class="container mt-5 mb-5">
        <div class="row">
          <div class="col">
            <div class="card" style="width: 18rem;">
              <img src="https://i.postimg.cc/rpXF7vBX/Frame-12-1.png" class="card-img-top" alt="">
              <div class="card-body text-center">
                <p class="card-text text-center"><router-link class="text-decoration-none text-black" to="/DataPasien"><strong>Data Pasien</strong></router-link></p>
                <a href="#" class="btn btn-primary"><router-link class="text-decoration-none text-white" to="/DataPasien"><strong>Lebih Lanjut</strong></router-link></a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card" style="width: 18rem;">
              <img src="https://i.postimg.cc/rpXF7vBX/Frame-12-1.png" class="card-img-top" alt="">
              <div class="card-body text-center">
                <p class="card-text text-center"><router-link class="text-decoration-none text-black" to="/DataDokter"><strong>Data Dokter</strong></router-link></p>
                <a href="#" class="btn btn-primary"><router-link class="text-decoration-none text-white" to="/DataDokter"><strong>Lebih Lanjut</strong></router-link></a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card" style="width: 18rem;">
              <img src="https://i.postimg.cc/rpXF7vBX/Frame-12-1.png" class="card-img-top" alt="">
              <div class="card-body text-center">
                <p class="card-text text-center"><router-link class="text-decoration-none text-black" to="/DataPerawat"><strong>Data Perawat</strong></router-link></p>
                <a href="#" class="btn btn-primary"><router-link class="text-decoration-none text-white" to="/DataPerawat"><strong>Lebih Lanjut</strong></router-link></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>

</script>

<style>

</style>