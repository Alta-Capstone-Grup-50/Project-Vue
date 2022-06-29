<template>
  <b-container class="mt-5">
    <h3><strong>Data Dokter</strong></h3>
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
      :items="dokter"
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
      <template #cell(dokter)="row">
       {{ row.item.dokter + 1 }} {{ row.item.dokter }} {{ row.item.last }}
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
    title="Data Dokter"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOkEditDokter"
    size="md"
    >
      <form v-if="editMode === false" ref="form" @submit.stop.prevent="handleSubmitAddDokter()">
      <!-- Data SIP -->
      <b-form-group
      label="SIP"
      label-for="sip-input"
      invalid-feedback="SIP is required"
      :state="sipState"
      >
      <b-form-input
          id="sip-input"
          v-model="detailDokter.sip"
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
            v-model="detailDokter.nama"
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
            v-model="detailDokter.gender"
            :options="options"
            class="mb-3"
            required
            disabled
        ></b-form-radio-group>
        </b-form-group>

        <!-- Data Spesialis -->
        <b-form-group
        label="Spesialis"
        label-for="spesialis-input"
        invalid-feedback="Spesialis is required"
        :state="spesialisState"
        >
        <b-form-input
            id="spesialis-input"
            v-model="detailDokter.spesialis"
            :state="spesialisState"
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
            v-model="detailDokter.jadwal"
            :state="jadwalState"
            required
            disabled
        ></b-form-input>
        </b-form-group>

        <!-- Data STRh -->
        <b-form-group
        label="Nomor STR"
        label-for="str-input"
        invalid-feedback="Place of Birth is required"
        :state="strState"
        >
        <b-form-input
            id="placeOfBirth-input"
            v-model="detailDokter.str"
            :state="strState"
            required
            disabled
        ></b-form-input>
        </b-form-group>
      </form>

    <!-- Detail Edit Mode -->
      <form v-else ref="form" @submit.stop.prevent="handleSubmitAddDokter()">
      <!-- SIP -->
      <b-form-group
      label="SIP"
      label-for="sip-input"
      invalid-feedback="SIP is required"
      :state="sipState"
      >
      <b-form-input
          id="sip-input"
          v-model="detailDokter.sip"
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
            v-model="detailDokter.nama"
            :state="namaState"
            required

        ></b-form-input>
        </b-form-group>

        <!-- Jenis Kelamin -->
        <b-form-group
        label="Jenis Kelamin"
        label-for="gender-input"
        invalid-feedback="Jenis Kelamin is required"
        :state="genderState"
        >
        <b-form-radio-group
            id="gender-input"
            v-model="detailDokter.gender"
            :options="options"
            size="md"
            required

        ></b-form-radio-group>
        </b-form-group>

        <!-- Spesialis -->
        <b-form-group
        label="Spesialis"
        label-for="spesialis-input"
        invalid-feedback="Spesialis is required"
        :state="spesialisState"
        >
        <b-form-input
            id="spesialis-input"
            v-model="detailDokter.spesialis"
            :state="spesialisState"
            required

        ></b-form-input>
        </b-form-group>

        <!-- Jadwal -->
        <b-form-group
        label="Jadwal"
        label-for="jadwal-input"
        invalid-feedback="Jadwal is required"
        :state="jadwalState"
        >
        <b-form-input
            id="jadwal-input"
            v-model="detailDokter.jadwal"
            :state="jadwalState"
            required

        ></b-form-input>
        </b-form-group>

        <!-- STR -->
        <b-form-group
        label="STR"
        label-for="str-input"
        invalid-feedback="STR is required"
        :state="strState"
        >
        <b-form-input
            id="str-input"
            v-model="detailDokter.str"
            :state="strState"
            required

        ></b-form-input>
        </b-form-group>
      </form>

    <template #modal-footer="{ ok }">
      <b-button 
      v-if="editMode === false"
      v-b-modal.detail-modal-prevent-closing  
      squared
      class="text-white"
      variant="warning" 
      @click="changeEditMode()">
          Edit
      </b-button>
      <b-button v-else variant="danger" squared @click="deleteDokter(indexSelected)">
          Delete
      </b-button>
      <b-button variant="primary" squared @click="ok()">
          Simpan
      </b-button>
    </template>
    </b-modal>
  </b-container>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        dokter:[],
        detailDokter:[],
        editMode: false,
        indexNumber: '',
        indexSelected: '',
        form : {
          sip: '',
          nama: '',
          gender:'',
          spesialis: '',
          jadwal: '',
          str: '',
          handling: ''
        },
        sipState: null,
        namaState: null,
        genderState: null,
        spesialisState: null,
        jadwalState: null,
        strState: null,
        selected: '',
        options: [
            { text: 'Laki-laki', value: 'L' },
            { text: 'Perempuan', value: 'P' },
        ],
        items: [],
        fields: [
          
          { key: 'index', label: 'No'},
          { key: 'sip', label: 'SIP'},
          { key: 'nama', label: 'Nama'},
          { key: 'spesialis', label: 'Spesialis'},
          { key: 'gender', label: 'Jenis Kelamin'},
          { key: 'jadwal', label: 'Jadwal Praktek'},
          { key: 'str', label: 'Nomor STR'},
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
        console.log(this.detailDokter.indexOf(item))
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
            const response = await axios.get(`https://62b483cfda3017eabb0c415b.mockapi.io/dokter`)
            this.dokter = response.data
            
            // Set the initial number of patients
            this.totalRows = this.dokter.length
        },
      getIndex(item) {
            this.indexNumber = this.dokter.indexOf(item)
            this.detailDokter = this.dokter[this.indexNumber]
            this.indexSelected = this.detailDokter.id
        },
        async addDokter() {
          try {
              await axios.post(`https://62b483cfda3017eabb0c415b.mockapi.io/dokter`, this.form)
              this.load()
          } catch (error) {
              console.log(error)
          }
        },
        async deleteDokter(indexId) {
            if (confirm('Apakah Anda Akan Menghapus Data Ini?') == true) {
                try {
                    await axios.delete(`https://62b483cfda3017eabb0c415b.mockapi.io/dokter/` + indexId)
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
        async updateDokter() {
            try {
                await axios.put(`https://62b483cfda3017eabb0c415b.mockapi.io/dokter/` + this.indexSelected, {
                    sip: this.detailDokter.sip,
                    nama: this.detailDokter.nama,
                    gender: this.detailDokter.gender,
                    spesialis: this.detailDokter.spesialis,
                    jadwal: this.detailDokter.jadwal,
                    str: this.detailDokter.str,
                    handling: this.detailDokter.handling
                })
                this.load()
            } catch (error) {
                console.log(error)
            }
        },
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.sipState = valid
            this.namaState = valid
            this.genderState = valid
            this.spesialisState = valid
            this.jadwalState = valid
            this.str = valid
            return valid
        },
        resetModal() {
          this.form.sip = ''
          this.form.nama = ''
          this.form.gender = ''
          this.form.spesialis = ''
          this.form.jadwal = ''
          this.form.str = ''
          this.sipState = null
          this.namaState = null
          this.genderState = null
          this.spesialisState = null
          this.jadwalState = null
          this.editMode = false
        },
        selectionHandeOk(){
            if (this.editMode === false) {
                this.handleOkAddDokter()
            } else {
                this.handleOkEditDokter()
            }
        },
        handleOkAddDokter(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()
            // Trigger submit handler
            this.handleSubmitAddDokter()
        },
        handleOkEditDokter(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()
            // Trigger submit handler
            this.handleSubmitEditDokter()
        },
        handleSubmitAddDokter() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return
            }
            this.addDokter()
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('add-modal-prevent-closing')
            })
        },
        handleSubmitEditDokter() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return
            }
            this.updateDokter()
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