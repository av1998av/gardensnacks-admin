import { defineStore } from 'pinia'
import axios from "axios"
import { useToast } from 'vue-toastification'

const api_url = import.meta.env.VITE_API_URL;
const toast = useToast()


export const useUserStore = defineStore("user",{
    state: () => ({
		token: null,
	}),
    getters: {
		getToken(state){
			return state.token
		},
		isLoggedIn(state){
			console.log(state.token);
			return state.token != null;
		}
	},
    actions: {
		async login(credentials){
			try {
				var response = await axios.post(api_url + '/signin', {
                    uname : credentials.username,
                    pwd : credentials.password
                });
                if (response.status == '200'){
					this.token = response.data['token'];
					console.log(this.token);
                    toast.info('Signed in');
                    return true;   
                }
                else{
                    toast.error(response.data['message']);                    
                    return false;
                }
			}
			catch(error){
				console.log(error);
				toast.error(error.response.data.message);
                return false;
			}
		}
	},
})