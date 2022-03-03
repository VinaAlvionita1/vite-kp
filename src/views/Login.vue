<script lang="ts">
import { defineComponent } from 'vue'
import router from '../router'
import Api from '../services/api'

export default defineComponent({
    name: 'Login',
    data(){
        return{
            api: new Api,
            error: '',
            login: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        async doLogin() {
            try {
                const response = await this.api.postResource('/api/login', this.login) 
                localStorage.setItem('token', response.token.original.token)

                router.replace('/home');
            } catch (error){
                console.log('Salah Woy');
                this.error = 'Username/Password yang Anda Masukkan Salah!';
            }
            
        }
    }

})
</script>


<template>
    <div class="main-content d-flex flex-column justify-content-center">
        <!-- Page content -->
        <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary border-0 mb-0">
                <div class="card-body px-lg-5 py-lg-5">
                <div class="text-center text-muted mb-4">
                    <h2>LOGIN</h2>
                </div>
                <div v-if="error" class="alert alert-danger" role="alert">
                    {{ error }}
                </div>
                <form role="form">
                    <div class="form-group mb-3">
                    <div class="input-group input-group-merge input-group-alternative">
                        <div class="input-group-prepend">
                        <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                        </div>
                        <input class="form-control" placeholder="Email" v-model="login.username" type="email">
                    </div>
                    </div>
                    <div class="form-group">
                    <div class="input-group input-group-merge input-group-alternative">
                        <div class="input-group-prepend">
                        <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                        </div>
                        <input class="form-control" placeholder="Password" v-model="login.password" type="password">
                    </div>
                    </div>
                    <div class="text-center">
                    <button type="button" class="btn btn-primary my-4" @click="doLogin()">Sign in</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
  </div>
</template>

<style scoped>
    .main-content{

        height: 100vh;
        background-color: brown;
    }
</style>