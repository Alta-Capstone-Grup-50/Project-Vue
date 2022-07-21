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

        <template #cell(jenis_penanganan)="row">
          {{ row.item }}
        </template>

        <template #cell(proses)="row">

          <div v-if="row.item.proses !== true">
            <!-- No Antri Umum -->
            <b-button v-if="row.item.nomer_antrian.slice(0, 1) === 'U'"
            size="sm"
            @click="changeStatusUmum(row.item)"
            >
              Selesai
            </b-button>

            <!-- No Antri Gigi -->
            <b-button v-if="row.item.nomer_antrian.slice(0, 1) === 'G'"
            size="sm"
            @click="changeStatusGigi(row.item)"
            >
              Selesai
            </b-button>

            <!-- No Antri Kulit -->
            <b-button v-if="row.item.nomer_antrian.slice(0, 1) === 'K'"
            size="sm"
            @click="changeStatusKulit(row.item)"
            >
              Selesai
            </b-button>

            <!-- No Antri THT -->
            <b-button v-if="row.item.nomer_antrian.slice(0, 1) === 'T'"
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

          <!-- <b-form-checkbox
            size="lg"
            v-if="row.item.proses === true"
            id="checkbox-1"
            v-model="statusSelesai"
            nama="checkbox-1"
            value="accepted"
            unchecked-value="not_accepted"
            disabled
          >
          </b-form-checkbox>
          <b-button 
          v-else
          size="sm" 
          @click="getIndex(row.item)"
          variant="primary">
            Selesai
          </b-button> -->

        </template>

        <template #cell(keterangan)="row">
          <b-button
          v-if="row.item.keterangan === ''"
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
          id="keterangan-input"
          v-model="detailPatient.keterangan"
          :state="keteranganState"
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
          id="keterangan-input"
          v-model="detailPatient.keterangan"
          :state="keteranganState"
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

          <!-- Input nama -->
          <b-form-group
          label="nama"
          label-for="nama-input"
          invalid-feedback="nama is required"
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
          label="alamat"
          label-for="alamat-input"
          invalid-feedback="alamat is required"
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
          label="no_hp"
          label-for="no_hp-input"
          invalid-feedback="no_hp is required"
          :state="no_hpState"
          >
          <b-form-input
              id="no_hp-input"
              v-model="detailPatient.nomor_hp"
              :state="no_hpState"
              required
              disabled
          ></b-form-input>
          </b-form-group>

          <!-- Input Place of Birth -->
          <b-form-group
          label="Place of Birth"
          label-for="tempat_lahir-input"
          invalid-feedback="Place of Birth is required"
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

          <!-- Input Date of Birth -->
          <b-form-group
          label="Date of Birth"
          label-for="tanggal_lahir-input"
          invalid-feedback="Date of Birth is required"
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
          invalid-feedback="Jadwal Rawat is required"
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

          <!-- No Antri of Birth -->
          <b-form-group
          label="No Antri"
          label-for="nomer_antrian-input"
          invalid-feedback="No Antri is required"
          :state="nomer_antrianState"
          >
          <b-form-input
              id="nomer_antrian-input"
              v-model="detailPatient.nomer_antrian"
              :state="nomer_antrianState"
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
    nama:'VuetifyPage',
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
          jenis_penyakit: '',
          jenis_penanganan: '',
          jadwal_rawat_jalan: '',
          nomer_antrian: '',
          keterangan: '',
          proses: ''
        },

        nikState: null,
        namaState: null,
        alamatState: null,
        jenis_kelaminState: null,
        no_hpState: null,
        tempat_lahirState: null,
        tanggal_lahirState: null,
        jenis_penyakitState: null,
        jenis_penangananState: null,
        jadwal_rawat_jalanState: null,
        nomer_antrianState: null,
        keteranganState: null,

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
          { key: 'keterangan', label: 'Keterangan Rawat Jalan'},
          { key: 'actions', label: 'Actions' },
          { key: 'proses', label: 'Selesai'}
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
        statusSelesai: 'accepted',
        statusBelumSelesai:'not_accepted'
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
                    jenis_penyakit: this.detailPatient.jenis_penyakit,
                    jenis_penanganan: this.detailPatient.jenis_penanganan,
                    jadwal_rawat_jalan: this.detailPatient.jadwal_rawat_jalan,
                    nomer_antrian: this.detailPatient.nomer_antrian,
                    keterangan: this.detailPatient.keterangan,
                    proses: this.detailPatient.proses
                })
                this.load()
            } catch (error) {
                console.log(error)
            }
        },

        async updateStatusPatient(payload) {
            try {
                await axios.put(`https://api-capstone-heroku.herokuapp.com/admin/data_pasien_edit/` + this.indexSelected, {
                    nik: this.detailPatient.nik,
                    nama: this.detailPatient.nama,
                    alamat: this.detailPatient.alamat,
                    jenis_kelamin: this.detailPatient.jenis_kelamin,
                    no_hp: this.detailPatient.no_hp,
                    tempat_lahir: this.detailPatient.tempat_lahir,
                    tanggal_lahir: this.detailPatient.tanggal_lahir,
                    jenis_penyakit: this.detailPatient.jenis_penyakit,
                    jenis_penanganan: this.detailPatient.jenis_penanganan,
                    jadwal_rawat_jalan: this.detailPatient.jadwal_rawat_jalan,
                    nomer_antrian: this.detailPatient.nomer_antrian,
                    keterangan: this.detailPatient.keterangan,
                    proses: payload
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
            this.keteranganState = valid
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
          this.form.keterangan = ''

          this.nikState = null
          this.namaState = null
          this.alamatState = null
          this.jenis_kelaminState = null
          this.no_hpState = null
          this.tempat_lahirState = null
          this.tanggal_lahirState = null
          this.keteranganState = null

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
          this.finishedTreatmentUmum(item.nomer_antrian)
        },

        changeStatusGigi(item){
          this.getIndex(item)
          this.finishedTreatmentGigi(item.nomer_antrian)
        },

        changeStatusKulit(item){
          this.getIndex(item)
          this.finishedTreatmentKulit(item.nomer_antrian)
        },

        changeStatusTht(item){
          this.getIndex(item)
          this.finishedTreatmentTht(item.nomer_antrian)
        },

        finishedTreatmentUmum(payload) {
          if (confirm('Apakah Pasien Selesai Berobat?') == true) {
            localStorage.setItem('noUmum', JSON.stringify(payload))
            this.$store.dispatch('changeNoUmum', payload)
            this.updateStatusPatient(true)
          }
        },

        finishedTreatmentGigi(payload) {
          if (confirm('Apakah Pasien Selesai Berobat?') == true) {
            localStorage.setItem('noGigi', JSON.stringify(payload))
            this.$store.dispatch('changeNoGigi', payload)
            this.updateStatusPatient(true)
          }
        },

        finishedTreatmentKulit(payload) {
          if (confirm('Apakah Pasien Selesai Berobat?') == true) {
            localStorage.setItem('noKulit', JSON.stringify(payload))
            this.$store.dispatch('changeNoKulit', payload)
            this.updateStatusPatient(true)
          }
        },

        finishedTreatmentTht(payload) {
          if (confirm('Apakah Pasien Selesai Berobat?') == true) {
            localStorage.setItem('noTht', JSON.stringify(payload))
            this.$store.dispatch('changeNoTht', payload)
            this.updateStatusPatient(true)
          }
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
</style>