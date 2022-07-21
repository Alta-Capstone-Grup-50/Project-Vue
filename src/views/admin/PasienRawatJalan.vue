<template>
  <div>
    <navbar />
    <b-container class="mt-5 margintop">
      <div>
        <h3 class="margintop"><strong>Nomor Antri</strong></h3>
        <b-card-group>
    <b-card title="Poli Umum" class="text-center">
      <b-card-text>
        <h1 class="text-center">{{ noUmum }}</h1>
      </b-card-text>
    </b-card>

    <b-card title="Poli Gigi" class="text-center">
      <b-card-text>
        <h1 class="text-center">{{ noGigi }}</h1>
      </b-card-text>
    </b-card>

    <b-card title="Poli Kulit" class="text-center">
      <b-card-text>
        <h1 class="text-center">{{ noKulit }}</h1>
      </b-card-text>
    </b-card>

    <b-card title="Poli THT" class="text-center">
      <b-card-text>
        <h1 class="text-center">{{ noTht }}</h1>
      </b-card-text>
    </b-card>
  </b-card-group>
      </div>

      <div class="mt-5 mb-5">
        <h3><strong>Data Pasien Rawat Jalan</strong></h3>
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

        <template v-slot:cell(no)="row">
          {{ row.index + 1 }}
        </template>

        <template #cell(proses)="row">
          <div v-if="row.item.proses === false">
            <b-iconstack font-scale="2">
              <b-icon stacked icon="square"></b-icon>
            </b-iconstack>
          </div>
          <div v-else>
            <b-iconstack font-scale="2">
              <b-icon stacked icon="square"></b-icon>
              <b-icon stacked icon="check"></b-icon>
            </b-iconstack>
          </div>
        </template>

        <template #cell(ketRawat)="row">
          <b-button 
          v-b-modal.keteranganPasien-modal-prevent-closing 
          size="sm" 
          @click="getIndex(row.item)" 
          class="mr-1"
          variant="success">
            Ket
          </b-button>
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

        <!-- <template #cell(proses)="row">
          {{ row.item }}
        </template> -->

      </b-table>

      <!-- Modal Keterangan Pasien -->
      <b-modal
      id="keteranganPasien-modal-prevent-closing"
      ref="modal"
      title="Keterangan Dokter"
      @show="resetModal"
      @hidden="resetModal"
      @ok="resetModal"
      size="xl"
      >
      <!-- Detail View Mode -->
        <b-form-group>
        <b-form-textarea
          rows="8"
          id="ketRawat-input"
          v-model="detailPatient.ketRawat"
          :state="ketRawatState"
          disabled
        ></b-form-textarea>

        </b-form-group>
      </b-modal>

      <!-- Modal Detail Pasien -->
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

          <!-- Input Nama -->
          <b-form-group
          label="Nama"
          label-for="nama-input"
          invalid-feedback="Nama is required"
          :state="namaState"
          >
          <b-form-input
              id="name-input"
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

          <!-- Input Radio Gender -->
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
              name="radio-btn-outline"
              buttons
              required
              disabled
          ></b-form-radio-group>
          </b-form-group>

          <!-- Input Nomer Telepon -->
          <b-form-group
          label="Nomor Telepon"
          label-for="nomor_telepon-input"
          invalid-feedback="Nomor Telepon is required"
          :state="nomor_teleponState"
          >
          <b-form-input
              id="nomor_telepon-input"
              v-model="detailPatient.no_hp"
              :state="nomor_teleponState"
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

          <!-- Input Jadwal Rawat Jalan -->
          <b-form-group
          label="Jadwal Rawat Jalan"
          label-for="jadwal_rawat_jalan-input"
          invalid-feedback="Jadwal Rawat Jalan is required"
          :state="jadwal_rawat_jalanState"
          >
          <b-form-datepicker
            id="jadwal_rawat_jalan-datepicker"
            v-model="detailPatient.jadwal_rawat_jalan"
            :state="jadwal_rawat_jalanState"
            required
            disabled
          ></b-form-datepicker>
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
        ></b-form-input>
        </b-form-group>

          <!-- Input Nama -->
          <b-form-group
          label="Nama"
          label-for="nama-input"
          invalid-feedback="Nama is required"
          :state="namaState"
          >
          <b-form-input
              id="name-input"
              v-model="detailPatient.nama"
              :state="namaState"
              required
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
          ></b-form-input>
          </b-form-group>

          <!-- Input Radio Gender -->
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
              name="radio-btn-outline"
              buttons
              required
          ></b-form-radio-group>
          </b-form-group>

          <!-- Input Nomer Telepon -->
          <b-form-group
          label="Nomor Telepon"
          label-for="nomor_telepon-input"
          invalid-feedback="Nomor Telepon is required"
          :state="nomor_teleponState"
          >
          <b-form-input
              id="nomor_telepon-input"
              v-model="detailPatient.no_hp"
              :state="nomor_teleponState"
              required
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
          ></b-form-datepicker>
          </b-form-group>

          <!-- Input Jadwal Rawat Jalan -->
          <b-form-group
          label="Jadwal Rawat Jalan"
          label-for="jadwal_rawat_jalan-input"
          invalid-feedback="Jadwal Rawat Jalan is required"
          :state="jadwal_rawat_jalanState"
          >
          <b-form-datepicker
            id="jadwal_rawat_jalan-datepicker"
            v-model="detailPatient.jadwal_rawat_jalan"
            :state="jadwal_rawat_jalanState"
            required
          ></b-form-datepicker>
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
          <b-button v-else size="lg" variant="danger" @click="deletePatient(indexSelected)">
              Delete
          </b-button>
          <b-button size="lg" variant="success" @click="ok()">
              Simpan
          </b-button>
        </template>
        </b-modal>

        <!-- Pagination -->
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
      </div>
        
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
    created() {
      this.antriUmum = JSON.parse(localStorage.getItem('noUmum')),
      this.antriGigi = JSON.parse(localStorage.getItem('noGigi')),
      this.antriKulit = JSON.parse(localStorage.getItem('noKulit')),
      this.antriTht = JSON.parse(localStorage.getItem('noTht'))
    },
    computed: {
      noUmum() {
        return this.$store.state.noUmum
      },
      noGigi() {
        return this.$store.state.noGigi
      },
      noKulit() {
        return this.$store.state.noKulit
      },
      noTht() {
        return this.$store.state.noTht
      }
    },
    name:'VuetifyPage',
    data() {
      return {
        patients: [],
        antriUmum: [],
        antriGigi: [],
        antriKulit: [],
        antriTht: [],
        detailPatient: [],
        editMode: false,
        indexNumber: '',
        indexSelected: '',
        form : {
          nik: '',
          name: '',
          address: '',
          gender:'',
          phone: '',
          tempat_lahir: '',
          tanggal_lahir: '',
          disease: '',
          handling: '',
          jadwal_rawat_jalan: '',
          noAntri: '',
          ketRawat: ''
        },

        nikState: null,
        namaState: null,
        alamatState: null,
        jenis_kelaminState: null,
        nomor_teleponState: null,
        tempat_lahirState: null,
        tanggal_lahirState: null,
        diseaseState: null,
        handlingState: null,
        jadwal_rawat_jalanState: null,
        noAntriState: null,
        ketRawatState: null,

        selected: '',
        options: [
            { text: 'Laki-laki', value: 'L' },
            { text: 'Perempuan', value: 'P' },
        ],

        items: [],
        fields: [
          { key: 'no', label: 'No'},
          { key: 'nik', label: 'NIK'},
          { key: 'nama', label: 'Nama'},
          { key: 'jenis_kelamin', label: 'Jenis Kelamin'},
          { key: 'jadwal_rawat_jalan', label: 'Jadwal Rawat Jalan'},
          { key: 'poli', label: 'Poli'},
          { key: 'nomer_antrian', label: 'Nomer Antrian'},
          { key: 'ketRawat', label: 'Ket. Rawat Jalan'},
          { key: 'actions', label: 'Actions' },
          { key: 'proses', label: 'Status' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        },
        context: null,
      }
    },

    methods: {
      testGigi(payload) {
        this.$store.dispatch('changeNoGigi', payload)
      },

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
            const response = await axios.get(`https://api-capstone-heroku.herokuapp.com/admin/rawat_jalan_lihat`)
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
                    await axios.delete(`http://localhost:3000/patients/` + indexId)
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
                await axios.put(`https://api-capstone-heroku.herokuapp.com/admin/rawat_jalan_edit/` + this.indexSelected, {
                    nik: this.detailPatient.nik,
                    name: this.detailPatient.name,
                    address: this.detailPatient.address,
                    gender: this.detailPatient.gender,
                    phone: this.detailPatient.phone,
                    tempat_lahir: this.detailPatient.tempat_lahir,
                    tanggal_lahir: this.detailPatient.tanggal_lahir,
                    disease: this.detailPatient.disease,
                    handling: this.detailPatient.handling,
                    jadwal_rawat_jalan: this.detailPatient.jadwal_rawat_jalan,
                    noAntri: this.detailPatient.noAntri,
                    ketRawat: this.detailPatient.ketRawat
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
            this.nomor_teleponState = valid
            this.tempat_lahirState = valid
            this.tanggal_lahirState = valid
            return valid
        },

        resetModal() {
          this.form.nik = ''
          this.form.name = ''
          this.form.address = ''
          this.form.gender = ''
          this.form.phone = ''
          this.form.tempat_lahir = ''
          this.form.tanggal_lahir = ''

          this.nikState = null
          this.namaState = null
          this.alamatState = null
          this.jenis_kelaminState = null
          this.nomor_teleponState = null
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

        onContext(ctx) {
          this.context = ctx
        }
    },
    mounted() {
      this.load()
    },
  }
</script>
  
<style scoped>
.margintop{
  margin-top: 150px;
}
</style>