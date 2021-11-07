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
                  <li class="breadcrumb-item"><a href="#">Home</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Home</li>
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
              <h3 class="mb-0">Ini Halaman Home!!</h3>
            </div>

            <!-- Isi Content View -->
            <div class="d-flex justify-content-center">
              <div class="p-2">Milestone 1</div>
              <div class="p-2">Milestone 2</div>
              <div class="p-2">Milestone 3</div>
            </div>

            <div class="mx-auto">
              <ul>
                <li>Merah = Pengerjaan 0%</li>
                <li>Kuning = Pengerjaan 50%</li>
                <li>Hijau = Pengerjaan 100%</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      <!-- End Isi View -->

      <!-- Footer -->
      <child/>
      <!-- End Footer -->
    </div>
    <!-- End Page Content -->
  </div>
  <!-- End Main Content -->
</template>

<script>
import Api from '../services/api'
import Parent from '../views/Parent.vue'
import Child from '../views/Child.vue'

export default {
  name: 'Home',
  data() {
    return{
      api: new Api
    }
  },

  components: {
    Parent, Child
  },

  async mounted(){
   const response = await this.api.getResource('/api/aktif')
  }
}
</script>

<style scoped>
.p-2 {
   background: violet;
   padding-bottom: 100%;
}

.col-md{
    margin-top: 10px;
}
</style>