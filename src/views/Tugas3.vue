<script setup lang="ts">
import Parent from './Parent.vue';
import Child from './Child.vue';
import usePagination from '../composables/pagination';
import { onMounted, ref, reactive } from 'vue';

const query = ref('');
const { loadData: loadMilestone, result: pilihMilestone } = usePagination('/api/milestone', 30, query);

const options = ref({
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
  }
});

const series = ref({
  name: 'series-1',
  data: [30, 40, 45, 50, 49, 60, 70, 91]
});

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
            <ul class="d-none d-md-inline-block mb-0">
              <li class="nav-item dropdown">
                <a class="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="ni ni-bell-55"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-xl  dropdown-menu-right  py-0 overflow-hidden">
                  <!-- Dropdown header -->
                  <div class="px-3 py-3">
                    <h6 class="text-sm text-muted m-0">You have <strong class="text-primary">13</strong> notifications.</h6>
                  </div>
                  <!-- List group -->
                  <div class="list-group list-group-flush">
                    <a href="#!" class="list-group-item list-group-item-action">
                      <div class="row align-items-center">
                        <div class="col-auto">
                          <!-- Avatar -->
                          <img alt="Image placeholder" src="../assets/img/theme/team-1.jpg" class="avatar rounded-circle">
                        </div>
                        <div class="col ml--2">
                          <div class="d-flex justify-content-between align-items-center">
                            <div>
                              <h4 class="mb-0 text-sm">John Snow</h4>
                            </div>
                            <div class="text-right text-muted">
                              <small>2 hrs ago</small>
                            </div>
                          </div>
                          <p class="text-sm mb-0">Let's meet at Starbucks at 11:30. Wdyt?</p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <!-- View all -->
                  <a href="#!" class="dropdown-item text-center text-primary font-weight-bold py-3">View all</a>
                </div>
              </li>
            </ul>
          </div>
          <div class="col-lg-6 col-5 text-right">
            
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
              <apexchart width="500" type="bar" :options="options" :series="series" />
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