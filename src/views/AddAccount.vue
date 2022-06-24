<template>
  <div>
    <Navbar />
    <b-container class="py-5" style="max-width: 30rem">
      <b-form @submit.prevent>
        <b-form-group
          id="input-group-1"
          label="Nickname"
          label-size="lg"
          label-for="input-1"
          class="mb-3"
        >
          <b-form-input
            id="input-1"
            v-model="form.nickname"
            type="text"
            placeholder="Masukkan nickname yang akan digunakan di akun ini"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Email"
          label-size="lg"
          label-for="input-2"
          class="mb-3"
        >
          <b-form-input
            id="input-2"
            v-model="form.email"
            placeholder="Masukkan email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Password"
          label-size="lg"
          label-for="input-2"
          class="mb-3"
        >
          <b-form-input
            id="input-2"
            v-model="form.name"
            placeholder="Masukkan password"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Jenis Pekerjaan"
          label-size="lg"
        >
          <b-form-radio-group
            v-model="selected"
            :options="options"
            class="mb-3 d-flex"
            value-field="item"
            text-field="name"
          ></b-form-radio-group>
        </b-form-group>

        <b-button
          type="submit"
          variant="primary"
          class="w-100"
          size="lg"
          v-b-modal.modal-1
          >Add Account</b-button
        >
      </b-form>
    </b-container>

    <b-modal id="modal-1" class="text-center mx-auto" centered hide-header hide-footer>
      <img src="../assets/succes.png" class="d-block mx-auto py-5" />
      <div>
        <p class="text-center">Tambah Akun Berhasil</p>
        <p class="text-center">
          Akun dengan nickname {{ form.nickname }} berhasil dibuat.
        </p>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      form: {
        email: "",
        nickname: "",
        password: "",
        checked: [],
      },
      options: [
        { item: "A", name: "Dokter" },
        { item: "B", name: "Perawat" },
      ],
    };
  },
};
</script>

<style>
</style>