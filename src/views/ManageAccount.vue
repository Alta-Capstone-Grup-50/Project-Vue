<template>
  <div>
    <navbar />
    <b-container class="mt-5">
      <h3 class="margintop"><strong>Detail Akun Tenaga Kesehatan</strong></h3>
      <div class="d-flex">
          <b-form-group
            label-for="filter-input"
            label-align-sm="right"
            label-size="md"
            class="w-25 shadow rounded"
          >
            <b-input-group>
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Cari Disini"
              ></b-form-input>
            </b-input-group>
          </b-form-group>

        <div class="ms-auto">
        <b-button
          v-b-modal.add-modal-prevent-closing
          variant="success"
          class="shadow"
          ><b-icon icon="plus-circle-fill" aria-hidden="true"></b-icon> 
          Tambah Akun
          </b-button>
        </div>
      </div>
        <b-col cols="4" class="col2">

          <!-- Modal Tambah Akun -->
          <b-modal
            id="add-modal-prevent-closing"
            ref="modal"
            title="Tambah Akun"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOkAddakun"
            size="md"
            >

            <!-- Detail View Mode -->
            <form ref="form" @submit.stop.prevent="handleSubmitAddakun()">

              <!-- Input nama -->
              <b-form-group
              label="Nama"
              label-for="nama-input"
              invalid-feedback="Nama is required"
              :state="namaState"
              >
              <b-form-input
                  id="nama-input"
                  v-model="form.nama"
                  :state="namaState"
                  required
              ></b-form-input>
              </b-form-group>

                <!-- Input Email -->
                <b-form-group
                label="Email"
                label-for="email-input"
                invalid-feedback="Email is required"
                :state="emailState"
                >
                <b-form-input
                    id="email-input"
                    v-model="form.email"
                    :state="emailState"
                    required
                ></b-form-input>
                </b-form-group>

                <!-- Input Password -->
                <b-form-group
                label="Password"
                label-for="password-input"
                invalid-feedback="Password is required"
                :state="passwordState"
                >
                <b-form-input
                    id="password-input"
                    v-model="form.password"
                    :state="passwordState"
                    required
                ></b-form-input>
                </b-form-group>

                <!-- Input Level -->
                <b-form-group
                label="Pekerejaan"
                label-for="level-input"
                invalid-feedback="Pekerjaan is required"
                :state="levelState"
                >
                <b-form-radio-group
                    id="btn-radios-2"
                    v-model="form.level"
                    :options="optionsLevel"
                    button-variant="outline-primary"
                    size="md"
                    nama="radio-btn-outline"
                    buttons
                    required
                ></b-form-radio-group>
                </b-form-group>
          </form>
          </b-modal>
      </b-col>


    <!-- Main table element -->
    <b-table
      :items="akuns"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      striped hover
      borderless
      class="mt-3 shadow text-center rounded"
      thead-class="bg-secondary text-white"
      responsive
      :filter-included-fields="filterOn"
      show-empty
      @filtered="onFiltered"
    >

      <template v-slot:cell(index)="row">
        {{ row.index + 1 }}
      </template>

      <template #cell(actions)="row">
        <b-button 
        v-b-modal.detail-modal-prevent-closing 
        size="sm" 
        @click="getIndex(row.item)" 
        class="mr-1">
          Detail
        </b-button>
      </template>

    </b-table>

      <b-modal
      id="detail-modal-prevent-closing"
      ref="modal"
      title="Detail Data Pasien Rawat Jalan"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOkEditakun"
      size="xl"
      >

      <!-- Detail View Mode -->
        <form v-if="editMode === false" ref="form" @submit.stop.prevent="handleSubmitAddakun()">
        <!-- Input nama -->
              <b-form-group
              label="Nama"
              label-for="nama-input"
              invalid-feedback="Nama is required"
              :state="namaState"
              >
              <b-form-input
                  id="nama-input"
                  v-model="detailAkun.nama"
                  :state="namaState"
                  required
                  disabled
              ></b-form-input>
              </b-form-group>

                <!-- Input Email -->
                <b-form-group
                label="Email"
                label-for="email-input"
                invalid-feedback="Email is required"
                :state="emailState"
                >
                <b-form-input
                    id="email-input"
                    v-model="detailAkun.email"
                    :state="emailState"
                    required
                    disabled
                ></b-form-input>
                </b-form-group>

                <!-- Input Password -->
                <b-form-group
                label="Password"
                label-for="password-input"
                invalid-feedback="Password is required"
                :state="passwordState"
                >
                <b-form-input
                    id="password-input"
                    v-model="detailAkun.password"
                    :state="passwordState"
                    required
                    disabled
                ></b-form-input>
                </b-form-group>

                <!-- Input Level -->
                <b-form-group
                label="Pekerejaan"
                label-for="level-input"
                invalid-feedback="Pekerjaan is required"
                :state="levelState"
                >
                <b-form-radio-group
                    id="btn-radios-2"
                    v-model="detailAkun.level"
                    :options="optionsLevel"
                    button-variant="outline-primary"
                    size="md"
                    nama="radio-btn-outline"
                    buttons
                    required
                    disabled
                ></b-form-radio-group>
                </b-form-group>
        </form>

      <!-- Detail Edit Mode -->
        <form v-else ref="form" @submit.stop.prevent="handleSubmitAddakun()">
        <!-- Input nama -->
              <b-form-group
              label="Nama"
              label-for="nama-input"
              invalid-feedback="nama is required"
              :state="namaState"
              >
              <b-form-input
                  id="nama-input"
                  v-model="detailAkun.nama"
                  :state="namaState"
                  required
              ></b-form-input>
              </b-form-group>

                <!-- Input Email -->
                <b-form-group
                label="Email"
                label-for="email-input"
                invalid-feedback="Email is required"
                :state="emailState"
                >
                <b-form-input
                    id="email-input"
                    v-model="detailAkun.email"
                    :state="emailState"
                    required
                ></b-form-input>
                </b-form-group>

                <!-- Input Password -->
                <b-form-group
                label="Password"
                label-for="password-input"
                invalid-feedback="Password is required"
                :state="passwordState"
                >
                <b-form-input
                    id="password-input"
                    v-model="detailAkun.password"
                    :state="passwordState"
                    required
                ></b-form-input>
                </b-form-group>

                <!-- Input Level -->
                <b-form-group
                label="Pekerejaan"
                label-for="level-input"
                invalid-feedback="Pekerjaan is required"
                :state="levelState"
                >
                <b-form-radio-group
                    id="btn-radios-2"
                    v-model="detailAkun.level"
                    :options="optionsLevel"
                    button-variant="outline-primary"
                    size="md"
                    nama="radio-btn-outline"
                    buttons
                    required
                ></b-form-radio-group>
                </b-form-group>
        </form>

      <template #modal-footer="{ ok }">
        <b-button 
        v-if="editMode === false"
        v-b-modal.detail-modal-prevent-closing 
        size="lg" 
        variant="secondary" 
        @click="changeEditMode()">
            Edit
        </b-button>
        <b-button v-else size="lg" variant="danger" @click="deleteakun(indexSelected)">
            Delete
        </b-button>
        <b-button size="lg" variant="success" @click="ok()">
            Simpan
        </b-button>
      </template>
      </b-modal>

      <b-col sm="7" md="6" class="mx-auto">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
      </b-col>


    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import navbar from '@/components/navbar.vue'

  export default {
    components : {
      navbar
    },
    name: 'VuetifyPage',
    data() {
      return {
        akuns: [],
        detailAkun: [],
        editMode: false,
        indexNumber: '',
        indexSelected: '',
        form : {
          sip: '',
          nama: '',
          email: '',
          password: '',
          jenis_kelamin:'',
          level: '',
          spesialis: '',
          jadwal: '',
          str: '',
        },
        sipState: null,
        namaState: null,
        emailState: null,
        passwordState: null,
        jenis_kelaminState: null,
        levelState: null,
        spesialisState: null,
        jadwalState: null,
        strState: null,
        selected: '',
        options: [
            { text: 'Laki-laki', value: 'L' },
            { text: 'Perempuan', value: 'P' },
        ],
        optionsLevel: [
            { text: 'Dokter', value: 'dokter' },
            { text: 'Perawat', value: 'perawat' },
        ],

        items: [],
        fields: [
          { key: 'index', label: 'No'},
          { key: 'sip', label: 'SIP'},
          { key: 'nama', label: 'Nama'},
          { key: 'jenis_kelamin', label: 'Jenis Kelamin'},
          { key: 'email', label: 'Email'},
          { key: 'password', label: 'Password'},
          { key: 'actions', label: 'Actions'},
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
      }
    },

    methods: {
      testIndex(item) {
        console.log(this.detailAkun.indexOf(item))
      },
      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredakuns) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredakuns.length
        this.currentPage = 1
      },

        async load() {
            const response = await axios.get(`https://api-capstone-heroku.herokuapp.com/admin/akun_tampil`)
            this.akuns = response.data.data
            
            // Set the initial number of akuns
            this.totalRows = this.akuns.length
        },

        getIndex(item) {
            this.indexNumber = this.akuns.indexOf(item)
            this.detailAkun = this.akuns[this.indexNumber]
            this.indexSelected = this.detailAkun.id
        },

        async addakun() {
          try {
              await axios.post(`https://api-capstone-heroku.herokuapp.com/admin/akun_tambah`, this.form)
              this.load()
          } catch (error) {
              console.log(error)
              window.alert(error.response.data.message)
          }
        },
        async deleteakun(indexId) {
            if (confirm('Apakah Anda Akan Menghapus Data Ini?') == true) {
                try {
                    await axios.delete(`https://api-capstone-heroku.herokuapp.com/admin/akun_hapus/` + indexId)
                    this.load()
                } catch (error) {
                    console.log(error)
                }
            }
            this.$nextTick(() => {
                this.$bvModal.hide('detail-modal-prevent-closing')
                this.editMode = false
            })
        },

        async updateakun() {
            try {
                await axios.put(`http://localhost:3000/dokter` + this.indexSelected, {
                    nama: this.detailAkun.nama,
                    email: this.detailAkun.email,
                    password: this.detailAkun.password,
                    level: this.detailAkun.level
                })
                this.load()
            } catch (error) {
                console.log(error)
            }
        },

        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.namaState = valid
            this.emailState = valid
            this.passwordState = valid
            return valid
        },

        resetModal() {
          this.form.nama = ''
          this.form.email = ''
          this.form.password = ''

          this.namaState = null
          this.emailState = null
          this.passwordState = null

          this.editMode = false
        },

        selectionHandeOk(){
            if (this.editMode === false) {
                this.handleOkAddakun()
            } else {
                this.handleOkEditakun()
            }
        },

        handleOkAddakun(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()
            // Trigger submit handler
            this.handleSubmitAddakun()
        },

        handleOkEditakun(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()
            // Trigger submit handler
            this.handleSubmitEditakun()
        },

        handleSubmitAddakun() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return
            }
            this.addakun()
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('add-modal-prevent-closing')
            })
        },

        handleSubmitEditakun() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return
            }
            this.updateakun()
            this.indexNumber = ''
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('detail-modal-prevent-closing')
            })
            this.editMode = false
        },
        changeEditMode() {
          this.editMode = true
        }
    },
    mounted() {
      this.load()
      let user= localStorage.getItem('adminLogin');
      if(!user){
        this.$router.push({name:"LoginPage"})
      } 
    },

  }
</script>
  
<style scoped>
.margintop{
  margin-top: 150px;
}
</style>