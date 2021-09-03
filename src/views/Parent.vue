<script lang="ts">
import { defineComponent } from 'vue'
import router from '../router'
import Api from '../services/api'

export default defineComponent({
    name: 'Login',
    data(){
        return{
            api: new Api,
            email: 'vina@gmail.com',
            password: '12345'
        }
    },
    methods: {
        doHome() {
            router.replace('/home');
        },
        doLogin(){
          router.replace('/');
        },
        doKaryawan(){
          router.replace('/karyawan');
        },
        doTugas(){
          router.replace('/tugas');
        },
        doProyek(){
          router.replace('/proyek');
        }
    }

})
</script>

<template>
  <nav class="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white" id="sidenav-main">
    <div class="scrollbar-inner">
      <!-- Brand -->
      <div class="sidenav-header  align-items-center">
        <a class="navbar-brand" href="javascript:void(0)">
          <img src="logo.png" class="navbar-brand-img" alt="...">
        </a>
      </div>
      <div class="navbar-inner">
        <!-- Collapse -->
        <div class="collapse navbar-collapse" id="sidenav-collapse-main">
          <!-- Nav items -->
          <ul class="navbar-nav mt-4">
            <li class="nav-item">
              <a class="nav-link" href="" @click="doHome()">
                <i class="ni ni-tv-2 text-primary"></i>
                <span class="nav-link-text">Home</span>
              </a>
            </li>
            <li class="dropdown">
              <a class="nav-link dropdown" href="" @click="doProyek()">
                <i class="ni ni-planet text-orange"></i>
                <span class="nav-link-text">Proyek</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="" @click="doTugas()">
                <i class="ni ni-bullet-list-67 text-blue"></i>
                <span class="nav-link-text">Tugas</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="" @click="doKaryawan()">
                <i class="ni ni-single-02 text-yellow"></i>
                <span class="nav-link-text">Karyawan</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="" @click="doLogin()">
                <i class="ni ni-button-power text-info"></i>
                <span class="nav-link-text">Login</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  
</template>

