<script setup lang="ts">
import Parent from './Parent.vue';
import Child from './Child.vue';
import Api from '../services/api';
import usePagination from '../composables/pagination';
import { computed, onMounted, ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { showConfirmDialog } from '../services/helpers';
import Pagination from '../components/pagination.vue';

  const query = ref<any>();
  const api: Api = new Api();
  const angka = ref<number[]>([5, 10, 15, 20]);
  const limit = ref(2);
  const tugasList = ref<any[]>([]);

  // computed(async () => {
  //   tugasList.value = [];
  //   const d = await api.getResource('/api/tugas', { limit: 30, page: 1, query: query.value });
  //   tugasList.value = d;
  // });

  async function detailTugas(i?: number){
    if (i !== undefined) {
      const item = tugasList.value[i];
      const a = await api.getResource('/api/tugas', { limit: 30, page: 1, query: item.nama_tugas});
      tugasList.value = a;
    }
  }

  const notifList = ref<any[]>([]);
  async function loadNotif(){
    notifList.value = [];
    const d = await api.getResource('/api/notif');
    notifList.value = d;
  }

  onMounted(async () => {
    loadNotif();
    tugasList.value = await api.getResource('/api/tugas', { limit: 30, page: 1, query: query.value });
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
            <div class="col-lg-5 dropdown text-right">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="ni ni-bell-55"></i>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <b class="dropdown-item" type="button" v-for="notif in notifList"> 
                <span>
                  <router-link to="/tugas-data" class="btn btn-warning" type="button">Atur Milestone</router-link>
                </span>
                {{ notif.pesan }} 
                </b>
                <br>
              </div>
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
          <div class="row align-items-center py-1">
            <div class="col text-center">
              <h6 class="col h2 text-black d-inline-block mb-0">Data Tugas</h6>
            </div>
          </div>
          <!-- End Card Header -->

          <div class="container">
            <div class="row align-items-center py-3 ml-2">
              <div class="col-lg-11 mt-2 text-right">
                <router-link to="/tugas-data" class="btn btn-primary" type="button">Tugas</router-link>
              </div>
            </div>
          </div>
                
          <!-- Light table -->
          <div class="table-responsive mt-3">
            <table class="table align-items-center table-flush">
              <thead class="thead-light">
                  <tr>
                      <th scope="col">No</th>
                      <th scope="col">Tugas</th>
                  </tr>
              </thead>
              <tbody class="list" v-for="(tugas, i) in tugasList" :key="i">
                <tr>
                  <th scope="row">{{ i+1 }}</th>
                  <td scope="row">
                    <div class="row">
                      <div class="col">
                        <span>
                          <span class="badge badge-info">{{ tugas.nama_statuskerja }}</span>
                          <span class="badge badge-warning mr-3">{{ tugas.status_kategori }} </span>
                          <span class="badge badge-success fs-5 font-weight-bolder" title="tanggal mulai">{{ tugas.tgl_mulai_tugas.split('-').reverse().join('/') }}</span> - <span title="tanggal_selesai" class="badge badge-danger font-weight-bolder mr-3">{{ tugas.tgl_selesai_tugas.split('-').reverse().join('/') }}</span>
                          <i class="fas fa-user mr-3">{{ tugas.nama_karyawan }}</i> 
                        </span>
                        <h4 class="mr-3">{{ tugas.nama_tugas }}</h4> 
                        <h5>{{ tugas.keterangan_tugas }}</h5>
                        <p>{{ tugas.nama_milestone }}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </div>
    <!-- End Light Table -->
    <!-- Footer -->
    <Child/>
    <!-- End Footer -->
  </div>
  <!-- End Page Content -->

  </div>
  <!-- End Main Content -->
</template>