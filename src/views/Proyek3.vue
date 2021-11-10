<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import usePagination from '../composables/pagination';
import Parent from './Parent.vue';
import Child from './Child.vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import Api from '../services/api';
import Pagination from '../components/pagination.vue';
import { showConfirmDialog } from '../services/helpers';

const query = ref('');
const api: Api = new Api();
const { 
  loadData: loadProyek, result: proyekList, pages: pageList,
  page: currentPage, isFirstPage, isLastPage, gotoPage,
  nextPage, prevPage
} = usePagination('/api/proyek', query);

/**
 * EDITING
 */
const isEditing = ref(false);
const idProyek = ref(0);

const { setValues, meta: metaForm, resetForm } = useForm({
  validationSchema: yup.object({
    nomor_proyek: yup.string().required().min(3).max(60),
    nama_proyek: yup.string().required().min(3).max(60),
    lokasi: yup.string().required().min(3).max(60),
    dinas: yup.string().required().min(3).max(60),
    thn_anggaran: yup.number().required().min(1970).max(4000),
    harga: yup.number().required().min(1),
    tgl_mulai_proyek: yup.string().required().min(10).max(10),
    tgl_selesai_proyek: yup.string().required().min(10).max(10),
  })
});
const { value: nomor_proyek } = useField('nomor_proyek');
const { value: nama_proyek } = useField('nama_proyek');
const { value: lokasi } = useField('lokasi');
const { value: dinas } = useField('dinas');
const { value: thn_anggaran } = useField('thn_anggaran');
const { value: harga } = useField('harga');
const { value: tgl_mulai_proyek } = useField('tgl_mulai_proyek');
const { value: tgl_selesai_proyek } = useField('tgl_selesai_proyek');

function editProyek(i?: number) {
  idProyek.value = 0;
  isEditing.value = true;
  // kalau sedang mengedit
  if (i !== undefined) {
    const item = proyekList.value[i];
    idProyek.value = item.id_proyek;
    setValues({ ...item });
  }
}
function kembali() {
  isEditing.value = false;
  resetForm();
}

async function simpanProyek() {
  let url = '/api/proyek';
  if (idProyek.value > 0) {
    url += `/${idProyek.value}`;
  }
  try {
    await api.postResource(url, { 
      nomor_proyek: nomor_proyek.value, nama_proyek: nama_proyek.value, lokasi: lokasi.value, 
      dinas: dinas.value, thn_anggaran: thn_anggaran.value, harga: harga.value, 
      tgl_mulai_proyek: tgl_mulai_proyek.value, tgl_selesai_proyek: tgl_selesai_proyek.value 
    }, idProyek.value > 0 ? 'PUT' : 'POST');
    isEditing.value = false;
    resetForm();
    loadProyek();
  } catch (err) {
    console.log(err);
  }
}
async function hapusProyek(i: number) {
  const y = await showConfirmDialog(`Data proyek akan dihapus permanen`);
  if (y) {
    try {
      await api.deleteResource(`/api/proyek/${proyekList.value[i].id_proyek}`);
      loadProyek();
    } catch (err) {
      console.log(err);
    }
  }
}

/**
 * MOUNTED, LOAD DATA PROYEK
 */
