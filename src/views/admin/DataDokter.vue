<template>
<body>
    <b-container>
    <div>
      <h4 class="text-secondary poppins mt-5"><strong>Data Dokter</strong></h4>
    </div>
    <div class="table-responsive mt-2">
      <table id="basic-datatables" class="display poppins table table-striped table-hover table-borderless ">
        <thead variant="primary">
          <tr>
            <th>No</th>
            <th>NIP</th>
            <th>Nama</th>
            <th>Jenis Kelamin</th>
            <th>No Telf</th>
            <th>Spesialis</th>
            <th>Jadwal Praktek</th>
            <th>Nomor STR</th>
            <th>Edit Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>19301103 195903 1 017</td>
            <td>Dr. Meutia Ayudila</td>
            <td>P</td>
            <td>081234346575</td>
            <td>Umum</td>
            <td>Senin - Minggu, 08.00-20.00 WIB</td>
            <td>1821303554327688</td>
            <td>Edit</td>            
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>19301103 195903 1 017</td>
            <td>Dr. Meutia Ayudila</td>
            <td>P</td>
            <td>081234346575</td>
            <td>Umum</td>
            <td>Senin - Minggu, 08.00-20.00 WIB</td>
            <td>1821303554327688</td>
            <td>Edit</td>            
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>19301103 195903 1 017</td>
            <td>Dr. Meutia Ayudila</td>
            <td>P</td>
            <td>081234346575</td>
            <td>Umum</td>
            <td>Senin - Minggu, 08.00-20.00 WIB</td>
            <td>1821303554327688</td>
            <td>Edit</td>            
          </tr>
        </tbody>
      </table>
    </div>
    </b-container>
</body>
</template>
<script>
export default {
  name: 'DataDokterPage',
  methods:{
    logout()
    {
      localStorage.clear();
      this.$router.push({name:"LoginPage"})
    }
  },
  mounted()
  {
    let user= localStorage.getItem('admin-info');
      if(!user){
        this.$router.push({name:"LoginPage"})
      }
  }
  
}
</script>
<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Poppins&display=swap');
.poppins{
    font-family: 'Poppins', sans-serif;
}


</style>