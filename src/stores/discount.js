import { defineStore } from 'pinia'
import axios from "axios"
import { useToast } from 'vue-toastification'

const api_url = import.meta.env.VITE_API_URL;
const toast = useToast()

export const useDiscountStore = defineStore("discount",{
	state: () => ({
		discounts: [],
	}),
	getters: {
		getDiscounts(state){
			return state.discounts;
		}
	},
	actions: {
		async fetchDiscounts(token){
			try {
				let config = {
					headers: {
						'Authorization' : token
					}
				}
				var request_url = api_url + '/discount';
				var response = await axios.get(request_url, config);
				if (response.status == '200'){
					this.discounts = response.data['discounts'];
					console.log(this.discounts);
                    toast.info('Discounts fetched');
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
	}
});