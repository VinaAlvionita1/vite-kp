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
                  <select class="form-control" id="id_milestone" v-model="query" change="loadMilestone">
                    <option disabled value="">Pilih Milestone</option>
                    <option v-for="(milestone, i) in pilihMilestone" :key="i" :value="milestone.id_milestone"> {{ milestone.nama_milestone }} </option>
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
            <div id="chart">
              <apexchart v-if="ganchart.length > 0" type="rangeBar" height="350" :options="data.chartOptions" :series="ganchart"></apexchart>
            </div>
          </div>
      </div>
    </div>
  </div>
  <!-- End Page Content -->
  </div>
  <!-- End Main Content -->

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Parent from '../views/Parent.vue';
import Child from '../views/Child.vue'
import Api from '../services/api';

export default defineComponent({
  data(){
    return{
      api: new Api,
      isTable: false,
      query: '',
      pilihMilestone: [] as { id_milestone: number, nama_milestone: string }[],
      milestone: '',
      ganchart: [],
      gant: '',
      data: {
          series: [
            {
              data: []
              // data: [
              //   {
              //     x: 'Test',
              //     y: [
              //       new Date('2019-03-04').getTime(),
              //       new Date('2019-03-08').getTime()
              //     ]
              //   },
              //   {
              //     x: 'Validation',
              //     y: [
              //       new Date('2019-03-08').getTime(),
              //       new Date('2019-03-12').getTime()
              //     ]
              //   },
              //   {
              //     x: 'Deployment',
              //     y: [
              //       new Date('2019-03-12').getTime(),
              //       new Date('2020-04-18').getTime()
              //     ]
              //   }
              // ]
            }
          ],
          chartOptions: {
            chart: {
              height: 200,
              width: 100,
              type: 'rangeBar'
            },
            plotOptions: {
              bar: {
                horizontal: true
              }
            },
            xaxis: {
              type: 'datetime'
            }
          },
          
          
        },
        
      }
  },
  async mounted(){
    const r = await this.api.getResource('/api/milestone', { limit: 30, page: 1} );
    this.pilihMilestone = r.data;
    const g = await this.api.getResource('/api/gantchart');
    // this.ganchart = g[0].task.map((v: any) => {
    //   return {
    //     x: v.nama_tugas,
    //     y: [
    //       new Date(v.tgl_mulai_tugas).getTime(),
    //       new Date(v.tgl_mulai_tugas).getTime(),
    //     ]
    //   };
    // })
  },
  components: {
      Parent, Child
  }
})
</script>
