<template>
<body>
    <b-container>
    <div>
      <h4 class="text-secondary poppins mt-5"><strong>Halaman Dokter</strong></h4>
    </div>
    </b-container>
</body>
</template>
<script>
export default {
  name: 'LoginPage',
  methods:{
    logout()
    {
      localStorage.clear();
      this.$router.push({name:"LoginPage"})
    }
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

@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Poppins&display=swap');
.poppins{
    font-family: 'Poppins', sans-serif;
}


</style>