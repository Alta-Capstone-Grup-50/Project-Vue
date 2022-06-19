<template>
  <div>
    <b-navbar toggleable="md" type="light" variant="light">
      <b-container>
        <b-navbar-brand href="#">
          <img src="@/assets/logo klinik 1.png" />
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ms-auto">
            <b-nav-item href="#">Home</b-nav-item>
            <b-nav-item href="#">Data Pasien</b-nav-item>
            <b-nav-item href="#">Data Rawat Jalan</b-nav-item>
            <b-nav-item href="#">Data Tenaga Kesehatan</b-nav-item>
            <b-nav-item href="#">Manage Account</b-nav-item>
            <b-nav-item-dropdown
              class="border dropdown-rounded bg-info"
              right
            >
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style="height: 25px; width: 25px"
                  class="text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clip-rule="evenodd"
                  />
                </svg>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavbarHome",
};
</script>

<style>
.dropdown-rounded {
  border-radius: 10px !important;
}
</style>