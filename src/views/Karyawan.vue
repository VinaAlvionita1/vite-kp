<template>
  <parent/>

  <!-- Main content -->
  <div class="main-content" id="panel">
    <!-- Header -->
    <!-- Header -->
    <div class="header bg-primary pb-6">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white d-inline-block mb-0">Karyawan</h6>
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                  <li class="breadcrumb-item"><a href="#">Karyawan</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Karyawan</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Header -->

    <!-- Page content -->
    <div class="container-fluid mt--6">
        <!-- Isi View -->
        <div class="row">
            <div class="col">
                <div class="card">

                <!-- Card header -->
                <div class="card-header border-0">
                <h3 class="mb-0">Data Karyawan</h3>
                </div>
                <!-- End Card Header -->
                
                <!-- Light table -->
                <div class="table-responsive">
                    <table class="table align-items-center table-flush">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Nama Karyawan</th>
                                <th scope="col">Telephone</th>
                                <th scope="col">Email</th>
                                <th scope="col">Jabatan</th>
                                <th scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="list">
                            <tr>
                            <th scope="row">1</th>
                            <td scope="row">Firmansyah</td>
                            <td scope="row">082736258190</td>
                            <td scope="row">Firmansyah123@gmail.com</td>
                            <td scope="row">Pekerja Lapangan</td>
                            <td>
                            <button class="btn btn-primary">Edit</button>
                            <button class="btn btn-danger">Hapus</button>
                            </td>
                        </tr>
                        </tbody>
              </table>
            </div>
            <!-- Card footer -->
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
            <!-- End Card Footer -->
          </div>
        </div>
      </div>
      <!-- End Light Table -->
      <!-- Footer -->
      <footer class="footer pt-0">
        <div class="row align-items-center justify-content-lg-between">
          <div class="col-lg-6">
            <div class="copyright text-center  text-lg-left  text-muted">
              CV.FIRMAN SYAH &copy; 2021 
            </div>
          </div>
        </div>
      </footer>
      <!-- End Footer -->
    </div>
    <!-- End Page Content -->
  </div>
  <!-- End Main Content -->
</template>

<script>
import Parent from '../views/Parent.vue';
import Footer from '../views/Footer.vue'

export default {
    components: {
      Parent,
      Footer
    }
}
</script>