<template>
  <div>
  <navbar />
  <b-container class="mt-5">
    <h3><strong>Data Perawat</strong></h3>
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
      thead-class="bg-info text-white"
      responsive
      :filter-included-fields="filterOn"
      show-empty
      @filtered="onFiltered"
    >
      <template v-slot:cell(index)="row">
        {{ row.index + 1 }}
      </template>
      <template #cell(perawat)="row">
       {{ row.item.perawat + 1 }} {{ row.item.perawat }} {{ row.item.perawat }}
      </template>

      <template #cell(actions)="row">
        <b-link class="text-decoration-none text-muted" size="sm" @click="getIndex(row.item)" v-b-modal.detail-modal-prevent-closing>
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
      <form v-if="editMode === false" ref="form" @submit.stop.prevent="handleSubmitAddPerawat()">
      <!-- Data SIP -->
      <b-form-group
      label="SIPP"
      label-for="sipp-input"
      invalid-feedback="SIPP is required"
      :state="sippState"
      >
      <b-form-input
          id="sipp-input"
          v-model="detailPerawat.sipp"
          :state="sippState"
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
        label-for="gender-input"
        invalid-feedback="Jenis Kelamin is required"
        :state="genderState"
        >
        <b-form-radio-group
            id="btn-radios-2"
            v-model="detailPerawat.gender"
            :options="options"
            class="mb-3"
            required
            disabled
        ></b-form-radio-group>
        </b-form-group>

        <!-- Data Spesialis -->
        <b-form-group
        label="Bagian"
        label-for="bagian-input"
        invalid-feedback="Bagian is required"
        :state="bagianState"
        >
        <b-form-input
            id="bagian-input"
            v-model="detailPerawat.bagian"
            :state="bagianState"
            required
            disabled
        ></b-form-input>
        </b-form-group>

        <!-- Data Jadwal -->
        <b-form-group
        label="Jadwal Praktek"
        label-for="jadwal-input"
        invalid-feedback="Jadwal is required"
        :state="jadwalState"
        >
        <b-form-input
            id="jadwal-input"
            v-model="detailPerawat.jadwal"
            :state="jadwalState"
            required
            disabled
        ></b-form-input>
        </b-form-group>

        <!-- Data STRh -->
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
      </form>

    <template #modal-footer="{ ok }">
      <b-button variant="primary" squared @click="ok()">
          Simpan
      </b-button>
    </template>
    </b-modal>
  </b-container>
  </div>
</template>

<script>
  import navbar from '@/components/NavbarDokter.vue'
  import axios from 'axios'
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
          sipp: '',
          nama: '',
          gender:'',
          bagian: '',
          jadwal: '',
          jabatan: '',
          handling: ''
        },
        sippState: null,
        namaState: null,
        genderState: null,
        bagianState: null,
        jadwalState: null,
        jabatanState: null,
        selected: '',
        options: [
            { text: 'Laki-laki', value: 'L' },
            { text: 'Perempuan', value: 'P' },
        ],
        items: [],
        fields: [
          
          { key: 'index', label: 'No'},
          { key: 'sipp', label: 'SIPP'},
          { key: 'nama', label: 'Nama'},
          { key: 'gender', label: 'Jenis Kelamin'},
          { key: 'bagian', label: 'Bagian Kerja'},
          { key: 'jadwal', label: 'Jadwal Praktek'},
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
        let user= localStorage.getItem('userLogin');
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
            const response = await axios.get(`https://62b483cfda3017eabb0c415b.mockapi.io/perawat`)
            this.perawat = response.data
            
            // Set the initial number of patients
            this.totalRows = this.perawat.length
        },
      getIndex(item) {
            this.indexNumber = this.perawat.indexOf(item)
            this.detailPerawat = this.perawat[this.indexNumber]
            this.indexSelected = this.detailPerawat.id
        },
        async addPerawat() {
          try {
              await axios.post(`https://62b483cfda3017eabb0c415b.mockapi.io/perawat`, this.form)
              this.load()
          } catch (error) {
              console.log(error)
          }
        },
        async deletePerawat(indexId) {
            if (confirm('Apakah Anda Akan Menghapus Data Ini?') == true) {
                try {
                    await axios.delete(`https://62b483cfda3017eabb0c415b.mockapi.io/perawat/` + indexId)
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
                await axios.put(`https://62b483cfda3017eabb0c415b.mockapi.io/perawat/` + this.indexSelected, {
                    sipp: this.detailPerawat.sipp,
                    nama: this.detailPerawat.nama,
                    gender: this.detailPerawat.gender,
                    bagian: this.detailPerawat.bagian,
                    jadwal: this.detailPerawat.jadwal,
                    jabatan: this.detailPerawat.jabatan,
                    handling: this.detailPerawat.handling
                })
                this.load()
            } catch (error) {
                console.log(error)
            }
        },
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.sippState = valid
            this.namaState = valid
            this.genderState = valid
            this.bagianState = valid
            this.jadwalState = valid
            this.jabatanState = valid
            return valid
        },
        resetModal() {
          this.form.sipp = ''
          this.form.nama = ''
          this.form.gender = ''
          this.form.bagian = ''
          this.form.jadwal = ''
          this.form.jabatan = ''
          this.sippState = null
          this.namaState = null
          this.genderState = null
          this.bagianState = null
          this.jadwalState = null
          this.jabatanState = null
          this.editMode = false
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