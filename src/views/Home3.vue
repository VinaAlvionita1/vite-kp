<script setup lang="ts">
import Parent from './Parent.vue';
import Child from './Child.vue';
import Api from '../services/api';
import { onMounted, ref, watch } from 'vue';

const api: Api = new Api();
const proyekList = ref<any[]>([]);
const query = ref('');

const milestoneList = ref<any[]>([]);

async function loadMilestone() {
  const d = await api.getResource('/api/milestone', { limit: 30, page: 1, query: query.value });
  milestoneList.value = d.data;
};
onMounted(async () => {
  const data = await api.getResource('/api/proyek', { limit: 30, page: 1 });
  proyekList.value = data.data;
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
                <option v-for="proyek in proyekList" :key="proyek.id_proyek" :value="proyek.id_proyek"> {{ proyek.nama_proyek }} </option>
              </select>
            </div>
          </form>
          <div class="card-header border-0">
            <h3 class="mb-0 align-items-center">Data Milestone</h3>
          </div>
          <div v-for="milestone in milestoneList">
            <div class="d-flex justify-content-center">
              <div class="p-2">{{ milestone.nama_milestone }}</div>
            </div>
            <!-- <div class="d-flex justify-content-center">
              <div class="p-2">milestone 1</div>
              <div class="p-2">milestone 2</div>
            </div> -->
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