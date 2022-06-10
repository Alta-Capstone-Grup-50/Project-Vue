<template>
<body>
    <b-navbar toggleable="lg" type="dark" variant="info" sticky fixed="top">
      <b-container>
        <b-navbar-brand class="ml-4" href="#">Kelompok 50</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      </b-container>
    </b-navbar>
    <b-container>
        <b-row>
            <b-col cols="12" md="6">
                <b-container>
                <div class="p-5">
                    <h2 class="mb-n5 text-secondary" ><strong>Welcome Back</strong></h2>
                    <h6><strong class="mt-n4 text-secondary">Weclome Back! Please enter your details.</strong></h6>
                        <b-form class="mt-5" @submit.prevent="submit">
                            <strong><b-form-group label="Username" class="mt-2">
                                <b-form-input
                                id="input-1"
                                v-model="email"
                                name="username"
                                class="forminput mt-3"
                                required></b-form-input>
                            </b-form-group></strong>

                            <strong><b-form-group label="Password" class="mt-2">
                                <b-form-input
                                id="input-2"
                                v-model="password"
                                type="password"
                                name="password"
                                class="forminput mt-3"
                                required
                                ></b-form-input>
                            </b-form-group></strong>
                            <b-button block class="shadow btnlogin mt-3 w-100 text-white" size="lg" type="submit" variant="info"><strong>Login</strong></b-button>
                             <div class="d-flex justify-content-between mb-3">
                                    <div class="p-2"><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"> <strong class="text-secondary">Remember Me</strong></div>
                                    <div class="p-2"> <a href="" class="ml-5"><strong class="text-secondary  text-right" >Forgot Password ?</strong></a></div>
                                </div>
                                <div v-if="showError" id="error">
                                  <b-alert variant="danger" show>
                                    Username or Password is incorrect
                                  </b-alert>
                                </div>
                        </b-form>
                        
                </div>
                </b-container>
            </b-col>
            <b-col cols="12" md="6">
                <div class="right-column text-center d-flex justify-content-center pe-0">
                <b-carousel
                    id="carousel-no-animation img-fluid"
                    no-animation
                    indicators
                    class="h-auto mw-100" 
                >
                    <b-carousel-slide
                    img-src="https://i.postimg.cc/sXHMtKP9/Online-Doctor-rafiki.png"
                    ></b-carousel-slide>
                    <b-carousel-slide
                    img-src="https://i.postimg.cc/zXbh1mcL/Online-Doctor-pana.png"
                    ></b-carousel-slide>
                    <b-carousel-slide
                    img-src="https://i.postimg.cc/xjFm7jtD/Hospital-room-amico.png"
                    ></b-carousel-slide>
                </b-carousel>
            </div>
            </b-col>
        </b-row>
    </b-container>
</body>
</template>
<script>
import axios from 'axios'
export default {
  name: "LoginPage",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      showError: false
    };
  },
  methods: {
   async submit(){
      let result = await axios.get(`http://localhost:3000/users?email=${this.email}&password=${this.password}`)
      console.warn(result)
      if(result.status==200 && result.data.length>0 && result.data[0].tingkat==1)
     {
       
       localStorage.setItem("admin-info",JSON.stringify(result.data[0]))
       this.$router.push({name:"DataDokter"})
       this.showError = false
     } else if (result.status==200 && result.data.length>0 && result.data[0].tingkat==0) {
       localStorage.setItem("user-info",JSON.stringify(result.data[0]))
       this.$router.push({name:"HomeDokter"})
       this.showError = false

     } else (result.status==200 && result.data.length==0) 
     {
         this.showError = true
      }
    }
  },
  mounted()
    {
      let user= localStorage.getItem('user-info');
      if(user){
        this.$router.push({name:"DataDokter"})
        
      } 
    }
};
</script>
<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Poppins&display=swap');
b-row{
    font-family: 'Poppins', sans-serif;
}
.forminput{
    max-width: 605px;
}
.btnlogin{
    max-width: 605px;
}


</style>