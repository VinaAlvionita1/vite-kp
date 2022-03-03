<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import usePagination from '../composables/pagination';
import Parent from './Parent.vue';
import Child from './Child.vue';
import swal from 'sweetalert';
import Api from '../services/api';


const api: Api = new Api();
const cari = ref('');
const query = ref('');
const total = ref(0);

const notifList = ref<any[]>([]);
async function loadNotif(){
  notifList.value = [];
  const d = await api.getResource('/api/notif');
  notifList.value = d;
}

const { loadData: loadKaryawan, result: pilihKaryawan } = usePagination('/api/karyawan', 30, query);


const Tahun = ref<string[]>(["2018","2019","2020","2021","2022","2023","2024","2025"]);

const pilihProyek = ref<any[]>([]);
async function pilihTahun(){
  pilihProyek.value = [];
  const d = await api.getResource('/api/rekap', {cari: cari.value});
  pilihProyek.value = d;

  total.value = pilihProyek.value.reduce((val, element)=>{
    return val + element.harga;
  },0);
  console.log(total);
}

/**
 * MOUNTED, LOAD DATA PROYEK
 */
onMounted(async () => {
  total.value;
  loadKaryawan();
});
  
</script>

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
                  <li class="breadcrumb-item"><a href="#">Rekap</a></li>
                </ol>
              </nav>
            </div>
            <div class="col-lg-5 dropdown text-right">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="ni ni-bell-55"></i>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <b class="dropdown-item" type="button" v-for="notif in notifList"> {{ notif.pesan }} </b><br>
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

            <div class="row align-items-center py-1">
              <div class="col text-center">
                <h6 class="col h2 text-black d-inline-block mb-3">Rekap Data Proyek</h6>
              </div>
            </div>
            <div class="container">
              <div class="row align-items-center py-3">
                <div class="col-lg-3">
                  <select class="form-control" id="id_proyek" v-model="cari" @change="pilihTahun()">
                    <option disabled value="">Pilih Tahun</option>
                    <option v-for="proyek in Tahun"> {{ proyek }} </option>
                  </select>
                </div>
                <div class="col-lg-3">
                  <select class="form-control" id="id_proyek" v-model="query" @change="pilihTahun()">
                    <option disabled value="">Pilih Penanggung Jawab</option>
                    <option v-for="karyawan in pilihKaryawan"> {{ karyawan.nama_karyawan }} </option>
                  </select>
                </div>
              </div>
            </div>    
            <!-- End Card Header -->

            <div class="table-responsive">
            <table class="table align-items-center table-flush">
              <thead class="thead-light">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col" class="text-center">Proyek</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody class="list" v-for="(proyek, i) in pilihProyek" :key="i">
                <tr>
                  <td scope="row align-top" class="col-md-1">{{ i+1 }}</td>
                  <td>
                    <div class="row">
                      <div class="col">
                        <span class="badge badge-info">{{ proyek.dinas }}</span>
                        <p title="nomor" class="mb-0">{{ proyek.nomor_proyek }}</p>
                        <div class="">
                          <h4 class="mb-1">{{ proyek.nama_proyek }}</h4>
                          <span>
                            <span class="badge badge-success fs-5 font-weight-bolder" title="tanggal mulai">{{ proyek.tgl_mulai_proyek.split('-').reverse().join('/') }}</span> - <span title="tanggal_selesai" class="badge badge-danger font-weight-bolder">{{ proyek.tgl_selesai_proyek.split('-').reverse().join('/') }}</span>
                          </span>
                        </div>
                        <div class="mt-2 d-flex justify-content-between">
                          <span title="tahun anggaran"><i class="fa fa-fw fa-calendar"></i> {{ proyek.thn_anggaran }}</span>
                          <span title="harga"><i class="fa fa-fw fa-cart-plus"></i> {{ parseFloat(proyek.harga).toLocaleString('id') }}</span>
                          <span title="lokasi"><i class="fa fa-fw fa-map-marker"></i> {{ proyek.lokasi }}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="col-2">
                    <button class="btn btn-primary">Detail</button>
                  </td>
                </tr>
              </tbody>
              <tr>
                <th></th>
                <th>Total Uang Masuk Pada Tahun {{ cari }} = Rp. {{ total.toLocaleString('id') }}</th>
              </tr>
            </table>
          </div>

          </div>
      </div>
    </div>
  </div>
  <!-- End Page Content -->
  </div>
  <!-- End Main Content -->

</template>