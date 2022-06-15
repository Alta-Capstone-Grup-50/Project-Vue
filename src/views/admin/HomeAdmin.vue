<template>
<body>
    <b-navbar toggleable="lg" type="dark" variant="light" class="shadow" sticky fixed="top">
      <b-container>
        <b-navbar-brand class="ml-4" href="#"><img src="https://i.postimg.cc/CKjq1Vg7/logo-klinik-1.png" alt="Responsive image"></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse">
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-button size="sm" v-on:click="logout" class="my-2 my-sm-0" type="logout">Logout</b-button>
            </b-nav-form>
          </b-navbar-nav>
        </b-navbar-toggle>
      </b-container>
    </b-navbar>
    <b-container>
    <div>
      <h4 class="text-secondary poppins mt-5"><strong>Admin</strong></h4>
    </div>
    </b-container>
</body>
</template>
<script>
export default {
  name: 'AdminPage',
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