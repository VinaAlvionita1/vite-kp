<script setup lang="ts">
import Parent from './Parent.vue';
import Child from './Child.vue';
import usePagination from '../composables/pagination';
import { onMounted } from 'vue';

const { loadData: loadMilestone, result: pilihMilestone } = usePagination('/api/milestone');

onMounted(async()=>{
 loadMilestone();
});
</script>

<template>
  <Parent/>

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
   <div class="container-fluid mt--6">
    <!-- Isi View -->
    <div class="row">
      <div class="col">
          <div class="card">

            <div class="row align-items-center py-1">
              <div class="col text-center">
                <h6 class="col h2 text-black d-inline-block mb-0">Tugas</h6>
              </div>
            </div>

            <div class="container">
              <div class="row align-items-center py-3">
                <div class="col-lg-3">
                  <select class="form-control" id="id_milestone">
                    <option value="">Pilih Milestone</option>
                    <option v-for="milestone in pilihMilestone" :key="milestone.id_milestone" :value="milestone.id_milestone"> {{ milestone.nama_milestone }} </option>
                  </select>
                </div>
              </div>
            </div>
                
            <!-- End Card Header -->
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item">
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
            <div class="mx-auto">
              <!-- <apexchart width="500" type="bar" :options="options" :series="series" /> -->
            </div>
          </div>
      </div>
    </div>
    <Child/>
  </div>
  <!-- End Page Content -->
  </div>
  <!-- End Main Content -->

</template>