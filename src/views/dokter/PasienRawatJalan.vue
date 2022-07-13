<template>
  <div>
    <navbar />
    <b-container class="mt-5">
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
        thead-class="bg-info text-white"
        responsive
        :filter-included-fields="filterOn"
        show-empty
        @filtered="onFiltered"
      >

        <template v-slot:cell(no)="row">
          {{ row.index + 1 }}
        </template>

        <template #cell(jadwal_rawat_jalan)="row">
          <p v-if="row.item.jadwal_rawat_jalan === ''">-</p>
          <p v-else>{{ row.item.jadwal_rawat_jalan }}</p>
        </template>

        <template #cell(jenis_penanganan)="row">
          <p v-if="row.item.jenis_penanganan === ''">-</p>
          <p v-else>{{ row.item.jenis_penanganan }}</p>
        </template>

        <template #cell(ketRawat)="row">
          <b-button
          v-if="row.item.ketRawat === ''"
          v-b-modal.keteranganPasien-modal-prevent-closing 
          size="sm" 
          @click="getIndex(row.item)" 
          class="mr-1"
          variant="primary">
            Ket
          </b-button>
          <b-button 
          v-else
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
          @click="getIndex(row.item)">
            Detail
          </b-button>

          <div v-if="row.item.status !== 'selesai'">
            <!-- No Antri Umum -->
            <b-button v-if="row.item.disease === 'umum'"
            size="sm"
            @click="changeStatusUmum(row.item)"
            >
              Selesai
            </b-button>

            <!-- No Antri Gigi -->
            <b-button v-if="row.item.disease === 'gigi'"
            size="sm"
            @click="changeStatusGigi(row.item)"
            >
              Selesai
            </b-button>

            <!-- No Antri Kulit -->
            <b-button v-if="row.item.disease === 'kulit'"
            size="sm"
            @click="changeStatusKulit(row.item)"
            >
              Selesai
            </b-button>

            <!-- No Antri THT -->
            <b-button v-if="row.item.disease === 'tht'"
            size="sm"
            @click="changeStatusTht(row.item)"
            >
              Selesai
            </b-button>
          </div>

          <div v-else>
            <b-iconstack font-scale="2">
              <b-icon stacked icon="square"></b-icon>
              <b-icon stacked icon="check"></b-icon>
            </b-iconstack>
          </div>
        </template>

      </b-table>

      <!-- Modal Keterangan Pasien -->
      <b-modal
      id="keteranganPasien-modal-prevent-closing"
      ref="modal"
      title="Keterangan Dokter"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOkEditPatient"
      size="xl"
      >

      <!-- Detail View Mode -->
        <form v-if="editMode === false" ref="form" @submit.stop.prevent="handleSubmitAddPatient()">
        <!-- Input Keterangan Rawat -->
        <b-form-group>
        <b-form-textarea
          rows="8"
          id="ketRawat-input"
          v-model="detailPatient.ketRawat"
          :state="ketRawatState"
          disabled
        ></b-form-textarea>

        </b-form-group>

        </form>

      <!-- Detail Edit Mode -->
        <form v-else ref="form" @submit.stop.prevent="handleSubmitAddPatient()">
        <!-- Input Keterangan Rawat -->
        <b-form-group>
        <b-form-textarea
          rows="8"
          id="ketRawat-input"
          v-model="detailPatient.ketRawat"
          :state="ketRawatState"
        ></b-form-textarea>

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
        <b-button v-else size="lg" variant="danger" @click="restoreEditMode()">
            Batal
        </b-button>
        <b-button size="lg" variant="success" @click="ok()">
            Simpan
        </b-button>
      </template>
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
        <form ref="form" @submit.stop.prevent="handleSubmitAddPatient()">
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

          <!-- Input Name -->
          <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
          >
          <b-form-input
              id="name-input"
              v-model="detailPatient.nama"
              :state="nameState"
              required
              disabled
          ></b-form-input>
          </b-form-group>

          <!-- Input Address -->
          <b-form-group
          label="Address"
          label-for="address-input"
          invalid-feedback="Address is required"
          :state="addressState"
          >
          <b-form-input
              id="address-input"
              v-model="detailPatient.alamat"
              :state="addressState"
              required
              disabled
          ></b-form-input>
          </b-form-group>

          <!-- Input Radio Gender -->
          <b-form-group
          label="Jenis Kelamin"
          label-for="gender-input"
          invalid-feedback="Jenis Kelamin is required"
          :state="genderState"
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

          <!-- Input Phone -->
          <b-form-group
          label="Phone"
          label-for="phone-input"
          invalid-feedback="Phone is required"
          :state="phoneState"
          >
          <b-form-input
              id="phone-input"
              v-model="detailPatient.nomor_hp"
              :state="phoneState"
              required
              disabled
          ></b-form-input>
          </b-form-group>

          <!-- Input Place of Birth -->
          <b-form-group
          label="Place of Birth"
          label-for="placeOfBirth-input"
          invalid-feedback="Place of Birth is required"
          :state="placeOfBirthState"
          >
          <b-form-input
              id="placeOfBirth-input"
              v-model="detailPatient.placeOfBirth"
              :state="placeOfBirthState"
              required
              disabled
          ></b-form-input>
          </b-form-group>

          <!-- Input Date of Birth -->
          <b-form-group
          label="Date of Birth"
          label-for="dateOfBirth-input"
          invalid-feedback="Date of Birth is required"
          :state="dateOfBirthState"
          >
          <b-form-datepicker
            id="dateOfBirth-datepicker"
            v-model="detailPatient.dateOfBirth"
            :state="dateOfBirthState"
            required
            disabled
          ></b-form-datepicker>
          </b-form-group>

          <!-- Input Jadwal Rawat Jalan -->
          <b-form-group
          label="Jadwal Rawat Jalan"
          label-for="jadwalRawat-input"
          invalid-feedback="Jadwal Rawat is required"
          :state="jadwalRawatState"
          >
          <b-form-datepicker
            id="jadwalRawat-datepicker"
            v-model="detailPatient.jadwalRawat"
            :state="jadwalRawatState"
            required
            disabled
          ></b-form-datepicker>
          </b-form-group>

          <!-- No Antri of Birth -->
          <b-form-group
          label="No Antri"
          label-for="noAntri-input"
          invalid-feedback="No Antri is required"
          :state="noAntriState"
          >
          <b-form-input
              id="noAntri-input"
              v-model="detailPatient.noAntri"
              :state="noAntriState"
              required
              disabled
          ></b-form-input>
          </b-form-group>

        </form>

      <template #modal-footer="{ ok }">
        <b-button size="lg" variant="success" @click="ok()">
            Ok
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


    </b-container>
  </div>