onMounted(() => loadProyek());

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
              <h6 class="h2 text-white d-inline-block mb-0">Proyek</h6>
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                  <li class="breadcrumb-item active" aria-current="page">Proyek</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Header -->

    <!-- Page content -->
    <div class="container-fluid mt--6" v-if="! isEditing">
      <!-- Isi View -->
      <div class="row">
        <div class="col">
          <div class="card">

          <!-- Card header -->
          <div class="row align-items-center py-1">
            <div class="col text-center">
              <h6 class="col h2 text-black d-inline-block mb-0">Data Proyek</h6>
            </div>
          </div>

          <div class="container">
            <div class="row align-items-center py-3">
              <div class="col-lg-6">
                <form class="form-inline ml-3">
                  <input class="form-control mr-sm-1" @keyup="loadProyek" v-model="query" type="search" placeholder="Cari..." aria-label="Search">
                </form>
              </div>
              <div class="col-lg-6 text-right">
                <a href="#" class="btn btn-primary mr-3" type="button" @click.prevent="editProyek()"> + Proyek </a>
              </div>
            </div>
          </div>
          
          <!-- End Card Header -->
          
          <!-- Light table -->
          <div class="table-responsive">
            <table class="table align-items-center table-flush">
              <thead class="thead-light">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col" class="text-center">Proyek</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody class="list" v-for="(proyek, i) in proyekList" :key="i">
                <tr>
                  <td scope="row align-top" class="col-md-1">{{ i+1 }}</td>
                  <td>
                    <div class="row">
                      <div class="col">
                        <h4 class="mb-1">{{ proyek.nama_proyek }} <span class="badge badge-info">{{ proyek.dinas }}</span> </h4>
                        <div class="d-flex justify-content-between">
                          <span title="nomor">{{ proyek.nomor_proyek }}</span>
                          <span>
                            <span class="badge badge-success fs-5 font-weight-bolder" title="tanggal mulai">{{ proyek.tgl_mulai_proyek.split('-').reverse().join('/') }}</span> - <span title="tanggal_selesai" class="badge badge-danger font-weight-bolder">{{ proyek.tgl_selesai_proyek.split('-').reverse().join('/') }}</span>
                          </span>
                        </div>
                        <div class="mt-2 d-flex justify-content-between">
                          <span title="tahun anggaran"><i class="fa fa-fw fa-calendar"></i> {{ proyek.thn_anggaran }}</span>
                          <span title="harga"><i class="fa fa-fw fa-cart-plus"></i> {{ proyek.harga }}</span>
                          <span title="lokasi"><i class="fa fa-fw fa-map-marker"></i> {{ proyek.lokasi }}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="col-2">
                    <button class="btn btn-primary" @click="editProyek(i)">Edit</button>
                    <button class="btn btn-danger" @click="hapusProyek(i)">Hapus</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Pagination Card footer -->
          <Pagination :current-page="currentPage" :is-first-page="isFirstPage" :is-last-page="isLastPage" :goto-page="gotoPage" :next-page="nextPage" :prev-page="prevPage" :page-list="pageList"></Pagination>

          <!-- End Pagination Card Footer -->
          </div>
        </div>
      </div>
      <!-- End Light Table -->
      <!-- Footer -->
      <Child></Child>
      <!-- End Footer -->
    </div>
    <!-- End Page Content -->

    <!-- Page Form Edit dan Tambah -->
    <div class="container-fluid mt--6" v-else>
      <!-- Isi View -->
      <div class="row">
        <div class="col">
            <div class="card">

            <!-- Card header -->
            <div class="row align-items-center py-4">
              <div class="col-lg-6">
                <h6 class="col-lg-6 h2 text-black d-inline-block mb-0">Form Data Proyek</h6>
              </div>
            </div>
            <!-- End Card Header -->
            
            <!-- Form Isi -->
            <form>
              <div class="pl-lg-3">
                <div class="row">
                  <div class="col-lg-5">
                    <div class="form-group">
                      <label class="form-control-label" for="nomor_proyek">Nomor</label>
                      <input type="text" id="nomor_proyek" v-model="nomor_proyek" class="form-control" placeholder="Masukkan Nomor Proyek"> 
                    </div>
                  </div>
                  <div class="col-lg-3">
                  </div>
                  <div class="col-lg-3">
                    <div class="form-group">
                      <label class="form-control-label" for="lokasi">Lokasi</label>
                      <input type="text" id="lokasi" v-model="lokasi" class="form-control" placeholder="Masukkan Lokasi Proyek">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-8">
                    <div class="form-group">
                      <label class="form-control-label" for="nama_proyek">Nama</label>
                      <input type="text" id="nama_proyek" v-model="nama_proyek" class="form-control" placeholder="Masukkan Nama Proyek">
                    </div>
                  </div>
                  <div class="col-lg-2">
                    <div class="form-group">
                      <label class="form-control-label" for="thn_anggaran">Tahun Anggaran</label>
                      <input type="number" id="thn_anggaran" v-model="thn_anggaran" class="form-control" placeholder="Tahun Anggaran Proyek">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-7">
                    <div class="form-group">
                      <label class="form-control-label" for="dinas">Dinas</label>
                      <input type="text" id="dinas" v-model="dinas" class="form-control" placeholder="Masukkan Dinas Proyek">
                    </div>
                  </div>
                  <div class="col-lg-1">
                  </div>
                  <div class="col-lg-3">
                    <div class="form-group">
                      <label class="form-control-label" for="harga">Harga</label>
                      <input type="text" id="harga" v-model="harga" class="form-control" placeholder="Masukkan Harga Proyek">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-3">
                    <div class="form-group">
                      <label class="form-control-label" for="tgl_mulai_proyek">Tanggal Mulai</label>
                      <input type="date" id="tgl_mulai_proyek" v-model="tgl_mulai_proyek" class="form-control">
                    </div>
                  </div>
                  <div class="col-lg-5">
                  </div>
                  <div class="col-lg-3">
                    <div class="form-group">
                      <label class="form-control-label" for="tgl_selesai_proyek">Tanggal Selesai</label>
                      <input type="date" id="tgl_selesai_proyek" v-model="tgl_selesai_proyek" class="form-control">
                    </div>
                  </div>
                </div>
              </div>


                <div class="row align-items-center py-4">
                  <div class="col-lg-6">
                  
                  </div>
                  <div class="col-lg-11 text-right">
                    <a href="" class="btn btn-success" :class="{ disabled: ! metaForm.valid }" @click="simpanProyek()" :disabled=" ! metaForm.valid">SIMPAN DATA</a>
                    <a href="" class="btn btn-primary" @click.prevent="kembali()">KEMBALI</a>
                  </div>
                </div>
            </form>
            <!-- End Form Isi -->
          </div>
        </div>

      </div>
      <!-- End Content Table -->
      <!-- Footer -->
      <!-- <Child></Child> -->
      <!-- End Footer -->
    </div>
    <!-- End Page Form Edit dan Tambah -->

  </div>
  
</template>

<style scoped>
.badge {
  font-size: .7rem !important;
}
</style>