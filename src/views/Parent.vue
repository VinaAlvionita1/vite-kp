<script lang="ts">
import { defineComponent } from 'vue'
import router from '../router'

export default defineComponent({
    name: 'Login',
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
        },
        async doLogout(){
          localStorage.removeItem('token');

          this.$router.replace('/');
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
              <router-link to="/home" class="nav-link">
                <i class="ni ni-tv-2 text-primary"></i>
                <span class="nav-link-text">Home</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/proyek" class="nav-link">
                <i class="ni ni-chart-bar-32 text-orange"></i>
                <span class="nav-link-text">Proyek</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/tugas" class="nav-link">
                <i class="ni ni-bullet-list-67 text-blue"></i>
                <span class="nav-link-text">Tugas</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/karyawan" class="nav-link">
                <i class="ni ni-single-02 text-yellow"></i>
                <span class="nav-link-text">Karyawan</span>
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="" @click.prevent="doLogout()">
                <i class="ni ni-button-power text-info"></i>
                <span class="nav-link-text">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  
</template>

