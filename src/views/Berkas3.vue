<script setup lang="ts">
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { onMounted, reactive, ref } from 'vue';
import usePagination from '../composables/pagination';
import Api from '../services/api';
import { showConfirmDialog } from '../services/helpers';
import Parent from './Parent.vue';
import Child from './Child.vue';
import Pagination from '../components/pagination.vue';

    const query = ref('');
    const api: Api = new Api();
    const milestone = ref('');
    const { loadData: loadBerkas, result: berkasList, pages: pageList,
    page: currentPage, isFirstPage, isLastPage, gotoPage,
    nextPage, prevPage } = usePagination('/api/berkas', 2, query);

    const { loadData: loadMilestone, result: pilihMilestone } = usePagination('/api/milestone', 30, query);

    const isEditing = ref(false);
    const idBerkas = ref(0);
    const file = ref<any>('');
    const { setValues, meta: metaForm, resetForm } = useForm({
      validationSchema: yup.object({
        nama_berkas: yup.string().required().min(3).max(80),
        keterangan: yup.string().required().min(10).max(1000),
        tgl_upload: yup.string().required().min(10).max(10),
        id_milestone: yup.string().required().min(1).max(3)
      })
    });

    const { value: nama_berkas } = useField<string>('nama_berkas');
    const { value: keterangan } = useField<string>('keterangan');
    const { value: tgl_upload } = useField<string>('tgl_upload');
    const { value: id_milestone } = useField<string>('id_milestone');


    function pilihFile(evt: any) {
      if (evt.target?.files) {
        file.value = evt.target.files[0];
      }
    }

    function editBerkas(i?: number) {
      idBerkas.value = 0;
      isEditing.value = true;
      setValues({ nama_berkas: '', keterangan: '', tgl_upload: '', id_milestone: '' });
      // kalau sedang mengedit
      if (i !== undefined) {
        const item = berkasList.value[i];
        idBerkas.value = item.id_berkas;
        file.value = item.file;
        setValues({ 
          nama_berkas: item.nama_berkas, keterangan: item.keterangan, tgl_upload: item.tgl_upload, id_milestone: `${item.id_milestone}`
        });
      }
    }

    function kembali() {
      isEditing.value = false;
        resetForm();
    }

    async function simpanBerkas() {
      let url = '/api/berkas';
      if (idBerkas.value > 0) {
        url += `/${idBerkas.value}`;
      }
      try {
        if (file.value !== undefined && typeof(file.value) != 'string') {
          const fd = new FormData();
          fd.append('nama_berkas', nama_berkas.value);
          fd.append('keterangan', keterangan.value);
          fd.append('tgl_upload', tgl_upload.value);
          fd.append('id_milestone', id_milestone.value);
          fd.append('file', file.value);
          const data = await api.postResourceFile(url, fd, idBerkas.value > 0 ? 'PUT' : 'POST');
        } else {
          const data = await api.postResource(url, { nama_berkas: nama_berkas.value, keterangan: keterangan.value, tgl_upload: tgl_upload.value, id_milestone: id_milestone.value, file: file.value, }, idBerkas.value > 0 ? 'PUT' : 'POST');
        }
        idBerkas.value = 0;
        file.value = '';
        isEditing.value = false;
        resetForm();
        loadBerkas();
      } catch (err) {
        console.log(err);
      }
    }

    async function hapusBerkas(i: number) {
    const y = await showConfirmDialog(`Data berkas akan dihapus permanen`);
      if (y) {
        try {
          await api.deleteResource(`/api/berkas/${berkasList.value[i].id_berkas}`);
          loadBerkas();
        } catch (err) {
          console.log(err);
        }
      }
    }

    /**
     * MOUNTED, LOAD DATA TUGAS
     */
    onMounted(async () => {
      loadMilestone();
      loadBerkas();
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
                  <li class="breadcrumb-item active" aria-current="page">Berkas</li>
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
                    <h6 class="col h2 text-black d-inline-block mb-0">Data Berkas</h6>
                  </div>
                </div>

                <div class="container">
                  <div class="row align-items-center py-3">
                    <form class="col-lg-12">
                      <div class="col-lg-3">
                        <select class="form-control" id="id_milestone" @click="loadBerkas()" v-model="query">
                          <option value="">Pilih Milestone</option>
                          <option v-for="milestone in pilihMilestone" :key="milestone.id_milestone" :value="milestone.id_milestone"> {{ milestone.nama_milestone }} </option>
                        </select>
                      </div>
                    </form>
                  </div>
                </div>
                <!-- End Card Header -->

                <!-- Navbar -->
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                  <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                      <li class="nav-item ">
                        <router-link to="/tugas-data" class="nav-link">
                          <span class="nav-link-text">Data Tugas</span>
                        </router-link>
                      </li>
                      <li class="nav-item active">
                        <router-link to="/tugas-berkas" class="nav-link">
                          <span class="nav-link-text">Berkas</span>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </nav>
                <!-- End Navbar -->
                
                <div class="col-lg-11 mt-2 text-right">
                  <a href="#" class="btn btn-primary" type="button" @click="isEditing = true"> + Berkas </a>
                </div>

                <!-- Light table -->
                <div class="table-responsive mt-3">
                    <table class="table align-items-center table-flush">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Berkas</th>
                                <th scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="list">
                          <tr v-for="(berkas, i) in berkasList" :key="i">
                            <th scope="row">{{ i+1 }}</th>
                            <td scope="row">
                              <span>
                                <span class="badge badge-success fs-5 font-weight-bolder mr-3" title="tanggal mulai">{{ berkas.tgl_upload.split('-').reverse().join('/') }}</span>
                                <span class="badge badge-secondary">{{ berkas.keterangan }}</span>
                              </span>
                              <h4>{{ berkas.file }} </h4> <p> {{ berkas.nama_milestone }} </p>
                            </td>
                            <td>
                              <button class="btn btn-primary" @click="editBerkas(i)">Edit</button>
                              <button class="btn btn-danger" @click="hapusBerkas(i)">Hapus</button>
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
                  <h6 class="col-lg-6 h2 text-black d-inline-block mb-0">Form Data Berkas</h6>
                </div>
              </div>
              <!-- End Card Header -->
              
              <!-- Form Isi -->
              <form>
                <div class="pl-lg-3">
                  <div class="row">
                    <div class="col-lg-5">
                      <div class="form-group">
                        <label class="form-control-label" for="nama_berkas">Nama Berkas</label>
                        <input type="text" id="nama_berkas" v-model="nama_berkas" class="form-control" placeholder="Masukkan Nama Berkas"> 
                      </div>
                    </div>
                    <div class="col-lg-1"></div>
                    <div class="col-lg-5">
                      <div class="form-group">
                        <label class="form-control-label" for="file">File</label>
                        {{ file }}<br>
                        <input type="file" id="file" @change="pilihFile($event)" class="form-control" placeholder="Masukkan Nama Berkas"> 
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-3">
                      <div class="form-group">
                        <label class="form-control-label" for="id_milestone">Milestone</label>
                        <select class="form-control" id="id_milestone" v-model="id_milestone">
                          <option value="">Pilih Milestone</option>
                          <option v-for="milestone in pilihMilestone" :key="milestone.id_milestone" :value="`${milestone.id_milestone}`"> {{ milestone.nama_milestone }} </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-lg-3"></div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="keterangan">Keterangan</label>
                        <textarea id="keterangan" v-model="keterangan" class="form-control" placeholder="Masukkan Ketengangan"/>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-3">
                      <div class="form-group">
                        <label class="form-control-label" for="tgl_upload">Tanggal Upload</label>
                        <input type="date" id="tgl_upload" v-model="tgl_upload" class="form-control">
                      </div>
                    </div>
                  </div>
                </div>


                  <div class="row align-items-center py-4">
                    <div class="col-lg-6">
                    
                    </div>
                    <div class="col-lg-11 text-right">
                      <button type="button" class="btn btn-success" :class="{ disabled: ! metaForm.valid }" :disabled=" ! metaForm.valid" @click="simpanBerkas()">SIMPAN</button>
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
