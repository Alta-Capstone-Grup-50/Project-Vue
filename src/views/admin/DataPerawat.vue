<template>
  <div>
    <navbar />
    <b-container class="mt-5">
      <h3 class="margintop"><strong>Data Perawat</strong></h3>
      <!-- User Interface controls -->
      <div class="mt-2 d-flex">
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
        :items="perawat"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        striped hover
        borderless
        class="mt-3 shadow text-center rounded"
        thead-class="bg-ligh text-black"
        responsive
        :filter-included-fields="filterOn"
        show-empty
        @filtered="onFiltered"
      >
        <template v-slot:cell(index)="row">
          {{ row.index + 1 }}
        </template>

        <template #cell(actions)="row">
          <b-link class="text-decoration-none" size="sm" @click="getIndex(row.item)" v-b-modal.detail-modal-prevent-closing>
            Detail
          </b-link>
        </template>
      </b-table>
      <div class="ms-auto me-auto w-25">
        <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
        ></b-pagination>
      </div>
      <!-- Info modal -->
      <b-modal
      id="detail-modal-prevent-closing"
      ref="modal"
      title="Data Perawat"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOkEditPerawat"
      size="md"
      >
        <!-- Detail View Mode -->
        <form v-if="editMode === false" ref="form" @submit.stop.prevent="handleSubmitAddPerawat()">
        <!-- Data SIP -->
        <b-form-group
        label="SIPP"
        label-for="sip-input"
        invalid-feedback="SIPP is required"
        :state="sipState"
        >
        <b-form-input
            id="sip-input"
            v-model="detailPerawat.sip"
            :state="sipState"
            required
            disabled
        ></b-form-input>
        </b-form-group>

          <!-- Data Nama -->
          <b-form-group
          label="Name"
          label-for="nama-input"
          invalid-feedback="Name is required"
          :state="namaState"
          >
          <b-form-input
              id="nama-input"
              v-model="detailPerawat.nama"
              :state="namaState"
              required
              disabled
          ></b-form-input>
          </b-form-group>

          <!-- Data Jenis Kelamin -->
          <b-form-group
          label="Jenis Kelamin"
          label-for="jenis_kelamin-input"
          invalid-feedback="Jenis Kelamin is required"
          :state="jenis_kelaminState"
          >
          <b-form-radio-group
              id="btn-radios-2"
              v-model="detailPerawat.jenis_kelamin"
              :options="options"
              class="mb-3"
              required
              disabled
          ></b-form-radio-group>
          </b-form-group>

          <!-- Data poli -->
        <b-form-group
          label="Poli"
          label-for="disease-input"
          invalid-feedback="Poli is required"
          :state="poliState"
        >
        <b-form-select
        v-model="detailPerawat.poli"
        :options="optionpoli"
        disabled>
        </b-form-select>
        </b-form-group>

          <!-- Data jadwal_kerja -->
          <b-form-group
          label="Jadwal Kerja"
          label-for="jadwal_kerja-input"
          invalid-feedback="Jadwal Kerja is required"
          :state="jadwal_kerjaState"
          >
          <b-form-input
              id="jadwal_kerja-input"
              v-model="detailPerawat.jadwal_kerja"
              :state="jadwal_kerjaState"
              required
              disabled
          ></b-form-input>
          </b-form-group>

          <!-- Data Jabatan -->
          <b-form-group
          label="Jabatan"
          label-for="jabatan-input"
          invalid-feedback="Jabatan is required"
          :state="jabatanState"
          >
          <b-form-input
              id="jabatan-input"
              v-model="detailPerawat.jabatan"
              :state="jabatanState"
              required
              disabled
          ></b-form-input>
          </b-form-group>

          <!-- Data No HP -->
          <b-form-group
          label="Nomor Telepon"
          label-for="hp-input"
          invalid-feedback="Nomor Telefon is required"
          :state="nomor_telfonState"
          >
          <b-form-input
              id="hp-input"
              v-model="detailPerawat.nomor_telfon"
              :state="nomor_telfonState"
              required
              disabled
          ></b-form-input>
          </b-form-group>
          
          <!-- Data No STR -->
          <b-form-group
          label="Nomor STR"
          label-for="nomor_str-input"
          invalid-feedback="Nomor STR is required"
          :state="nomor_strState"
          >
          <b-form-input
              id="hp-input"
              v-model="detailPerawat.nomor_str"
              :state="nomor_strState"
              required
              disabled
          ></b-form-input>
          </b-form-group>

        </form>
        

      <!-- Detail Edit Mode -->
        <form v-else ref="form" @submit.stop.prevent="handleSubmitAddPerawat()">
        <!-- SIP -->
        <b-form-group
        label="SIPP"
        label-for="sip-input"
        invalid-feedback="SIPP is required"
        :state="sipState"
        >
        <b-form-input
            id="sip-input"
            v-model="detailPerawat.sip"
            :state="sipState"
            required
        ></b-form-input>
        </b-form-group>

          <!-- Nama -->
          <b-form-group
          label="Nama"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="namaState"
          >
          <b-form-input
              id="name-input"
              v-model="detailPerawat.nama"
              :state="namaState"
              required

          ></b-form-input>
          </b-form-group>

          <!-- Jenis Kelamin -->
          <b-form-group
          label="Jenis Kelamin"
          label-for="jenis_kelamin-input"
          invalid-feedback="Jenis Kelamin is required"
          :state="jenis_kelaminState"
          >
          <b-form-radio-group
              id="jenis_kelamin-input"
              v-model="detailPerawat.jenis_kelamin"
              :options="options"
              size="md"
              required

          ></b-form-radio-group>
          </b-form-group>

          <!-- Data poli -->
          <b-form-group
            label="Poli"
            label-for="disease-input"
            invalid-feedback="Poli is required"
            :state="poliState"
          >
          <b-form-select
          v-model="detailPerawat.poli"
          :options="optionpoli"
          >
          </b-form-select>
          </b-form-group>

          <!-- jadwal_kerja -->
          <b-form-group
          label="Jadwal Kerja"
          label-for="jadwal_kerja-input"
          invalid-feedback="jadwal_kerja is required"
          :state="jadwal_kerjaState"
          >
          <b-form-input
              id="jadwal_kerja-input"
              v-model="detailPerawat.jadwal_kerja"
              :state="jadwal_kerjaState"
              required

          ></b-form-input>
          </b-form-group>

          <!-- Data Jabatan -->
          <b-form-group
          label="Jabatan"
          label-for="jabatan-input"
          invalid-feedback="Jabatan is required"
          :state="jabatanState"
          >
          <b-form-input
              id="jabatan-input"
              v-model="detailPerawat.jabatan"
              :state="jabatanState"
              required

          ></b-form-input>
          </b-form-group>

          <!-- Data No HP -->
          <b-form-group
          label="Nomor Telepon"
          label-for="hp-input"
          invalid-feedback="Nomor Telefon is required"
          :state="nomor_telfonState"
          >
          <b-form-input
              id="hp-input"
              v-model="detailPerawat.nomor_telfon"
              :state="nomor_telfonState"
              required
          ></b-form-input>
          </b-form-group>

          <!-- Data No STR -->
          <b-form-group
          label="Nomor STR"
          label-for="nomor_str-input"
          invalid-feedback="Nomor STR is required"
          :state="nomor_strState"
          >
          <b-form-input
              id="hp-input"
              v-model="detailPerawat.nomor_str"
              :state="nomor_strState"
              required
          ></b-form-input>
          </b-form-group>
        </form>

      <template #modal-footer="{ ok }">
        <b-button 
        v-if="editMode === false"
        v-b-modal.detail-modal-prevent-closing  
        squared
        class="text-black"
        variant="outline-secondary" 
        @click="changeEditMode()">
            Edit
        </b-button>
        <b-button v-else variant="outline-danger" squared @click="deletePerawat(indexSelected)">
            Delete
        </b-button>
        <b-button variant="primary" squared @click="ok()">
            Simpan
        </b-button>
      </template>
      </b-modal>
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
    data() {
      return {
        perawat:[],
        detailPerawat:[],
        editMode: false,
        indexNumber: '',
        indexSelected: '',
        form : {
          sip: '',
          nama: '',
          jenis_kelamin:'',
          poli: '',
          jadwal_kerja: '',
          jabatan: '',
          nomor_telfon: '',
          nomor_str: ''
        },
        sipState: null,
        namaState: null,
        jenis_kelaminState: null,
        poliState: null,
        jadwal_kerjaState: null,
        jabatanState: null,
        nomor_telfonState: null,
        nomor_strState: null,
        selected: '',
        options: [
            { text: 'Laki-laki', value: 'L' },
            { text: 'Perempuan', value: 'P' },
        ],
        optionpoli: [
          { value: 'Umum', text: 'Umum' },
          { value: 'Gigi', text: 'Gigi' },
          { value: 'Kandungan', text: 'Kandungan' },
          { value: 'THT', text: 'THT' }
        ],
        items: [],
        fields: [
          
          { key: 'index', label: 'No'},
          { key: 'sip', label: 'SIPP'},
          { key: 'nama', label: 'Nama'},
          { key: 'jenis_kelamin', label: 'Jenis Kelamin'},
          { key: 'poli', label: 'poli Kerja'},
          { key: 'jadwal_kerja', label: 'Jadwal Kerja'},
          { key: 'jabatan', label: 'Jabatan'},
          { key: 'actions', label: 'Actions' }
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
    mounted() {
      this.load()
      {
        let user= localStorage.getItem('adminLogin');
          if(!user){
            this.$router.push({name:"LoginPage"})
          }
      }
    },
    
    methods: {
      testIndex(item) {
        console.log(this.detailPerawat.indexOf(item))
      },
      info(item, button) {
        this.infoModal.title = `Data Dokter`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      async load() {
            const response = await axios.get(`https://api-capstone-heroku.herokuapp.com/admin/data_perawat_lihat`)
            this.perawat = response.data.data
            
            // Set the initial number of patients
            this.totalRows = this.perawat.length
        },
      getIndex(item) {
            this.indexNumber = this.perawat.indexOf(item)
            this.detailPerawat = this.perawat[this.indexNumber]
            this.indexSelected = this.detailPerawat.id
        },
        async deletePerawat(indexId) {
            if (confirm('Apakah Anda Akan Menghapus Data Ini?') == true) {
                try {
                    await axios.delete(`https://api-capstone-heroku.herokuapp.com/admin/data_perawat_hapus/` + indexId)
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
        async updatePerawat() {
            try {
                await axios.put(`https://api-capstone-heroku.herokuapp.com/admin/data_perawat_edit/` + this.indexSelected, {
                    sip: this.detailPerawat.sip,
                    nama: this.detailPerawat.nama,
                    jenis_kelamin: this.detailPerawat.jenis_kelamin,
                    poli: this.detailPerawat.poli,
                    jadwal_kerja: this.detailPerawat.jadwal_kerja,
                    jabatan: this.detailPerawat.jabatan,
                    nomor_telfon: this.detailPerawat.nomor_telfon,
                    nomor_str: this.detailPerawat.nomor_str
                })
                this.load()
            } catch (error) {
                console.log(error)
                alert(error.response.data.message)
            }
        },
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.sipState = valid
            this.namaState = valid
            this.jenis_kelaminState = valid
            this.poliState = valid
            this.jadwal_kerjaState = valid
            this.jabatanState = valid
            this.nomor_telfonState = valid
            this.nomor_strState = valid
            return valid
        },
        resetModal() {
          this.form.sip = ''
          this.form.nama = ''
          this.form.jenis_kelamin = ''
          this.form.poli = ''
          this.form.jadwal_kerja = ''
          this.form.jabatan = ''
          this.form.nomor_telfon = ''
          this.form.nomor_str = ''
          this.sipState = null
          this.namaState = null
          this.jenis_kelaminState = null
          this.poliState = null
          this.jadwal_kerjaState = null
          this.jabatanState = null
          this.nomor_telfonState = null
          this.nomor_strState = null
          this.editMode = false

          this.load()
        },
        selectionHandeOk(){
            if (this.editMode === false) {
                this.handleOkAddPerawat()
            } else {
                this.handleOkEditPerawat()
            }
        },
        handleOkAddPerawat(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()
            // Trigger submit handler
            this.handleSubmitAddPerawat()
        },
        handleOkEditPerawat(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()
            // Trigger submit handler
            this.handleSubmitEditPerawat()
        },
        handleSubmitAddPerawat() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return
            }
            this.addPerawat()
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('add-modal-prevent-closing')
            })
        },
        handleSubmitEditPerawat() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return
            }
            this.updatePerawat()
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
    
  }
</script>
<style>
.margintop{
  margin-top: 150px;
}
</style>