</template>

<script>
  import axios from 'axios'
  import navbar from '@/components/NavbarDokter.vue'

  export default {
  components: { 
    navbar 
  },
    name:'VuetifyPage',
    data() {
      return {
        patients: [],
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
          placeOfBirth: '',
          dateOfBirth: '',
          disease: '',
          handling: '',
          jadwalRawat: '',
          noAntri: '',
          ketRawat: '',
          status: ''
        },

        nikState: null,
        nameState: null,
        addressState: null,
        genderState: null,
        phoneState: null,
        placeOfBirthState: null,
        dateOfBirthState: null,
        diseaseState: null,
        handlingState: null,
        jadwalRawatState: null,
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
          { key: 'nomer_antrian', label: 'Nomer Antrian'},
          { key: 'jenis_penanganan', label: 'Jenis Penanganan'},
          { key: 'ketRawat', label: 'Keterangan Rawat Jalan'},
          { key: 'actions', label: 'Actions' }
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
      testIndex(item) {
        console.log(item)
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
            const response = await axios.get(`https://api-capstone-heroku.herokuapp.com/admin/rawat_jalan_lihat/gigi`)
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
                    name: this.detailPatient.name,
                    address: this.detailPatient.address,
                    gender: this.detailPatient.gender,
                    phone: this.detailPatient.phone,
                    placeOfBirth: this.detailPatient.placeOfBirth,
                    dateOfBirth: this.detailPatient.dateOfBirth,
                    disease: this.detailPatient.disease,
                    handling: this.detailPatient.handling,
                    jadwalRawat: this.detailPatient.jadwalRawat,
                    noAntri: this.detailPatient.noAntri,
                    ketRawat: this.detailPatient.ketRawat
                })
                this.load()
            } catch (error) {
                console.log(error)
            }
        },

        async updateStatusPatient(payload) {
            try {
                await axios.put(`http://localhost:3000/patients/` + this.indexSelected, {
                    nik: this.detailPatient.nik,
                    name: this.detailPatient.name,
                    address: this.detailPatient.address,
                    gender: this.detailPatient.gender,
                    phone: this.detailPatient.phone,
                    placeOfBirth: this.detailPatient.placeOfBirth,
                    dateOfBirth: this.detailPatient.dateOfBirth,
                    disease: this.detailPatient.disease,
                    handling: this.detailPatient.handling,
                    jadwalRawat: this.detailPatient.jadwalRawat,
                    noAntri: this.detailPatient.noAntri,
                    ketRawat: this.detailPatient.ketRawat,
                    status: payload
                })
                this.load()
            } catch (error) {
                console.log(error)
            }
        },

        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.nikState = valid
            this.nameState = valid
            this.addressState = valid
            this.genderState = valid
            this.phoneState = valid
            this.placeOfBirthState = valid
            this.dateOfBirthState = valid
            this.ketRawatState = valid
            return valid
        },

        resetModal() {
          this.form.nik = ''
          this.form.name = ''
          this.form.address = ''
          this.form.gender = ''
          this.form.phone = ''
          this.form.placeOfBirth = ''
          this.form.dateOfBirth = ''
          this.form.ketRawat = ''

          this.nikState = null
          this.nameState = null
          this.addressState = null
          this.genderState = null
          this.phoneState = null
          this.placeOfBirthState = null
          this.dateOfBirthState = null
          this.ketRawatState = null

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
                this.$bvModal.hide('keteranganPasien-modal-prevent-closing')
            })
            this.editMode = false
        },

        changeEditMode() {
          this.editMode = true
        },

        restoreEditMode() {
            this.editMode = false
        },

        onContext(ctx) {
          this.context = ctx
        },

        changeStatusUmum(item){
          this.getIndex(item)
          this.finishedTreatmentUmum(item.noAntri)
          this.updateStatusPatient('selesai')
        },

        changeStatusGigi(item){
          this.getIndex(item)
          this.finishedTreatmentGigi(item.noAntri)
          this.updateStatusPatient('selesai')
        },

        changeStatusKulit(item){
          this.getIndex(item)
          this.finishedTreatmentKulit(item.noAntri)
          this.updateStatusPatient('selesai')
        },

        changeStatusTht(item){
          this.getIndex(item)
          this.finishedTreatmentTht(item.noAntri)
          this.updateStatusPatient('selesai')
        },

        finishedTreatmentUmum(payload) {
          if (confirm('Apakah Pasien Selesai Berobat?') == true) {
            this.$store.dispatch('changeNoUmum', payload)
          }
        },

        finishedTreatmentGigi(payload) {
          if (confirm('Apakah Pasien Selesai Berobat?') == true) {
            this.$store.dispatch('changeNoGigi', payload)
          }
        },

        finishedTreatmentKulit(payload) {
          if (confirm('Apakah Pasien Selesai Berobat?') == true) {
            this.$store.dispatch('changeNoKulit', payload)
          }
        },

        finishedTreatmentTht(payload) {
          if (confirm('Apakah Pasien Selesai Berobat?') == true) {
            this.$store.dispatch('changeNoTht', payload)
          }
        }
    },
    mounted() {
      this.load()
      {
        let user= localStorage.getItem('userLogin');
          if(!user){
            this.$router.push({name:"LoginPage"})
          }
      }
    },
  }
</script>
  
<style scoped>
</style>