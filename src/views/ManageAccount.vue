<template>
  <div>
    <Navbar />
    <b-container class="py-5">
      <p class="fs-4">Akun Dokter & Perawat</p>
      <div class="d-flex justify-content-between">
        <b-form-input
          v-model="text"
          placeholder="Cari di sini"
          style="max-width: 30rem"
        ></b-form-input>
        <button class="btn btn-dark">Tambah Akun</button>
      </div>

      <div class="pt-3">
        <b-table striped hover :fields="fields" :items="items" thead-class="bg-info" class="text-center">
          <template #cell(ket)="data">
            <button @click="console.log(data.item.age)" class="btn btn-sm btn-success">Ket</button>
          </template>
        </b-table>
      </div>
    </b-container>
  </div>
</template>
s
<script>
import Navbar from "@/components/navbar.vue";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      fields: [
        { key: 'sip', label: 'SIP'},
        { key: 'nama', label: 'Nama'},
        { key: 'jenis_kelamin', label: 'Jenis Kelamin'},
        { key: 'email', label: 'Email'},
        { key: 'password', label: 'Password'},
        { key: 'ket', label: "Ket. Rawat Jalan" }],
      items: [
        { sip: 40, nama: "Dickerson", email: "Macdonald", jenis_kelamin: 'P', password: 'abc'  },
        { sip: 21, nama: "Larsen", email: "Shaw", jenis_kelamin: 'P', password: 'abc'  },
        { sip: 89, nama: "Geneva", email: "Wilson", jenis_kelamin: 'P', password: 'abc'  },
        { sip: 38, nama: "Jami", email: "Carney", jenis_kelamin: 'P', password: 'abc'  },
      ],
    };
  },
};
</script>

<style>
.form-radius {
  border-radius: 20px !important;
}
</style>