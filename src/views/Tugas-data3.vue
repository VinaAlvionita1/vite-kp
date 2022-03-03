<script setup lang="ts">
import Parent from './Parent.vue';
import Child from './Child.vue';
import Api from '../services/api';
import usePagination from '../composables/pagination';
import { onMounted, ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { showConfirmDialog } from '../services/helpers';
import Pagination from '../components/pagination.vue';

  const query = ref<number>();
  const api: Api = new Api();
  const angka = ref<number[]>([5, 10, 15, 20]);
  const limit = ref(2);
  const { loadData: loadTugas, result: tugasList, pages: pageList,
  page: currentPage, isFirstPage, isLastPage, gotoPage,
  nextPage, prevPage, changeLimit } = usePagination('/api/tugas', limit.value, query);

  const { loadData: loadMilestone, result: pilihMilestone } = usePagination('/api/milestone', 30, query);
  const { loadData: loadKaryawan, result: pilihKaryawan } = usePagination('/api/karyawan', 30, query);

  const pilihKategori = ref<any[]>([]);
  const pilihStatus = ref<any[]>([]);

  const isEditing = ref(false);
  const idTugas = ref(0);
  const { setValues, meta: metaForm, resetForm } = useForm({
    validationSchema: yup.object({
      nama_tugas: yup.string().required().min(3).max(80),
      keterangan_tugas: yup.string().required().min(4).max(2550),
      tgl_mulai_tugas: yup.string().required().min(10).max(10),
      tgl_selesai_tugas: yup.string().required().min(10).max(10),
      id_milestone: yup.string().required().min(1).max(3),
      id_kategori: yup.string().required().min(1).max(3),
      id_status: yup.string().required().min(1).max(3),
      id_karyawan: yup.string().required().min(1).max(3),
    })
   });

  const { value: nama_tugas } = useField('nama_tugas');
  const { value: keterangan_tugas } = useField<string>('keterangan_tugas');
  const { value: tgl_mulai_tugas } = useField('tgl_mulai_tugas');
  const { value: tgl_selesai_tugas } = useField('tgl_selesai_tugas');
  const { value: id_milestone } = useField<string>('id_milestone');
  const { value: id_kategori } = useField<string>('id_kategori');
  const { value: id_status } = useField<string>('id_status');
  const { value: id_karyawan } = useField<string>('id_karyawan');

  async function showEntri(){
    changeLimit(limit.value);
    loadTugas();
  }

  function editTugas(i?: number) {
  idTugas.value = 0;
  isEditing.value = true;
  setValues({nama_tugas: '', keterangan_tugas: '', tgl_mulai_tugas: '', tgl_selesai_tugas: '', id_milestone: '', id_kategori: '', id_status: '', id_karyawan: ''});
    // kalau sedang mengedit
    if (i !== undefined) {
      const item = tugasList.value[i];
      idTugas.value = item.id_tugas;
      setValues({
      nama_tugas: item.nama_tugas, keterangan_tugas: item.keterangan_tugas, tgl_mulai_tugas: item.tgl_mulai_tugas, tgl_selesai_tugas: item.tgl_selesai_tugas, id_milestone: `${item.id_milestone}`, id_kategori: `${item.id_kategori}`, id_status: `${item.id_status}`, id_karyawan: `${item.id_karyawan}`
    });
    }
  }

  function kembali() {
    isEditing.value = false;
    resetForm();
  }

  async function simpanTugas() {
  let url = '/api/tugas';
    if (idTugas.value > 0) {
      url += `/${idTugas.value}`;
    }
    try {
      await api.postResource(url, { 
        nama_tugas: nama_tugas.value, keterangan_tugas: keterangan_tugas.value, tgl_mulai_tugas: tgl_mulai_tugas.value, tgl_selesai_tugas: tgl_selesai_tugas.value, id_milestone: id_milestone.value, id_kategori: id_kategori.value, id_status: id_status.value, id_karyawan: id_karyawan.value
      }, idTugas.value > 0 ? 'PUT' : 'POST');
      isEditing.value = false;
      resetForm();
      loadTugas();
    } catch (err) {
      console.log(err);
    }
  }

  async function hapusTugas(i: number) {
  const y = await showConfirmDialog(`Data tugas akan dihapus permanen`);
    if (y) {
      try {
        await api.deleteResource(`/api/tugas/${tugasList.value[i].id_tugas}`);
        loadTugas();
      } catch (err) {
        console.log(err);
      }
    }
  }

  const notifList = ref<any[]>([]);
  async function loadNotif(){
    notifList.value = [];
    const d = await api.getResource('/api/notif');
    notifList.value = d;
  }

/**
 * MOUNTED, LOAD DATA TUGAS
 */
onMounted(async () => {
  loadMilestone();
  pilihKategori.value = await api.getResource('/api/kategori');
  pilihStatus.value = await api.getResource('/api/status');
  loadKaryawan();
  loadTugas();
  loadNotif()
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
   <div class="container-fluid mt--6" v-if="! isEditing">
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

          <div class="container">
            <div class="row align-items-center py-3">
              <form class="form-inline ml-3">
                <input class="form-control mr-sm-1" @keyup="loadTugas" v-model="query" type="search" placeholder="Cari..." aria-label="Search">
              </form>
            </div>
          </div>
          <!-- End Card Header -->

          <!-- Navbar -->
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item active">
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
          <div class="container">
            <div class="row align-items-center py-3 ml-2">
              <small>Show</small>
                <div class="col-lg-1">
                  <select class="form-control responsive" id="id_proyek" v-model="limit" @change="showEntri()">
                    <option selected>2</option>
                    <option v-for="proyek in angka"> {{ proyek }} </option>
                  </select>
                </div>
              <small>Entries</small>
              <div class="col-lg-10 mt-2 text-right">
                <a href="#" class="btn btn-primary" type="button" @click="editTugas()"> + Tugas </a>
                <span>
                  <router-link to="/milestone" class="btn btn-warning" type="button">Atur Milestone</router-link>
                </span>
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
                      <th scope="col">Aksi</th>
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
                  <td>
                  <button class="btn btn-primary" @click="editTugas(i)">Edit</button>
                  <button class="btn btn-danger" @click="hapusTugas(i)">Hapus</button>
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
    <Child/>
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
                <h6 class="col-lg-6 h2 text-black d-inline-block mb-0">Form Data Tugas</h6>
              </div>
            </div>
            <!-- End Card Header -->
              
            <!-- Form Isi -->
            <form>
              <div class="pl-lg-3">
                <div class="row">
                  <div class="col-lg-5">
                    <div class="form-group">
                      <label class="form-control-label" for="nama_tugas">Nama Tugas</label>
                      <input type="text" id="nama_tugas" v-model="nama_tugas"  class="form-control" placeholder="Masukkan Nama Tugas">
                    </div>
                  </div>
                  <div class="col-lg-1"></div>
                  <div class="col-lg-5">
                    <div class="form-group">
                      <label class="form-control-label" for="milestone">Milestone</label>
                      <select class="form-control" id="id_milestone" v-model="id_milestone">
                        <option value="">Pilih Milestone</option>
                        <option v-for="milestone in pilihMilestone" :key="milestone.id_milestone" :value="milestone.id_milestone"> {{ milestone.nama_milestone }} </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-2">
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" for="keterangan">Keterangan</label>
                      <textarea v-model="keterangan_tugas" id="keterangan_tugas" class="form-control" placeholder="Masukkan Keterangan"></textarea>
                    </div>
                  </div>
                  <div class="col-lg-2">
                    <div class="form-group">
                      <label class="form-control-label" for="tgl_mulai_proyek">Tanggal Mulai</label>
                      <input type="date" id="tgl_mulai_proyek" v-model="tgl_mulai_tugas" class="form-control" placeholder="Tanggal Mulai">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-2">
                    <div class="form-group">
                      <label class="form-control-label" for="tgl_selesai_proyek">Tanggal Selesai</label>
                      <input type="date" id="tgl_selesai_proyek" v-model="tgl_selesai_tugas" class="form-control" placeholder="Tanggal Selesai">
                    </div>
                  </div>
                  <div class="col-lg-4"></div>
                  <div class="col-lg-3">
                    <div class="form-group">
                      <label class="form-control-label" for="status">Status Pengerjaan</label>
                      <select class="form-control" id="id_status" v-model="id_status">
                        <option value="">Pilih Status</option>
                        <option v-for="status in pilihStatus" :key="status.id_status" :value="status.id_status"> {{ status.nama_statuskerja }} </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-3">
                    <div class="form-group">
                      <label class="form-control-label" for="kategori">Kategori Tugas</label>
                      <select class="form-control" id="id_kategori" v-model="id_kategori">
                        <option value="">Pilih Kategori</option>
                        <option v-for="kategori in pilihKategori" :key="kategori.id_kategori" :value="kategori.id_kategori"> {{ kategori.status_kategori }} </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-3"></div>
                  <div class="col-lg-3">
                    <div class="form-group">
                      <label class="form-control-label" for="id_karyawan">Penanggung Jawab</label>
                      <select class="form-control" id="id_karyawan" v-model="id_karyawan">
                        <option value="">Pilih Penanggung Jawab</option>
                        <option v-for="karyawan in pilihKaryawan" :key="karyawan.id_karyawan" :value="karyawan.id_karyawan"> {{ karyawan.nama_karyawan }} </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row align-items-center py-4">
                <div class="col-lg-5"></div>
                <div class="col-lg-10 text-right">
                  <a class="btn btn-success" :class="{ disabled: ! metaForm.valid }" :disabled=" ! metaForm.valid" @click="simpanTugas()">SIMPAN</a>
                  <a class="btn btn-primary" @click="kembali()">KEMBALI</a>
                </div>
              </div>
            </form>
              <!-- End Form Isi -->
          </div>
        </div>
      </div>
      <!-- End Content Table -->
      <!-- Footer -->
      <Child/>
      <!-- End Footer -->
    </div>
    <!-- End Page Form Edit dan Tambah -->

  </div>
  <!-- End Main Content -->
</template>