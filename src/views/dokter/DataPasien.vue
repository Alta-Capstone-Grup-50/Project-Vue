<template>
  <div>
  <navbar/>
  <b-container class="mt-5">
  <h3 class="margintop"><strong>Data Pasien</strong></h3>
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
      </div>
        
    <!-- Main table element -->
    <b-table
      :items="patients"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      striped hover
      borderless
      class="mt-3 shadow text-center rounded"
      thead-class="bg-light text-black"
      responsive
      :filter-included-fields="filterOn"
      show-empty
      @filtered="onFiltered"
    >
      <template v-slot:cell(index)="row">
        {{ row.index + 1 }}
      </template>

      <template #cell(nik)="row">
        {{ row.item }}
      </template>

      <template #cell(actions)="row">
        <b-link class="text-decoration-none text-muted"
        v-b-modal.detail-modal-prevent-closing 
        size="sm" 
        @click="getIndex(row.item)">
          Detail
        </b-link>
      </template>

    </b-table>

    <b-modal
    id="detail-modal-prevent-closing"
    ref="modal"
    title="Detail Data Pasien Rawat Jalan"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOkEditPatient"
    size="xl"
    >

    <!-- Detail View Mode -->
      <form v-if="editMode === false" ref="form" @submit.stop.prevent="handleSubmitAddPatient()">
      <!-- Input NIK -->
      <b-form-group
      label="NIK"
      label-for="nik-input"
      invalid-feedback="NIK is required"
      :state="nikState"
      >
      <b-form-input
          id="nik-input"
          v-model="detailPatient.nik"
          :state="nikState"
          required
          disabled
      ></b-form-input>
      </b-form-group>

        <!-- Input nama -->
        <b-form-group
        label="Nama"
        label-for="nama-input"
        invalid-feedback="Nama is required"
        :state="namaState"
        >
        <b-form-input
            id="nama-input"
            v-model="detailPatient.nama"
            :state="namaState"
            required
            disabled
        ></b-form-input>
        </b-form-group>

        <!-- Input Alamat -->
        <b-form-group
        label="Alamat"
        label-for="alamat-input"
        invalid-feedback="Alamat is required"
        :state="alamatState"
        >
        <b-form-input
            id="alamat-input"
            v-model="detailPatient.alamat"
            :state="alamatState"
            required
            disabled
        ></b-form-input>
        </b-form-group>

        <!-- Input Radio jenis_kelamin -->
        <b-form-group
        label="Jenis Kelamin"
        label-for="jenis_kelamin-input"
        invalid-feedback="Jenis Kelamin is required"
        :state="jenis_kelaminState"
        >
        <b-form-radio-group
            id="btn-radios-2"
            v-model="detailPatient.jenis_kelamin"
            :options="options"
            button-variant="outline-primary"
            size="md"
            nama="radio-btn-outline"
            buttons
            required
            disabled
        ></b-form-radio-group>
        </b-form-group>

        <!-- Input no_hp -->
        <b-form-group
        label="Nomor Telepon"
        label-for="no_hp-input"
        invalid-feedback="no_hp is required"
        :state="no_hpState"
        >
        <b-form-input
            id="no_hp-input"
            v-model="detailPatient.no_hp"
            :state="no_hpState"
            required
            disabled
        ></b-form-input>
        </b-form-group>

        <!-- Input Tempat Lahir -->
        <b-form-group
        label="Tempat Lahir"
        label-for="tempat_lahir-input"
        invalid-feedback="Tempat Lahir is required"
        :state="tempat_lahirState"
        >
        <b-form-input
            id="tempat_lahir-input"
            v-model="detailPatient.tempat_lahir"
            :state="tempat_lahirState"
            required
            disabled
        ></b-form-input>
        </b-form-group>

        <!-- Input Tanggal Lahir -->
        <b-form-group
        label="Tanggal Lahir"
        label-for="tanggal_lahir-input"
        invalid-feedback="Tanggal Lahir is required"
        :state="tanggal_lahirState"
        >
        <b-form-datepicker
          id="tanggal_lahir-datepicker"
          v-model="detailPatient.tanggal_lahir"
          :state="tanggal_lahirState"
          required
          disabled
        ></b-form-datepicker>
        </b-form-group>

        <!-- Input Poli -->
        <b-form-group
        label="Poli"
        label-for="poli-input"
        invalid-feedback="Poli is required"
        :state="poliState"
        >
        <b-form-input
            id="tempat_lahir-input"
            v-model="detailPatient.poli"
            :state="poliState"
            required
            disabled
        ></b-form-input>
        </b-form-group>

        <!-- Input Radio Jenis Penanganan -->
        <b-form-group
        label="Jenis Penanganan"
        label-for="jenis_penanganan-input"
        invalid-feedback="Jenis Penanganan is required"
        :state="jenis_penangananState"
        >
        <b-form-radio-group
            id="btn-radios-2"
            v-model="detailPatient.jenis_penanganan"
            :options="optionsjenis_penanganan"
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
      <form v-else ref="form" @submit.stop.prevent="handleSubmitAddPatient()">
      <!-- Input NIK -->
      <b-form-group
      label="NIK"
      label-for="nik-input"
      invalid-feedback="NIK is required"
      :state="nikState"
      >
      <b-form-input
          id="nik-input"
          v-model="detailPatient.nik"
          :state="nikState"
          required
          disabled
      ></b-form-input>
      </b-form-group>

        <!-- Input nama -->
        <b-form-group
        label="Nama"
        label-for="nama-input"
        invalid-feedback="Nama is required"
        :state="namaState"
        >
        <b-form-input
            id="nama-input"
            v-model="detailPatient.nama"
            :state="namaState"
            required
            disabled
        ></b-form-input>
        </b-form-group>

        <!-- Input alamat -->
        <b-form-group
        label="Alamat"
        label-for="alamat-input"
        invalid-feedback="Alamat is required"
        :state="alamatState"
        >
        <b-form-input
            id="alamat-input"
            v-model="detailPatient.alamat"
            :state="alamatState"
            required
            disabled
        ></b-form-input>
        </b-form-group>

        <!-- Input Radio jenis_kelamin -->
        <b-form-group
        label="Jenis Kelamin"
        label-for="jenis_kelamin-input"
        invalid-feedback="Jenis Kelamin is required"
        :state="jenis_kelaminState"
        >
        <b-form-radio-group
            id="btn-radios-2"
            v-model="detailPatient.jenis_kelamin"
            :options="options"
            button-variant="outline-primary"
            size="md"
            nama="radio-btn-outline"
            buttons
            required
            disabled
        ></b-form-radio-group>
        </b-form-group>

        <!-- Input no_hp -->
        <b-form-group
        label="Nomor Telepon"
        label-for="no_hp-input"
        invalid-feedback="no_hp is required"
        :state="no_hpState"
        >
        <b-form-input
            id="no_hp-input"
            v-model="detailPatient.no_hp"
            :state="no_hpState"
            required
            disabled
        ></b-form-input>
        </b-form-group>

        <!-- Input Tempat Lahir -->
        <b-form-group
        label="Tempat Lahir"
        label-for="tempat_lahir-input"
        invalid-feedback="Tempat Lahir is required"
        :state="tempat_lahirState"
        >
        <b-form-input
            id="tempat_lahir-input"
            v-model="detailPatient.tempat_lahir"
            :state="tempat_lahirState"
            required
            disabled
        ></b-form-input>
        </b-form-group>

        <!-- Input Tanggal Lahir -->
        <b-form-group
        label="Tanggal Lahir"
        label-for="tanggal_lahir-input"
        invalid-feedback="Tanggal Lahir is required"
        :state="tanggal_lahirState"
        >
        <b-form-datepicker
          id="tanggal_lahir-datepicker"
          v-model="detailPatient.tanggal_lahir"
          :state="tanggal_lahirState"
          required
          disabled
        ></b-form-datepicker>
        </b-form-group>

        <!-- Input Poli -->
        <b-form-group
        label="Poli"
        label-for="poli-input"
        invalid-feedback="Poli is required"
        :state="poliState"
        >
        <b-form-input
            id="tempat_lahir-input"
            v-model="detailPatient.poli"
            :state="poliState"
            required
            disabled
        ></b-form-input>
        </b-form-group>

        <!-- Input Radio Jenis Penanganan -->
        <b-form-group
        label="Jenis Penanganan"
        label-for="jenis_penanganan-input"
        invalid-feedback="Jenis Penanganan is required"
        :state="jenis_penangananState"
        >
        <b-form-radio-group
            id="btn-radios-2"
            v-model="detailPatient.jenis_penanganan"
            :options="optionsjenis_penanganan"
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
        variant="outline-secondary text-black" 
        @click="changeEditMode()">
            Edit
        </b-button>

        <b-button 
        v-else
        size="lg" 
        variant="warning" 
        @click="cancelEditMode()">
            Cancel Edit
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
import navbar from '@/components/NavbarDokter.vue'
  export default {
    nama: 'PasienPage',
    components : {
      navbar
    },
    data() {
      return {
        patients: [],
        detailPatient: [],
        editMode: false,
        indexNumber: '',
        indexSelected: '',
        form : {
          nik: '',
          nama: '',
          alamat: '',
          jenis_kelamin:'',
          no_hp: '',
          tempat_lahir: '',
          tanggal_lahir: '',
          poli: '',
          jenis_penanganan: ''
        },
        editForm: {
            nik: '',
            nama: '',
            alamat: '',
            jenis_kelamin:'',
            no_hp: '',
            tempat_lahir: '',
            tanggal_lahir: '',
        },
        nikState: null,
        namaState: null,
        alamatState: null,
        jenis_kelaminState: null,
        no_hpState: null,
        tempat_lahirState: null,
        tanggal_lahirState: null,
        poliState: null,
        jenis_penangananState: null,
        selected: '',
        options: [
            { text: 'Laki-laki', value: 'L' },
            { text: 'Perempuan', value: 'P' },
        ],
        optionsjenis_penanganan: [
            { text: 'Rawat Jalan', value: 'Rawat Jalan' },
            { text: 'Rawat Inap', value: 'Rawat Inap' },
        ],
        fields: [
          { key: 'index', label: 'No'},
          { key: 'nik', label: 'NIK'},
          { key: 'nama', label: 'Nama'},
          { key: 'jenis_kelamin', label: 'Jenis Kelamin'},
          { key: 'poli', label: 'Poli'},
          { key: 'jenis_penanganan', label: 'Jenis Penanganan'},
          { key: 'actions', label: 'Action'},
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
        console.log(this.detailPatient.indexOf(item))
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
      onFiltered(filteredPatients) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredPatients.length
        this.currentPage = 1
      },

        async load() {
            const response = await axios.get(`https://api-capstone-heroku.herokuapp.com/dokter/rawat_jalan/`)
            this.patients = response.data.data
            
            // Set the initial number of patients
            this.totalRows = this.patients.length
        },

        getIndex(item) {
            this.indexNumber = this.patients.indexOf(item)
            this.detailPatient = this.patients[this.indexNumber]
            this.indexSelected = this.detailPatient.id
        },

        async addPatient() {
          try {
              await axios.post(`https://api-capstone-heroku.herokuapp.com/admin/data_pasien_tambah`, this.form)
              this.load()
          } catch (error) {
              console.log(error)
          }
        },
        async deletePatient(indexId) {
            if (confirm('Apakah Anda Akan Menghapus Data Ini?') == true) {
                try {
                    await axios.delete(`https://api-capstone-heroku.herokuapp.com/admin/data_pasien_hapus/` + indexId)
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

        async updatePatient() {
            try {
                await axios.put(`https://api-capstone-heroku.herokuapp.com/admin/data_pasien_edit/` + this.indexSelected, {
                    nik: this.detailPatient.nik,
                    nama: this.detailPatient.nama,
                    alamat: this.detailPatient.alamat,
                    jenis_kelamin: this.detailPatient.jenis_kelamin,
                    no_hp: this.detailPatient.no_hp,
                    tempat_lahir: this.detailPatient.tempat_lahir,
                    tanggal_lahir: this.detailPatient.tanggal_lahir,
                    poli: this.detailPatient.poli,
                    jenis_penanganan: this.detailPatient.jenis_penanganan
                })
                this.load()
            } catch (error) {
                console.log(error)
            }
        },

        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.nikState = valid
            this.namaState = valid
            this.alamatState = valid
            this.jenis_kelaminState = valid
            this.no_hpState = valid
            this.tempat_lahirState = valid
            this.tanggal_lahirState = valid
            return valid
        },

        resetModal() {
          this.form.nik = ''
          this.form.nama = ''
          this.form.alamat = ''
          this.form.jenis_kelamin = ''
          this.form.no_hp = ''
          this.form.tempat_lahir = ''
          this.form.tanggal_lahir = ''

          this.nikState = null
          this.namaState = null
          this.alamatState = null
          this.jenis_kelaminState = null
          this.no_hpState = null
          this.tempat_lahirState = null
          this.tanggal_lahirState = null

          this.editMode = false
        },

        selectionHandeOk(){
            if (this.editMode === false) {
                this.handleOkAddPatient()
            } else {
                this.handleOkEditPatient()
            }
        },

        handleOkAddPatient(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()
            // Trigger submit handler
            this.handleSubmitAddPatient()
        },

        handleOkEditPatient(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()
            // Trigger submit handler
            this.handleSubmitEditPatient()
        },

        handleSubmitAddPatient() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return
            }
            this.addPatient()
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('add-modal-prevent-closing')
            })
        },

        handleSubmitEditPatient() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return
            }
            this.updatePatient()
            this.indexNumber = ''
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('detail-modal-prevent-closing')
            })
            this.editMode = false
        },
        changeEditMode() {
          this.editMode = true
        },

        cancelEditMode() {
          this.editMode = false
        }
    },
    mounted() {
      this.load()
      {
        let user= localStorage.getItem('userLogin');
          if(!user){
            this.$router.push({nama:"LoginPage"})
          }
      }
    },
  }
</script>
  
<style scoped>
.margintop{
  margin-top: 150px;
}
</style>