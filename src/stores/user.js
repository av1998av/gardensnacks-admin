import { defineStore } from 'pinia'
import axios from "axios"
import { useToast } from 'vue-toastification'

const api_url = import.meta.env.VITE_API_URL;
const toast = useToast()


export const useUserStore = defineStore("user",{
    state: () => ({
		token: null,
		users: [],
		total: 0
	}),
    getters: {
		getToken(state){
			return state.token
		},
		isLoggedIn(state){
			return state.token != null;
		},
		getUsers(state){
			return state.users
		},
		getTotal(state){
			return state.total
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
		},
		async fetchUsers(token, page, size){
			try {
				let config = {
					headers: {
						'Authorization' : token
					}
				}
				var request_url = api_url + '/users?';
				if(page){
					request_url += 'page='+page+"&"
				}
				if(size){
					request_url += 'size='+size+'&'
				}
				request_url = request_url.slice(-1) == '&' ? request_url.slice(0,-1) : request_url; 
				var response = await axios.get(request_url, config);
                if (response.status == '200'){
					this.users = response.data['users']['rows'];
					this.total = response.data['users']['count'];
					console.log(this.users);
                    toast.info('Users fetched');
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
		},
	},
	persist: true,
})