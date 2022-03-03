<script setup lang="ts">
import { onMounted, ref } from 'vue';
import usePagination from '../composables/pagination';
import Parent from './Parent.vue';
import Child from './Child.vue';
import Api from '../services/api';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { showConfirmDialog } from '../services/helpers';
import swal from 'sweetalert';

const query = ref('');
const api: Api = new Api();
const { loadData, result: karyawanList } = usePagination('/api/karyawan', 30, query);

const pilihJabatan = ref<any[]>([]);

const isEditing = ref(false);
const idKaryawan = ref(0);
const { setValues, meta: metaForm, resetForm } = useForm({
  validationSchema: yup.object({
    nama_karyawan: yup.string().required().min(3).max(40),
    telp: yup.string().required().min(12).max(12),
    email: yup.string().required().email(),
    id_jabatan: yup.string().required().min(1).max(3),
  }),
  initialValues: {
    nama_karyawan: '', telp: '', email: '', id_jabatan: ''
  }
});
const { value: nama_karyawan } = useField('nama_karyawan');
const { value: telp } = useField('telp');
const { value: email } = useField('email');
const { value: id_jabatan } = useField<string>('id_jabatan');

function editKaryawan(i?: number) {
  isEditing.value = true;
  idKaryawan.value = 0;
  if (i !== undefined) {
    idKaryawan.value = karyawanList.value[i].id_karyawan;
    const item = karyawanList.value[i];
    setValues({
      nama_karyawan: item.nama_karyawan, telp: item.telp, email: item.email, id_jabatan: `${item.id_jabatan}`
    });
  }
}
function kembali() {
  resetForm();
  isEditing.value = false;
}

async function simpanKaryawan() {
  let url = `/api/karyawan`;
  if (idKaryawan.value > 0) {
    url += `/${idKaryawan.value}`;
  }
  try {
    const data = await api.postResource(url, { nama_karyawan: nama_karyawan.value, telp: telp.value, email: email.value, id_jabatan: id_jabatan.value }, idKaryawan.value > 0 ? 'PUT' : 'POST');
    kembali();
    loadData();
  } catch (err) {
    console.log(err);
  }
}

async function hapusKaryawan(i: number) {
  const y = await showConfirmDialog(`Data karyawan akan dihapus!`);
  if (y) {
    try{
      await api.deleteResource(`/api/karyawan/${karyawanList.value[i].id_karyawan}`);
      loadData();
    } catch (err){
      console.log('Ada Tugasnya Woy!');
      swal("Maaf!", "Data Tidak Dapat Dihapus, Dikarenakan Karyawan Bertanggung Jawab Atas Beberapa Tugas!", "error");
    }
  }
}


const notifList = ref<any[]>([]);
async function loadNotif(){
  notifList.value = [];
  const d = await api.getResource('/api/notif');
  notifList.value = d;
}

onMounted(async () => {
  pilihJabatan.value = await api.getResource('/api/jabatan');
  loadData(),
  loadNotif()
});
</script>

<template>
  <Parent></Parent>

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
                <div class="container">
                  <div class="row align-items-center py-4">
                    <div class="col-lg-6">
                      <h6 class="col-lg-6 h2 text-black d-inline-block mb-0">Data Karyawan</h6>
                    </div>
                    <div class="col-lg-6 text-right">
                      <a href="#" class="btn btn-primary mr-3" type="button" @click="editKaryawan()"> + Karyawan </a>
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
                    <th scope="col">Email</th>
                    <th scope="col">Telephone</th>
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
                  <h6 class="col-lg-6 h2 text-black d-inline-block mb-0">Form Data Karyawan</h6>
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
                        <input type="text" id="nama_karyawan" v-model="nama_karyawan" class="form-control" placeholder="Masukkan Nama Karyawan">
                      </div>
                    </div>
                    <div class="col-lg-3">
                    </div>
                     <div class="col-lg-3">
                      <div class="form-group">
                        <label class="form-control-label" for="telp">Telephone</label>
                        <input type="text" id="telp" v-model="telp" class="form-control" placeholder="Masukkan Telephone Karyawan">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-4">
                      <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input type="email" id="email" v-model="email" class="form-control" placeholder="firmansyah@example.com">
                      </div>
                    </div>
                    <div class="col-lg-2">
                    </div>
                    <div class="col-lg-2">
                      <div class="form-group">
                        <label class="form-control-label" for="input-first-name">Jabatan</label>
                        <select class="form-control" id="id_jabatan" v-model="id_jabatan">
                          <option value="">Pilih Jabatan</option>
                          <option v-for="jabatan in pilihJabatan" :key="jabatan.id_jabatan" :value="jabatan.id_jabatan"> {{ jabatan.nama_jabatan }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row align-items-center py-4">
                    <div class="col-lg-11 text-right">
                      <button class="btn btn-success" type="button" :class="{ disabled: ! metaForm.valid }" :disabled=" ! metaForm.valid" @click="simpanKaryawan()">SIMPAN</button>
                      <button class="btn btn-primary" type="button" @click="kembali()">KEMBALI</button>
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
      <Child></Child>
      <!-- End Footer -->
    </div>
    <!-- End Page Form Edit dan Tambah -->

  </div>
  <!-- End Main Content -->
</template>