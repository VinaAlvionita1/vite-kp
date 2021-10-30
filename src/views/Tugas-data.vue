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
              <h6 class="h2 text-white d-inline-block mb-0">Tugas</h6>
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                  <li class="breadcrumb-item"><a href="#">Proyek</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Tugas</li>
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
              <h6 class="col h2 text-black d-inline-block mb-0">Data Tugas</h6>
            </div>
          </div>
          <div class="container">
            <div class="row align-items-center py-3">
                <div class="col-lg-3">
                <select class="form-control" id="id_milestone">
                  <option disabled value="" selected="selected">Pilih Milestone</option>
                  <option v-for="milestone in pilihMilestone" :key="milestone.id_milestone" :value="milestone.id_milestone"> {{ milestone.nama_milestone }} </option>
                </select>
              </div>
            </div>
          </div>
          <!-- End Card Header -->

          <!-- Navbar -->
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item active">
                  <router-link to="/tugas-data" class="nav-link">
                    <span class="nav-link-text">Data Tugas</span>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/tugas-berkas" class="nav-link">
                    <span class="nav-link-text">Berkas</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </nav>
          <!-- End Navbar -->

          <div class="col-lg-12 mt-2 text-right">
            <a href="#" class="btn btn-primary" type="button" @click="isEditing = true"> + Tugas </a>
            <span>
              <router-link to="/milestone" class="btn btn-warning" type="button">Atur Milestone</router-link>
            </span>
          </div>
                
          <!-- Light table -->
          <div class="table-responsive mt-3">
            <table class="table align-items-center table-flush">
              <thead class="thead-light">
                  <tr>
                      <th scope="col">No</th>
                      <th scope="col">Nama</th>
                      <th scope="col">Keterangan</th>
                      <th scope="col">Tanggal Mulai</th>
                      <th scope="col">Tanggal Selesai</th>
                      <th scope="col">Milestone</th>
                      <th scope="col">Status</th>
                      <th scope="col">Kategori</th>
                      <th scope="col">Penanggung Jawab</th>
                      <th scope="col">Aksi</th>
                  </tr>
              </thead>
              <tbody class="list" v-for="(tugas, i) in tugasList" :key="i">
                <tr>
                  <th scope="row">{{ i+1 }}</th>
                  <td scope="row">{{ tugas.nama_tugas }}</td>
                  <td scope="row">{{ tugas.keterangan_tugas }}</td>
                  <td scope="row">{{ tugas.tgl_mulai_tugas }}</td>
                  <td scope="row">{{ tugas.tgl_selesai_tugas }}</td>
                  <td scope="row">{{ tugas.nama_milestone }}</td>
                  <td scope="row">{{ tugas.nama_statuskerja }}</td>
                  <td scope="row">{{ tugas.status_kategori }}</td>
                  <td scope="row">{{ tugas.nama_karyawan }}</td>
                  <td>
                  <button class="btn btn-primary" @click="editTugas(i)">Edit</button>
                  <button class="btn btn-danger" @click="hapusTugas(i)">Hapus</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Pagination Card footer -->
          <div class="card-footer py-4">
            <nav aria-label="...">
              <ul class="pagination justify-content-end mb-0">
                <li class="page-item disabled">
                  <a class="page-link" href="#" tabindex="-1">
                    <i class="fas fa-angle-left"></i>
                    <span class="sr-only">Previous</span>
                  </a>
                </li>
                <li class="page-item active">
                  <a class="page-link" href="#">1</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
                </li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    <i class="fas fa-angle-right"></i>
                    <span class="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
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
                <h6 class="col-lg-6 h2 text-black d-inline-block mb-0">Form Data Tugas</h6>
              </div>
            </div>
            <!-- End Card Header -->
              
            <!-- Form Isi -->
            <form>
              <div class="pl-lg-3">
                <div class="row">
                  <div class="col-lg-5">
                    <div class="form-group">
                      <label class="form-control-label" for="nama_tugas">Nama Tugas</label>
                      <input type="text" id="nama_tugas" v-model="tugas.nama_tugas"  class="form-control" placeholder="Masukkan Nama Tugas">
                    </div>
                  </div>
                  <div class="col-lg-1"></div>
                  <div class="col-lg-5">
                    <div class="form-group">
                      <label class="form-control-label" for="milestone">Milestone</label>
                      <select class="form-control" id="id_milestone" v-model="tugas.id_milestone">
                        <option disabled value="" selected="selected">Pilih Milestone</option>
                        <option v-for="milestone in pilihMilestone" :key="milestone.id_milestone" :value="milestone.id_milestone"> {{ milestone.nama_milestone }} </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-2">
                    <span>
                      <router-link to="/milestone" class="nav-link">
                        <i class="ni ni-settings-gear-65 text-orange"></i>
                      </router-link>
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="keterangan">Keterangan</label>
                      <textarea id="nama_proyek" v-model="tugas.keterangan_tugas" class="form-control" placeholder="Masukkan Keterangan"/>
                    </div>
                  </div>
                  <div class="col-lg-2">
                    <div class="form-group">
                      <label class="form-control-label" for="tgl_mulai_proyek">Tanggal Mulai</label>
                      <input type="date" id="tgl_mulai_proyek" v-model="tugas.tgl_mulai_tugas" class="form-control" placeholder="Tanggal Mulai">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-2">
                    <div class="form-group">
                      <label class="form-control-label" for="tgl_selesai_proyek">Tanggal Selesai</label>
                      <input type="date" id="tgl_selesai_proyek" v-model="tugas.tgl_selesai_tugas" class="form-control" placeholder="Tanggal Selesai">
                    </div>
                  </div>
                  <div class="col-lg-4"></div>
                  <div class="col-lg-3">
                    <div class="form-group">
                      <label class="form-control-label" for="status">Status Pengerjaan</label>
                      <select class="form-control" id="id_status" v-model="tugas.id_status">
                        <option disabled value="" selected="selected">Pilih Status Pengerjaan</option>
                        <option v-for="status in pilihStatus" :key="status.id_status" :value="status.id_status"> {{ status.nama_statuskerja }} </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-3">
                    <div class="form-group">
                      <label class="form-control-label" for="kategori">Kategori Tugas</label>
                      <select class="form-control" id="id_kategori" v-model="tugas.id_kategori">
                        <option disabled value="" selected="selected">Pilih Kategori </option>
                        <option v-for="kategori in pilihKategori" :key="kategori.id_kategori" :value="kategori.id_kategori"> {{ kategori.status_kategori }} </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-3"></div>
                  <div class="col-lg-3">
                    <div class="form-group">
                      <label class="form-control-label" for="id_karyawan">Penanggung Jawab</label>
                      <select class="form-control" id="id_karyawan" v-model="tugas.id_karyawan">
                        <option disabled value="" selected="selected">Pilih Penanggung Jawab</option>
                        <option v-for="karyawan in pilihKaryawan" :key="karyawan.id_karyawan" :value="karyawan.id_karyawan"> {{ karyawan.nama_karyawan }} </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row align-items-center py-4">
                <div class="col-lg-5"></div>
                <div class="col-lg-10 text-right">
                  <a class="btn btn-success" @click="simpanTugas()">SIMPAN</a>
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

