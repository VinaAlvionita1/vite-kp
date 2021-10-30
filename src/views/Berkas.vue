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
                  <li class="breadcrumb-item active" aria-current="page">Berkas</li>
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
                    <h6 class="col h2 text-black d-inline-block mb-0">Data Berkas</h6>
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
                      <li class="nav-item ">
                        <router-link to="/tugas-data" class="nav-link">
                          <span class="nav-link-text">Data Tugas</span>
                        </router-link>
                      </li>
                      <li class="nav-item active">
                        <router-link to="/tugas-berkas" class="nav-link">
                          <span class="nav-link-text">Berkas</span>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </nav>
                <!-- End Navbar -->
                
                <div class="col-lg-11 mt-2 text-right">
                  <a href="#" class="btn btn-primary" type="button" @click="isEditing = true"> + Berkas </a>
                </div>

                <!-- Light table -->
                <div class="table-responsive mt-3">
                    <table class="table align-items-center table-flush">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Nama Berkas</th>
                                <th scope="col">File</th>
                                <th scope="col">Keterangan</th>
                                <th scope="col">Milestone</th>
                                <th scope="col">Tanggal Upload</th>
                                <th scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="list">
                          <tr v-for="(berkas, i) in berkasList" :key="i">
                            <th scope="row">{{ i+1 }}</th>
                            <td scope="row">{{ berkas.nama_berkas }}</td>
                            <td scope="row">{{ berkas.file }}</td>
                            <td scope="row">{{ berkas.keterangan }}</td>
                            <td scope="row">{{ berkas.nama_milestone }}</td>
                            <td scope="row">{{ berkas.tgl_upload }}</td>
                            <td>
                              <button class="btn btn-primary" @click="editBerkas(i)">Edit</button>
                              <button class="btn btn-danger" @click="hapusBerkas(i)">Hapus</button>
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
                  <h6 class="col-lg-6 h2 text-black d-inline-block mb-0">Form Data Berkas</h6>
                </div>
              </div>
              <!-- End Card Header -->
              
              <!-- Form Isi -->
              <form enctype="multipart/form-data">
                <div class="pl-lg-3">
                  <div class="row">
                    <div class="col-lg-5">
                      <div class="form-group">
                        <label class="form-control-label" for="nama_berkas">Nama Berkas</label>
                        <input type="text" id="nama_berkas" v-model="berkas.nama_berkas" class="form-control" placeholder="Masukkan Nama Berkas"> 
                      </div>
                    </div>
                    <div class="col-lg-1"></div>
                    <div class="col-lg-5">
                      <div class="form-group">
                        <label class="form-control-label" for="file">File</label>
                        <input type="file" id="file" @change="pilih_file($event)" class="form-control" placeholder="Masukkan Nama Berkas"> 
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-3">
                      <div class="form-group">
                        <label class="form-control-label" for="id_milestone">Milestone</label>
                        <select class="form-control" id="id_milestone" v-model="berkas.id_milestone">
                          <option disabled value="" selected="selected">Pilih Milestone</option>
                          <option v-for="milestone in pilihMilestone" :key="milestone.id_milestone" :value="milestone.id_milestone"> {{ milestone.nama_milestone }} </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-lg-3"></div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="keterangan">Keterangan</label>
                        <textarea id="keterangan" v-model="berkas.keterangan" class="form-control" placeholder="Masukkan Ketengangan"/>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-3">
                      <div class="form-group">
                        <label class="form-control-label" for="tgl_upload">Tanggal Upload</label>
                        <input type="date" id="tgl_upload" v-model="berkas.tgl_upload" class="form-control">
                      </div>
                    </div>
                  </div>
                </div>


                  <div class="row align-items-center py-4">
                    <div class="col-lg-6">
                    
                    </div>
                    <div class="col-lg-11 text-right">
                      <a class="btn btn-success" @click="simpan()">SIMPAN</a>
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
import Parent from './Parent.vue'
import Child from './Child.vue'
import Api from '../services/api'

export default {
  data(){
    return{
      api: new Api,
      berkas: {id_berkas: 0, id_milestone: '', nama_berkas: '', file: '', keterangan: '', tgl_upload: ''},
      berkasList: [],
      isEditing: false,
      pilihMilestone: {},
      milestone: '',
      file: ''
    }
  },
  methods:{
    pilih_file(event : any){
      this.berkas.file = event.target.files[0];
      const fd = new FormData();
      for (const event in this.berkas){
        if(Object.prototype.hasOwnProperty.call(this.berkas, event)){
          fd.append(event, this.berkas[event]);
        }
      }
    },
    async simpan() {
      try {
      if (this.berkas.nama_berkas.length == 0) {
        alert('Isi Nama Berkas');
        return;
      }
      if (this.berkas.id_milestone.length == 0) {
        alert('Isi Milestone pada Berkas');
        return;
      }
      if (this.berkas.file.length == 0) {
        alert('Isi File Berkas');
        return;
      }
      if (this.berkas.keterangan.length == 0) {
        alert('Isi Keterangan Berkas');
        return;
      }
      if (this.berkas.tgl_upload.length == 0) {
        alert('Isi Tanggal Upload Berkas');
        return;
      }
      let url = "/api/berkas";
      if (this.berkas.id_berkas > 0){
        url += `/${this.berkas.id_berkas}`
      };
      const data = await this.api.postResource(url, this.berkas, this.berkas.id_berkas > 0 ? 'PUT' : 'POST');
      this.isEditing = false;
      this.berkas =  {id_berkas: 0, id_milestone: '', nama_berkas: '', file: '', keterangan: '', tgl_upload: ''}
      this.berkasList = await this.api.getResource('/api/berkas');
      } catch (err) {
        console.log(err);
      }
    },
    editBerkas(i: number) {
      const ambilData = this.berkasList[i];
      this.berkas = ambilData;
      this.isEditing = true;
    },
    async hapusBerkas(i: number) {
      const dataHapus = this.berkasList[i];
      this.berkas = dataHapus;
      let url = '/api/berkas' + '/' + this.berkas.id_berkas;
      const data = await this.api.deleteResource(url);
      this.berkasList = await this.api.getResource('/api/berkas');
    },
    kembali(){
      this.isEditing = false;
    },
  },
  async mounted(){
    this.berkasList = await this.api.getResource('/api/berkas');
    this.pilihMilestone = await this.api.getResource('/api/milestone');
  },
  components: {
    Parent, Child
  }
}
</script>