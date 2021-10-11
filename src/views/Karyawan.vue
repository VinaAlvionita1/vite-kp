<template>
  <parent/>

  <!-- Main content -->
  <div class="main-content" id="panel">
    <!-- Header -->
    <!-- Header -->
    <div class="header bg-primary pb-6">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white d-inline-block mb-0">Karyawan</h6>
              <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                  <li class="breadcrumb-item active" aria-current="page">Karyawan</li>
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
                <div class="container">
                  <div class="row align-items-center py-4">
                    <div class="col-lg-6">
                      <h6 class="col-lg-6 h2 text-black d-inline-block mb-0">Data Karyawan</h6>
                    </div>
                    <div class="col-lg-5 text-right">
                      <a href="#" class="btn btn-primary" type="button" @click="isEditing = true"> + Karyawan </a>
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
                                <th scope="col">Nama Karyawan</th>
                                <th scope="col">Telephone</th>
                                <th scope="col">Email</th>
                                <th scope="col">Jabatan</th>
                                <th scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="list">
                            <tr v-for="(karyawan, i) in karyawanList" :key="i">
                            <th scope="row">{{ i+1 }}</th>
                            <td scope="row">{{ karyawan.nama_karyawan }}</td>
                            <td scope="row">{{ karyawan.email }}</td>
                            <td scope="row">{{ karyawan.telp }}</td>
                            <td scope="row">{{ karyawan.nama_jabatan}}</td>
                            <td>
                            <button class="btn btn-primary" @click="editKaryawan(i)">Edit</button>
                            <button class="btn btn-danger" @click="hapusKaryawan(i)">Hapus</button>
                            </td>
                        </tr>
                        </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- End Light Table -->
      <!-- Footer -->
      <child/>
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
                  <h6 class="col-lg-6 h2 text-black d-inline-block mb-0">Edit Data Proyek</h6>
                </div>
              </div>
              <!-- End Card Header -->
              
              <!-- Form Isi -->
              <form>
                <div class="pl-lg-3">
                  <div class="row">
                    <div class="col-lg-3">
                      <div class="form-group">
                        <label class="form-control-label" for="nama_karyawan">Nama</label>
                        <input type="text" id="nama_karyawan" v-model="karyawan.nama_karyawan" class="form-control" placeholder="Masukkan Nama Karyawan">
                      </div>
                    </div>
                    <div class="col-lg-3">
                    </div>
                     <div class="col-lg-3">
                      <div class="form-group">
                        <label class="form-control-label" for="telp">Telephone</label>
                        <input type="text" id="telp" v-model="karyawan.telp" class="form-control" placeholder="Masukkan Telephone Karyawan">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-4">
                      <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input type="email" id="email" v-model="karyawan.email" class="form-control" placeholder="firmansyah@example.com">
                      </div>
                    </div>
                    <div class="col-lg-2">
                    </div>
                    <div class="col-lg-2">
                      <div class="form-group">
                        <label class="form-control-label" for="input-first-name" >Jabatan</label>
                        <select class="form-control" id="id_jabatan" v-model="karyawan.id_jabatan">
                          <option disabled value="" selected="selected">Pilih Jabatan</option>
                          <option v-for="jabatan in pilihJabatan" :key="jabatan.id_jabatan" :value="jabatan.id_jabatan"> {{ jabatan.nama_jabatan }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row align-items-center py-4">
                    <div class="col-lg-11 text-right">
                      <a class="btn btn-success" @click="simpanKaryawan()">SIMPAN</a>
                      <a class="btn btn-primary" @click="kembali()">KEMBALI</a>
                    </div>
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

<script lang="ts">
import { reactive, ref } from 'vue'
import Parent from '../views/Parent.vue'
import Api from '../services/api'
import Child from '../views/Child.vue'

export default {
  name: 'Home',
    data(){
        return{
            api: new Api,
            karyawanList: [],
            karyawan: { id_karyawan: 0, nama_karyawan: '', email: '', telp: '', id_jabatan: ''},
            isEditing: false,
            pilihJabatan: {},
            jabatan: ''
        }
    },
    methods: {
      async simpanKaryawan() {
        try {
        if (this.karyawan.nama_karyawan.length == 0) {
          alert('Isi Nama Karyawan');
          return;
        }
        if (this.karyawan.email.length == 0) {
          alert('Isi Email Karyawan');
          return;
        }
        if (this.karyawan.telp.length == 0) {
          alert('Isi Telephone Karyawan');
          return;
        }
        if (this.karyawan.id_jabatan.length == 0) {
          alert('Isi Jabatan Karyawan');
          return;
        }
        let url = "/api/karyawan";
        if (this.karyawan.id_karyawan > 0){
          url += `/${this.karyawan.id_karyawan}`
        };
        const data = await this.api.postResource(url, this.karyawan, this.karyawan.id_karyawan > 0 ? 'PUT' : 'POST');
        this.isEditing = false;
        this.karyawan = {id_karyawan: 0, nama_karyawan: '', email: '', telp: '', id_jabatan: ''}
        this.karyawanList = await this.api.getResource('/api/karyawan');
        } catch (err) {
          console.log(err);
        }
      },
      editKaryawan(i: number) {
        const ambilData = this.karyawanList[i];
        this.karyawan = ambilData;
        this.isEditing = true;
      },
      async hapusKaryawan(i: number) {
        const dataHapus = this.karyawanList[i];
        this.karyawan = dataHapus;
        let url = '/api/karyawan' + '/' + this.karyawan.id_karyawan;
        const data = await this.api.deleteResource(url);
        this.karyawanList = await this.api.getResource('/api/karyawan');
      },
      kembali(){
        this.isEditing = false;
        this.karyawan = {id_karyawan: 0, nama_karyawan: '', email: '', telp: '', id_jabatan: ''}
      }
    },
    async mounted(){
      this.karyawanList = await this.api.getResource('/api/karyawan');
      this.pilihJabatan = await this.api.getResource('/api/jabatan');
    },
    components: {
      Parent, Child
    }
}
</script>