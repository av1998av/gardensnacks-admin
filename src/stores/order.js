import { defineStore } from 'pinia'
import axios from "axios"
import { useToast } from 'vue-toastification'

const api_url = import.meta.env.VITE_API_URL;
const toast = useToast()


export const useOrderStore = defineStore("order",{
    state: () => ({
		orders: [],
	}),
    getters: {
		getOrders(state){
			return state.orders;
		}
	},
    actions: {
		async fetchOrders(token, date, status){
			try {
				let config = {
					headers: {
						'Authorization' : token
					}
				}
				var request_url = api_url + '/summary?';
				if(date){
					request_url += 'date='+date+"&"
				}
				if(status){
					request_url += 'satus='+status+'&'
				}
				var response = await axios.get(request_url, config);
                if (response.status == '200'){
					this.orders = response.data['message'];
					console.log(this.orders);
                    toast.info('Orders fetched');
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
	persist: true,
})