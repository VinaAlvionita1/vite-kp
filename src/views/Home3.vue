<script setup lang="ts">
import Parent from './Parent.vue';
import Child from './Child.vue';
import Api from '../services/api';
import { onMounted, ref, watch } from 'vue';
import usePagination from '../composables/pagination';

const api: Api = new Api();
const pesan = ref('');
const query = ref('');
const index = ref(0);

const milestoneList = ref<any[]>([]);

const { loadData: loadNotif, result: notifList } = usePagination('/api/notif', 100, query);
const { loadData: loadProyek, result: pilihProyek } = usePagination('/api/proyek', 30, query);

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
            <div class="col-lg-4 dropdown text-right">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="ni ni-bell-55"></i>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <b>Saya Vio</b><br>
                <b class="dropdown-item" type="button" v-for="notif in notifList"> {{ notif.pesan }} </b><br>
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
          <form class="col-lg-12">
            <div class="col-lg-3">
              <select class="form-control" id="id_milestone" v-model="query" @change="loadMilestone">
                <option value="">Pilih Proyek</option>
                <option v-for="proyek in pilihProyek" :key="proyek.id_proyek" :value="proyek.id_proyek"> {{ proyek.nama_proyek }} </option>
              </select>
            </div>
          </form>
          <div class="card-header border-0">
            <h3 class="mb-0 align-items-center">Data Milestone</h3>
          </div>
          <div v-for="milestone in milestoneList">
            <div class="">
              <div class="bg-danger text-white" v-if="milestone.status == 1">{{ milestone.nama_milestone }}</div>
            </div>
            <div class="">
              <div class="bg-warning text-white" v-if="milestone.status == 2">{{ milestone.nama_milestone }}</div>
            </div>
            <div class="">
              <div class="bg-success text-white" v-if="milestone.status == 3">{{ milestone.nama_milestone }}</div>
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