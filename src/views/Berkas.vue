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
                      <select class="form-control">
                        <option selected>Pilih Milestone</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
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
                                <th scope="col">Keterangan</th>
                                <th scope="col">Milestone</th>
                                <th scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="list">
                          <tr>
                            
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
                  <h6 class="col-lg-6 h2 text-black d-inline-block mb-0">Form Data Karyawan</h6>
                </div>
              </div>
              <!-- End Card Header -->
              
              <!-- Form Isi -->
              <form>
                <div class="pl-lg-3">
                  <div class="row">
                    <div class="col-lg-5">
                      <div class="form-group">
                        <label class="form-control-label" for="nomor_proyek">Nama Berkas</label>
                        <input type="text" id="nomor_proyek" class="form-control" placeholder="Masukkan Nama Berkas"> 
                      </div>
                    </div>
                    <div class="col-lg-2"></div>
                    <div class="col-lg-3">
                      <div class="form-group">
                        <label class="form-control-label" for="milestone">Milestone</label>
                        <select class="form-control" id="milestone">
                          <option disabled value="" selected="selected">Pilih Milestone</option>
                          <option> Milestone 1 </option>
                          <option> Milestone 1 </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="keterangan">Keterangan</label>
                        <textarea id="keterangan" class="form-control" placeholder="Masukkan Ketengangan"/>
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
import Parent from './Parent.vue'
import Child from './Child.vue'

export default {
  data(){
    return{
      isEditing: false
    }
  },
  methods:{
    kembali(){
      this.isEditing = false;
    }
  },
  components: {
    Parent, Child
  }
}
</script>