<script lang="ts">
import Parent from './Parent.vue';
import Child from './Child.vue'
import Api from '../services/api';

export default {
  name: 'DataTugas',
  data(){
    return{
      api: new Api,
      isEditing: false,
      tugas: {id_tugas: 0, id_status: '', id_kategori: '', id_karyawan: '', id_milestone: '', nama_tugas: '', keterangan_tugas: '', tgl_mulai_tugas: '', tgl_selesai_tugas: ''},
      tugasList: [],
      pilihMilestone: {},
      milestone: '',
      pilihKategori: {},
      kategori: '',
      pilihStatus: {},
      status: '',
      pilihKaryawan: {},
      karyawan: ''
    }
  },
  methods:{
    async simpanTugas() {
        try {
        if (this.tugas.nama_tugas.length == 0) {
          alert('Isi Nama Tugas');
          return;
        }
        if (this.tugas.keterangan_tugas.length == 0) {
          alert('Isi Keterangan Tugas');
          return;
        }
        if (this.tugas.tgl_mulai_tugas.length == 0) {
          alert('Isi Tanggal Mulai Tugas');
          return;
        }
        if (this.tugas.tgl_selesai_tugas.length == 0) {
          alert('Isi Tanggal Selesai Tugas');
          return;
        }
        if (this.tugas.id_status.length == 0) {
          alert('Isi Status Pengerjaan Tugas');
          return;
        }
        if (this.tugas.id_kategori.length == 0) {
          alert('Isi Kategori Tugas');
          return;
        }
        if (this.tugas.id_karyawan.length == 0) {
          alert('Isi Penanggung Jawab Tugas');
          return;
        }
        if (this.tugas.id_milestone.length == 0) {
          alert('Isi Milestone Tugas');
          return;
        }

        let url = "/api/tugas";
        if (this.tugas.id_tugas > 0){
          url += `/${this.tugas.id_tugas}`
        };
        const data = await this.api.postResource(url, this.tugas, this.tugas.id_tugas > 0 ? 'PUT' : 'POST');
        this.isEditing = false;
        this.tugas = {id_tugas: 0, id_status: '', id_kategori: '', id_karyawan: '', id_milestone: '', nama_tugas: '', keterangan_tugas: '', tgl_mulai_tugas: '', tgl_selesai_tugas: ''}
        this.tugasList = await this.api.getResource('/api/tugas');
        } catch (err) {
          console.log(err);
        }
      },
      editTugas(i: number) {
        const ambilData = this.tugasList[i];
        this.tugas = ambilData;
        this.isEditing = true;
      },
      async hapusTugas(i: number) {
        const dataHapus = this.tugasList[i];
        this.tugas= dataHapus;
        let url = '/api/tugas' + '/' + this.tugas.id_tugas;
        const data = await this.api.deleteResource(url);
        this.tugasList = await this.api.getResource('/api/tugas');
      },
      kembali(){
        this.isEditing = false;
        this.tugas = {id_tugas: 0, id_status: '', id_kategori: '', id_karyawan: '', id_milestone: '', nama_tugas: '', keterangan_tugas: '', tgl_mulai_tugas: '', tgl_selesai_tugas: ''}
      }
  },
  async mounted(){
    this.tugasList = await this.api.getResource('/api/tugas')
    this.pilihMilestone = await this.api.getResource('/api/milestone');
    this.pilihKategori = await this.api.getResource('/api/kategori');
    this.pilihStatus = await this.api.getResource('/api/status');
    this.pilihKaryawan = await this.api.getResource('/api/karyawan');
  },
  components: {
    Parent, Child
  }
}
</script>
