<template>
  <div>
    <Navbar />
    <b-container class="py-5">
      <p class="text-danger fs-4">Info Terkini</p>

      <div>
        <b-jumbotron
          bg-variant="light"
          class="p-5 overflow-scroll jumbotron-height"
        >
          <div>
            <p class="text-danger fs-4">Lorem Ipsum</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
              sapiente fugiat in, veritatis deleniti facilis error nisi corporis
              debitis? Est ad mollitia inventore dignissimos perspiciatis
              possimus repellendus blanditiis laudantium quidem.
            </p>
          </div>

          <div>
            <p class="text-danger fs-4">Lorem Ipsum</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
              sapiente fugiat in, veritatis deleniti facilis error nisi corporis
              debitis? Est ad mollitia inventore dignissimos perspiciatis
              possimus repellendus blanditiis laudantium quidem.
            </p>
          </div>

          <div>
            <p class="text-danger fs-4">Lorem Ipsum</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
              sapiente fugiat in, veritatis deleniti facilis error nisi corporis
              debitis? Est ad mollitia inventore dignissimos perspiciatis
              possimus repellendus blanditiis laudantium quidem.
            </p>
          </div>
        </b-jumbotron>
      </div>

      <b-row class="py-4">
        <b-col cols="12" md="4">
          <b-card style="max-width: 20rem" class="mb-2 card-rounded" no-body>

              <b-card-img src="https://picsum.photos/600/300/?image=25" class="img-rounded" />

            <b-card-footer class="footer-rounded" footer-bg-variant="white">
              <p>Data Pasien</p>
              <p class="text-secondary fw-light">Dibuka pada 2 juni</p>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "HomePage",
  components: { Navbar },
};
</script>

<style>
.jumbotron-height {
  max-height: 250px;
}

.card-rounded {
  border-radius: 30px !important;
}

.footer-rounded {
  border-bottom-left-radius: 30px !important;
  border-bottom-right-radius: 30px !important;
}

.img-rounded {
  border-top-left-radius: 30px !important;
  border-top-right-radius: 30px !important;
}
</style>