<script setup lang="ts">
import * as yup from 'yup';
import { onMounted, ref } from 'vue';
import usePagination from '../composables/pagination';
import Api from '../services/api';
import { useField, useForm } from 'vee-validate';
import { showConfirmDialog } from '../services/helpers';
import Pagination from '../components/pagination.vue';
import Parent from './Parent.vue';
import Child from './Child.vue';


    
    const api: Api = new Api();
    const query = ref('');
    const pilihProyek = ref<any[]>([]);
    const { loadData: loadMilestone, result: milestoneList, pages: pageList,
    page: currentPage, isFirstPage, isLastPage, gotoPage,
    nextPage, prevPage } = usePagination('/api/milestone', 2, query);
    const isEditing = ref(false);
    const idMilestone = ref(0);

    async function loadProyek(){
      pilihProyek.value = [];
      const d = await api.getResource('/api/proyek');
      pilihProyek.value = d.data;
    }

    const { setValues, meta: metaForm, resetForm } = useForm({
        validationSchema: yup.object({
            nama_milestone: yup.string().required().min(3).max(1000),
            id_proyek: yup.string().required().min(1).max(3),
        })
    });

    const { value: nama_milestone } = useField<string>('nama_milestone');
    const { value: id_proyek } = useField<string>('id_proyek');

    function editMilestone(i?: number) {
    idMilestone.value = 0;
    isEditing.value = true;
    // kalau sedang mengedit
        if (i !== undefined) {
          const item = milestoneList.value[i];
          idMilestone.value = item.id_milestone;
          setValues({ nama_milestone : item.nama_milestone, id_proyek : item.id_proyek });
        }
    }
    function kembali() {
        isEditing.value = false;
        resetForm();
    }

    async function simpanMilestone() {
    let url = '/api/milestone';
    if (idMilestone.value > 0) {
        url += `/${idMilestone.value}`;
    }
    try {
        await api.postResource(url, { 
        nama_milestone: nama_milestone.value, id_proyek: id_proyek.value
        }, idMilestone.value > 0 ? 'PUT' : 'POST');
        isEditing.value = false;
        resetForm();
        loadMilestone();
    } catch (err) {
        console.log(err);
    }
    }
    async function hapusMilestone(i: number) {
    const y = await showConfirmDialog(`Data milestone akan dihapus permanen`);
    if (y) {
        try {
        await api.deleteResource(`/api/milestone/${milestoneList.value[i].id_milestone}`);
        loadMilestone();
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
     * MOUNTED, LOAD DATA MILESTONE
     */
    onMounted(async() => {
      loadMilestone(),
      loadProyek(),
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
              <h6 class="h2 text-white d-inline-block mb-0">Home</h6>
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                  <li class="breadcrumb-item"><a href="#">Tugas</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Milestone</li>
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
    <div class="container-fluid mt--6" v-if="! isEditing">

      <!-- Isi View -->
      <div class="row">
        <div class="col">
          <div class="card">
            
            <!-- Card header -->
            <div class="row align-items-center py-1">
              <div class="col text-center">
                <h6 class="col h2 text-black d-inline-block mb-0">Data Milestone</h6>
              </div>
            </div>

            <div class="container">
              <div class="row align-items-center py-3">
                <div class="col-lg-6">
                    <form class="form-inline ml-3">
                        <input class="form-control mr-sm-1" @keyup="loadMilestone()" v-model="query" type="search" placeholder="Cari..." aria-label="Search">
                    </form>
                </div>
                <div class="col-lg-6 text-right">
                  <a href="#" class="btn btn-primary" type="button" @click="isEditing = true"> + Milestone </a>
                  <span>
                    <router-link to="/tugas-data" class="btn btn-warning" type="button">Tugas</router-link>
                  </span>
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
                    <th scope="col">Nama Milestone</th>
                    <th scope="col">Nama Proyek</th>
                    <th scope="col">Aksi</th>
                  </tr>
                </thead>
                <tbody class="list" v-for="(milestone, i) in milestoneList" :key="i">
                  <tr>
                    <th scope="row">{{ i+1 }}</th>
                    <td scope="row">{{ milestone.nama_milestone }}</td>
                    <td scope="row">{{ milestone.nama_proyek }}</td>
                    <td>
                    <button class="btn btn-primary" @click="editMilestone(i)">Edit</button>
                    <button class="btn btn-danger" @click="hapusMilestone(i)">Hapus</button>
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
      <!-- End Isi View -->

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
                  <h6 class="col-lg-6 h2 text-black d-inline-block mb-0">Form Data Milestone</h6>
                </div>
              </div>
              <!-- End Card Header -->
              
              <!-- Form Isi -->
              <form>
                <div class="pl-lg-3">
                  <div class="row">
                    <div class="col-lg-5">
                      <div class="form-group">
                        <label class="form-control-label" for="nama_milestone">Nama Milestone</label>
                        <input type="text" id="nama_milestone" v-model="nama_milestone" class="form-control" placeholder="Masukkan Nama Milestone">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-8">
                       <div class="form-group">
                        <label class="form-control-label" for="input-first-name">Proyek</label>
                        <select class="form-control" id="id_proyek" v-model="id_proyek">
                          <option value="">Pilih Proyek</option>
                          <option v-for="proyek in pilihProyek" :key="proyek.id_proyek" :value="proyek.id_proyek"> {{ proyek.nama_proyek }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>


                  <div class="row align-items-center py-4">
                    <div class="col-lg-6">
                    
                    </div>
                    <div class="col-lg-11 text-right">
                      <a class="btn btn-success" :class="{ disabled: ! metaForm.valid }" :disabled=" ! metaForm.valid" @click="simpanMilestone()">SIMPAN</a>
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
      <child/>
      <!-- End Footer -->
    </div>
    <!-- End Page Form Edit dan Tambah -->

  </div>
  <!-- End Main Content -->

</template>