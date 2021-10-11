<template>
  <parent/>

  <!-- Main content -->
  <div class="main-content" id="panel">
    
    <!-- Header -->
    <div class="header bg-primary pb-6">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white d-inline-block mb-0">Proyek</h6>
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                  <li class="breadcrumb-item active" aria-current="page">Proyek</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Header -->
    
    <!-- Page content -->
    <div class="container-fluid mt--6" v-if="! isEditing">
      <!-- Isi View -->
      <div class="row">
          <div class="col">
            <div class="card">

            <!-- Card header -->
            <div class="row align-items-center py-1">
              <div class="col text-center">
                <h6 class="col h2 text-black d-inline-block mb-0">Data Proyek</h6>
              </div>
            </div>

            <div class="container">
              <div class="row align-items-center py-3">
                <div class="col-lg-6">
                  <form class="form-inline"  @submit.prevent="searchProyek()">
                    <input class="form-control mr-sm-1" v-model="query" type="search" placeholder="Cari..." aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Cari</button>
                  </form>
                </div>
                <div class="col-lg-5 text-right">
                  <a href="#" class="btn btn-primary" type="button" @click="isEditing = true"> + Proyek </a>
                </div>
              </div>
            </div>
            
            <!-- End Card Header -->
            
            <!-- Light table -->
            <div class="table-responsive">
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col" colspan="5" class="text-center">Proyek</th>
                    <th scope="col">Aksi</th>
                  </tr>
                </thead>
                <tbody class="list" v-for="(proyek, i) in proyekList" :key="i">
                  <tr>
                    <th scope="row">{{ i+1 }}</th>
                    <td scope="row" class="text-left">
                      <tr>Nomor Proyek</tr>
                      <tr>Nama Proyek</tr>
                      <tr>Lokasi</tr>
                      <tr>Dinas</tr>
                      <tr>Tahun Anggaran</tr>
                      <tr>Harga</tr>
                      <tr>Tanggal Mulai</tr>
                      <tr>Tanggal Selesai</tr>
                    </td>
                    <td scope="row" colspan="4">
                      <tr>{{ proyek.nomor_proyek }}</tr>
                      <tr>{{ proyek.nama_proyek }}</tr>
                      <tr>{{ proyek.lokasi }}</tr>
                      <tr>{{ proyek.dinas }}</tr>
                      <tr>{{ proyek.thn_anggaran }}</tr>
                      <tr>{{ proyek.harga }}</tr>
                      <tr>{{ proyek.tgl_mulai_proyek}}</tr>
                      <tr>{{ proyek.tgl_selesai_proyek}}</tr>
                    </td>
                    <td>
                    <button class="btn btn-primary" @click="editProyek(i)">Edit</button>
                    <button class="btn btn-danger" @click="hapusProyek(i)">Hapus</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Pagination Card footer -->
            
            <!-- End Pagination Card Footer -->
            </div>
          </div>
      </div>
      <!-- End Light Table -->
      <!-- Footer -->
      <child/>
      <!-- End Footer -->
    </div>
    <!-- End Page Content -->




  <!-- Page Form Edit dan Tambah -->
     <div class="container-fluid mt--6" v-else>
        <!-- Isi View -->
        <div class="row">
          <div class="col">
              <div class="card">

              <!-- Card header -->
              <div class="row align-items-center py-4">
                <div class="col-lg-6">
                  <h6 class="col-lg-6 h2 text-black d-inline-block mb-0">Edit Data Karyawan</h6>
                </div>
              </div>
              <!-- End Card Header -->
              
              <!-- Form Isi -->
              <form>
                <div class="pl-lg-3">
                  <div class="row">
                    <div class="col-lg-5">
                      <div class="form-group">
                        <label class="form-control-label" for="nomor_proyek">Nomor</label>
                        <input type="text" id="nomor_proyek" v-model="proyek.nomor_proyek" class="form-control" placeholder="Masukkan Nomor Proyek"> 
                      </div>
                    </div>
                    <div class="col-lg-3">
                    </div>
                    <div class="col-lg-3">
                      <div class="form-group">
                        <label class="form-control-label" for="lokasi">Lokasi</label>
                        <input type="text" id="lokasi" v-model="proyek.lokasi" class="form-control" placeholder="Masukkan Lokasi Proyek">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-8">
                      <div class="form-group">
                        <label class="form-control-label" for="nama_proyek">Nama</label>
                        <input type="text" id="nama_proyek" v-model="proyek.nama_proyek" class="form-control" placeholder="Masukkan Nama Proyek">
                      </div>
                    </div>
                    <div class="col-lg-2">
                      <div class="form-group">
                        <label class="form-control-label" for="thn_anggaran">Tahun Anggaran</label>
                        <input type="number" id="thn_anggaran" v-model="proyek.thn_anggaran" class="form-control" placeholder="Tahun Anggaran Proyek">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-7">
                      <div class="form-group">
                        <label class="form-control-label" for="dinas">Dinas</label>
                        <input type="text" id="dinas" v-model="proyek.dinas" class="form-control" placeholder="Masukkan Dinas Proyek">
                      </div>
                    </div>
                    <div class="col-lg-1">
                    </div>
                    <div class="col-lg-3">
                      <div class="form-group">
                        <label class="form-control-label" for="harga">Harga</label>
                        <input type="text" id="harga" v-model="proyek.harga" class="form-control" placeholder="Masukkan Harga Proyek">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-3">
                      <div class="form-group">
                        <label class="form-control-label" for="tgl_mulai_proyek">Tanggal Mulai</label>
                        <input type="date" id="tgl_mulai_proyek" v-model="proyek.tgl_mulai_proyek" class="form-control">
                      </div>
                    </div>
                    <div class="col-lg-5">
                    </div>
                    <div class="col-lg-3">
                      <div class="form-group">
                        <label class="form-control-label" for="tgl_selesai_proyek">Tanggal Selesai</label>
                        <input type="date" id="tgl_selesai_proyek" v-model="proyek.tgl_selesai_proyek" class="form-control">
                      </div>
                    </div>
                  </div>
                </div>


                  <div class="row align-items-center py-4">
                    <div class="col-lg-6">
                    
                    </div>
                    <div class="col-lg-11 text-right">
                      <a class="btn btn-success" @click="simpanProyek()">SIMPAN</a>
                      <a class="btn btn-primary" @click="kembali()">KEMBALI</a>
                    </div>
                  </div>
              </form>
              <!-- End Form Isi -->
            </div>
          </div>

        </div>
      <!-- End Content Table -->
      <!-- Footer -->
      <child/>
      <!-- End Footer -->
    </div>
    <!-- End Page Form Edit dan Tambah -->


  </div>
  <!-- End Main Content -->
