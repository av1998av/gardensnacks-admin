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
		async fetchOrders(token, date){
			try {
				let config = {
					headers: {
						'Authorization' : token
					}
				}
				var response = await axios.get(api_url + '/summary/' + date, config);
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