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
              <h6 class="h2 text-white d-inline-block mb-0">Home</h6>
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                  <li class="breadcrumb-item"><a href="#">Tugas</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Milestone</li>
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
                <h6 class="col h2 text-black d-inline-block mb-0">Data Milestone</h6>
              </div>
            </div>

            <div class="container">
              <div class="row align-items-center py-3">
                <div class="col-lg-6">
                  <form class="form-inline"  @submit.prevent="searchMilestone()">
                    <input class="form-control mr-sm-1" v-model="query" type="search" placeholder="Cari..." aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Cari</button>
                  </form>
                </div>
                <div class="col-lg-6 text-right">
                  <a href="#" class="btn btn-primary" type="button" @click="isEditing = true"> + Milestone </a>
                  <span>
                    <router-link to="/tugas-data" class="btn btn-warning" type="button">Tugas</router-link>
                  </span>
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
                    <th scope="col">Nama Milestone</th>
                    <th scope="col">Nama Proyek</th>
                    <th scope="col">Aksi</th>
                  </tr>
                </thead>
                <tbody class="list" v-for="(milestone, i) in milestoneList" :key="i">
                  <tr>
                    <th scope="row">{{ i+1 }}</th>
                    <td scope="row">{{ milestone.nama_milestone }}</td>
                    <td scope="row">{{ milestone.nama_proyek }}</td>
                    <td>
                    <button class="btn btn-primary" @click="editKaryawan(i)">Edit</button>
                    <button class="btn btn-danger" @click="hapusKaryawan(i)">Hapus</button>
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
      <!-- End Isi View -->

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
                  <h6 class="col-lg-6 h2 text-black d-inline-block mb-0">Form Data Milestone</h6>
                </div>
              </div>
              <!-- End Card Header -->
              
              <!-- Form Isi -->
              <form>
                <div class="pl-lg-3">
                  <div class="row">
                    <div class="col-lg-5">
                      <div class="form-group">
                        <label class="form-control-label" for="nama_milestone">Nama Milestone</label>
                        <input type="text" id="nama_milestone" v-model="milestone.nama_milestone" class="form-control" placeholder="Masukkan Nama Milestone">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-8">
                       <div class="form-group">
                        <label class="form-control-label" for="input-first-name">Proyek</label>
                        <select class="form-control" id="id_proyek">
                          <option disabled value="" selected="selected">Pilih Proyek</option>
                          <option v-for="proyek in pilihProyek" :key="proyek.id_proyek" :value="proyek.id_proyek"> {{ proyek.nama_proyek }}</option>
                        </select>
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

<script>
import Api from '../services/api'
import Parent from './Parent.vue'
import Child from './Child.vue'

export default {
  name: 'Milestone',
  data() {
    return{
      api: new Api,
      milestone: {id_milestone: 0, nama_milestone: '', id_proyek: ''},
      milestoneList: [],
      query: '',
      isEditing: false,
      pilihProyek: {},
      proyek: ''
    }
  },
  methods:{
    kembali(){
      this.isEditing = false
    }
  },
  components: {
    Parent, Child
  },
  async mounted(){
    this.milestoneList = await this.api.getResource('/api/milestone');
    this.pilihProyek = await this.api.getResource('/api/proyek');
  }
}
</script>