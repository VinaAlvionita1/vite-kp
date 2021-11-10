<script setup lang="ts">
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { onMounted, ref } from 'vue';
import usePagination from '../composables/pagination';
import Api from '../services/api';
import { showConfirmDialog } from '../services/helpers';
import Parent from './Parent.vue';
import Child from './Child.vue';

    const api: Api = new Api();
    const { loadData: loadBerkas, result: berkasList } = usePagination('/api/berkas');

    const pilihMilestone = ref<any[]>([]);

    const isEditing = ref(false);
    const idBerkas = ref(0);
    const { setValues, meta: metaForm, resetForm } = useForm({
        validationSchema: yup.object({
        nama_berkas: yup.string().required().min(3).max(80),
        file: yup.string().required().min(4).max(2550),
        keterangan: yup.string().required().min(10).max(10),
        tgl_upload: yup.string().required().min(10).max(10),
        id_milestone: yup.string().required().min(1).max(3)
        })
    });

    const { value: nama_berkas } = useField('nama_berkas');
    const { value: keterangan } = useField('keterangan');
    const { value: file } = useField('file');
    const { value: tgl_upload } = useField('tgl_upload');
    const { value: id_milestone } = useField<string>('id_milestone');

    function editBerkas(i?: number) {
    idBerkas.value = 0;
    isEditing.value = true;
        // kalau sedang mengedit
        if (i !== undefined) {
        const item = berkasList.value[i];
        idBerkas.value = item.id_berkas;
        setValues({ ...item });
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
        // if(file.value == 'object'){

        // }else{
        //     const fd = new FormData();
        //     for (const event in nama_berkas.value, keterangan.value, file.value, tgl_upload.value, id_milestone.value){
        //     if(Object.prototype.hasOwnProperty.call(this.berkas, event)){
        //         fd.append(event, this.berkas[event]);
        //     }
        //     }
        //     const data = await this.api.postResourceFile(url, fd, this.berkas.id_berkas > 0 ? 'PUT' : 'POST');
        // }
        try {
        await api.postResourceFile(url, { 
            nama_berkas: nama_berkas.value, keterangan: keterangan.value, file: file.value, tgl_upload: tgl_upload.value, id_milestone: id_milestone.value
        }, idBerkas.value > 0 ? 'PUT' : 'POST');
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
    pilihMilestone.value = await api.getResource('/api/milestone');
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
                     <div class="col-lg-3">
                      <select class="form-control" id="id_milestone">
                        <option value="">Pilih Milestone</option>
                        <option v-for="milestone in pilihMilestone" :key="milestone.id_milestone" :value="milestone.id_milestone"> {{ milestone.nama_milestone }} </option>
                      </select>
                    </div>
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
                                <th scope="col">Nama Berkas</th>
                                <th scope="col">File</th>
                                <th scope="col">Keterangan</th>
                                <th scope="col">Milestone</th>
                                <th scope="col">Tanggal Upload</th>
                                <th scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="list">
                          <tr v-for="(berkas, i) in berkasList" :key="i">
                            <th scope="row">{{ i+1 }}</th>
                            <td scope="row">{{ berkas.nama_berkas }}</td>
                            <td scope="row">{{ berkas.file }}</td>
                            <td scope="row">{{ berkas.keterangan }}</td>
                            <td scope="row">{{ berkas.nama_milestone }}</td>
                            <td scope="row">{{ berkas.tgl_upload }}</td>
                            <td>
                              <button class="btn btn-primary" @click="editBerkas(i)">Edit</button>
                              <button class="btn btn-danger" @click="hapusBerkas(i)">Hapus</button>
                            </td>
                          </tr>              
                        </tbody>

                    </table>
                </div>
            <!-- Pagination Card footer -->
            
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
                        <label class="form-control-label" for="file">File</label><br>
                        {{ file }}
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
                          <option v-for="milestone in pilihMilestone" :key="milestone.id_milestone" :value="milestone.id_milestone"> {{ milestone.nama_milestone }} </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-lg-3"></div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="keterangan">Keterangan</label>
                        <textarea id="keterangan" value="keterangan" class="form-control" placeholder="Masukkan Ketengangan"/>
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
                      <a class="btn btn-success" @click="simpanBerkas()">SIMPAN</a>
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