</template>

<script lang='ts'>
import Parent from '../views/Parent.vue'
import Child from '../views/Child.vue'
import Api from '../services/api'
// import pagination from 'laravel-vue-pagination'

export default {
  name: 'Proyek',
    data(){
      return{
        api: new Api,
        proyekList: [],
        proyek: { id_proyek: 0, nomor_proyek: '', nama_proyek: '', lokasi: '', dinas: '',
        thn_anggaran: '', harga: '', tgl_mulai_proyek: '', tgl_selesai_proyek: ''},
        milestone: {id_milestone: 0, nama_milestone: this.nama_proyek, id_proyek: this.id_proyek},
        isEditing: false,
        query: ''
      }
    },
    methods: {
      async simpanProyek() {
        try {
        if (this.proyek.nomor_proyek.length == 0) {
          alert('Isi Nomor Proyek');
          return;
        }
        if (this.proyek.nama_proyek.length == 0) {
          alert('Isi Email Proyek');
          return;
        }
        if (this.proyek.lokasi.length == 0) {
          alert('Isi Lokasi Proyek');
          return;
        }
        if (this.proyek.dinas.length == 0) {
          alert('Isi Dinas Proyek');
          return;
        }
        if (this.proyek.thn_anggaran.length == 0) {
          alert('Isi Tahun Anggaran Proyek');
          return;
        }
        if (this.proyek.harga.length == 0) {
          alert('Isi Harga Proyek');
          return;
        }
        if (this.proyek.tgl_mulai_proyek.length == 0) {
          alert('Isi Tanggal Mulai Proyek');
          return;
        }
        if (this.proyek.tgl_selesai_proyek.length == 0) {
          alert('Isi Tanggal Selesai Proyek');
          return;
        }
        let url = "/api/proyek";
        if (this.proyek.id_proyek > 0){
          url += `/${this.proyek.id_proyek}`
        };
        const data = await this.api.postResource(url, this.proyek, this.proyek.id_proyek > 0 ? 'PUT' : 'POST');
        const dataMilestone = await this.api.postResource('/api/milestone', this.milestone);
        this.isEditing = false;
        this.proyek = {id_proyek: 0, nomor_proyek: '', nama_proyek: '', lokasi: '', dinas: '', thn_anggaran: '', harga: '', tgl_mulai_proyek: '', tgl_selesai_proyek: ''}
        this.proyekList = await this.api.getResource('/api/proyek');
        } catch (err) {
          console.log(err);
        }
      },
      editProyek(i: number) {
        const ambilData = this.proyekList[i];
        this.proyek = ambilData;
        this.isEditing = true;
      },
      async hapusProyek(i: number) {
        const dataHapus = this.proyekList[i];
        this.proyek = dataHapus;
        let url = '/api/proyek' + '/' + this.proyek.id_proyek;
        const data = await this.api.deleteResource(url);
        this.proyekList = await this.api.getResource('/api/proyek');
      },
      kembali(){
        this.isEditing = false;
        this.proyek = {id_proyek: 0, nomor_proyek: '', nama_proyek: '', lokasi: '', dinas: '', thn_anggaran: '', harga: '', tgl_mulai_proyek: '', tgl_selesai_proyek: ''}
      },
      async searchProyek(){
        this.proyekList = await this.api.getResource('/api/proyek?query=' + this.query);
      }
    },
    async mounted(){
      this.proyekList = await this.api.getResource('/api/proyek');
    },
    components: {
      Parent, Child,
    }
}
</script>