<template>
    <base-spinner v-if="isLoading" />
    <div v-else>
        <h2 class="text-center mt-5">Garden Snacks Admin</h2>
        <form class="card p-3 mx-auto my-5 shadow-lg" style="margin-top:5em !important;width:25em">
            <h3 class="text-center">Login</h3>
            <img :src="profileImg" class="rounded-circle my-3 mx-auto" style="width: 120px;" alt="Avatar" />
            <div class="mb-3">
                <label for="username" class="form-label">Email address</label>
                <input type="text" v-model="username" class="form-control" id="username">                
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" v-model="password" class="form-control" id="password">
            </div>
            <a class="btn mt-2" v-on:click="signin()">Submit</a>
        </form>
    </div>
</template>

<script>
import profileImg from '../../assets/pngegg.png';
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../../stores/user'
export default {
    name: 'Login',
    data(){
        return {
            username : '',
            password : '',
            isLoading : false,
            profileImg: profileImg
        }
    },
    methods: {
        ...mapActions(useUserStore, ['login']),
        ...mapState(useUserStore, {
            isLoggedIn: 'isLoggedIn',      
            double: (store) => store.doubleCount,
        }),
        async signin(){            
            try{
                this.isLoading = true;
                var success = await this.login({
					          username : this.username,
                    password : this.password 
				        });
                var success =  
                this.isLoading = false;
                if(success){
                    this.isLoggedIn = true;
                    this.appointmentsPageLoad();
                }
            }
            catch(error){
                console.log(error);
            }
        }
    }
}
</script>

<style scoped>
.btn {
    background-color: rgb(115, 213, 159) !important;
}
</style>
