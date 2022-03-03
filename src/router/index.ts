import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Home from "../views/Home3.vue"
import Login from "../views/Login.vue"
import Karyawan from "../views/Karyawan3.vue"
import Proyek from "../views/Proyek3.vue"
import Tugas from "../views/Tugas.vue"
import DataTugas from "../views/Tugas-data3.vue"
import Berkas from "../views/Berkas3.vue"
import Milestone from "../views/Milestone3.vue"
import Rekap from "../views/Rekap3.vue"
import DetailNotif from "../views/Detail-notif.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/karyawan',
        name: 'Karyawan',
        component: Karyawan
    },
    {
        path: '/proyek',
        name: 'Proyek',
        component: Proyek
    },
    {
        path: '/tugas',
        name: 'Tugas',
        component: Tugas
    },
    {
        path: '/tugas-data',
        name: 'DataTugas',
        component: DataTugas
    },
    {
        path: '/tugas-berkas',
        name: 'Berkas',
        component: Berkas
    },
    {
        path: '/milestone',
        name: 'Milestone',
        component: Milestone
    },
    {
        path: '/rekap-proyek',
        name: 'Rekap',
        component: Rekap
    },
    {
        path: '/detail-notif',
        name: 'DetailNotif',
        component: DetailNotif
    }
];

const router = createRouter({
    history:createWebHistory(''),
    routes
});

router.beforeEach((to, from, next) =>{
    const isAuthenticated = localStorage.getItem('token');
    if (to.name !== 'Login' && !isAuthenticated) next ({name:'Login'});
    if (to.name === 'Login' && isAuthenticated) next ({name:'Home'});
    else next();
})

export default router