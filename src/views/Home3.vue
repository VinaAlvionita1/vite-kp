<script setup lang="ts">
import Parent from './Parent.vue';
import Child from './Child.vue';
import Api from '../services/api';
import { onMounted, ref, watch } from 'vue';
import usePagination from '../composables/pagination';
import router from '../router';

const api: Api = new Api();
const notif = ref('');
const query = ref('');
const index = ref(0);

const milestoneList = ref<any[]>([]);
const notifList = ref<any[]>([]);
const tugasList = ref<any[]>([]);

// const { loadData: loadNotif, result: notifList } = usePagination('/api/notif', 100, query);
const { loadData: loadProyek, result: pilihProyek } = usePagination('/api/proyek', 30, query);

async function loadNotif(){
  notifList.value = [];
  const d = await api.getResource('/api/notif');
  notifList.value = d;
}

async function detailTugas(i?: number){
  if (i !== undefined) {
    const item = notifList.value[i];
    router.replace('/detail-notif');
    const a = await api.getResource('/api/tugas', { limit: 30, page: 1, query: item.nama_tugas});
  }
}

async function loadMilestone() {
  milestoneList.value = [];
  if(query.value){
    const d = await api.getResource('/api/tugasGrafik', { limit: 30, page: 1, query: query.value });
    milestoneList.value = d;
  }
  // console.log(milestoneList.value);
};
onMounted(async () => {
  loadMilestone();
  loadProyek();
  loadNotif();
});

</script>

<template>
  <Parent></Parent>

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
            <div class="col-lg-5 dropdown text-right">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="ni ni-bell-55"></i>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <b class="dropdown-item" type="button" v-for="(notif, i) in notifList" :key="i"> 
                <span>
                  <button class="btn btn-primary" type="button" @click="detailTugas(i)"> Detail </button>
                </span>
                {{ notif.pesan }} 
                </b><br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Header -->

    <div class="container-fluid mt--6">
      <div class="col">
        <div class="card">
          <div class="row align-items-center py-1">
            <div class="col text-center">
              <a class="navbar-brand mt-6" href="javascript:void(0)">
                <img src="logo.png" class="navbar-brand-img" width="200" height="100" >
              </a>
              <h2 class="mt-4 mb-6">Aplikasi Sistem Penjadwalan Proyek</h2>
            </div>
          </div>
        </div>
      </div>
      <Child></Child>
      <!-- End Footer -->
    </div>
    <!-- End Page Content -->
  </div>
  <!-- End Main Content -->
</template>

<style scoped>
.p2{
  text-decoration-color: white;
  background-color: red;
}
.p3{
  text-decoration-color: white;
  background-color: green;
}
.p4{
  text-decoration-color: white;
  background-color: yellow;
}
</style>