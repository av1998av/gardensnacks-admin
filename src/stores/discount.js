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
		},
		async createDiscount(discount, token){
			//validation errors are not handled here
			try {
				let config = {
					headers: {
						'Authorization' : token
					}
				}
				var request_url = api_url + '/discount';
				var response = await axios.post(request_url, {
					"code" : discount['code'],
					"percent" : discount['percent']
				}, config);
				if (response.status == '200'){
					toast.info('Discount created');
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
		async deactivateDiscount(discountId, token){
			//validation errors are not handled here
			try {
				let config = {
					headers: {
						'Authorization' : token
					}
				}
				var request_url = api_url + '/discount/' + discountId + '/deactivate';
				var response = await axios.put(request_url, null, config);
				if (response.status == '200'){
					toast.info('Discount deactivated');
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
		async activateDiscount(discountId, token){
			//validation errors are not handled here
			try {
				let config = {
					headers: {
						'Authorization' : token
					}
				}
				var request_url = api_url + '/discount/' + discountId + '/activate';
				var response = await axios.put(request_url, null, config);
				if (response.status == '200'){
					toast.info('Discount deactivated');
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