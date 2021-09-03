import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import Karyawan from "../views/Karyawan.vue"
import Proyek from "../views/Proyek.vue"
import Tugas from "../views/Tugas.vue"

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
    }
]

const router = createRouter({
    history:createWebHistory(''),
    routes
})

export default router