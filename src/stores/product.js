import { defineStore } from 'pinia'
import axios from "axios"
import { useToast } from 'vue-toastification'

const api_url = import.meta.env.VITE_API_URL;
const toast = useToast()


export const useProductStore = defineStore("product",{
    state: () => ({
		products: [],
	}),
    getters: {
		getProducts(state){
			return state.products;
		}
	},
    actions: {
		async fetchProducts(token){
			try {
				let config = {
					headers: {
						'Authorization' : token
					}
				}
				var request_url = api_url + '/product';
				var response = await axios.get(request_url, config);
                if (response.status == '200'){
					this.products = [];
					
					
					
					for (const item in response.data['products']){
						const product = {
							id : response.data['products'][item]['id'],
							name : response.data['products'][item]['name'],
							subtitle : response.data['products'][item]['subtitle'],
							image : response.data['products'][item]['Images'][0]['src'],
							available: response.data['products'][item]['available']							
						};
						this.products.push(product);
					}
					
					
					
					console.log(this.products);
					toast.info('Products fetched');
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
		// async sendDispatchNotification(token, paymentId, trackingId, courierName){
		// 	try {
		// 		let config = {
		// 			headers: {
		// 				'Authorization' : token
		// 			}
		// 		}
		// 		var request_url = api_url + '/dispatch';
		// 		var response = await axios.post(request_url,{
		// 			"paymentId" : paymentId,
    	// 			"trackingId" : trackingId,
    	// 			"courierName" : courierName 
		// 		}, config);
        //         if (response.status == '200'){
		// 			toast.info(response.data['message']);
        //             return true;   
        //         }
        //         else{
        //             toast.error(response.data['message']);                    
        //             return false;
        //         }
		// 	}
		// 	catch(error){
		// 		console.log(error);
		// 		toast.error(error.response.data.message);
        //         return false;
		// 	}
		// },
		// async markAsDelivered(token, orderId){
		// 	try {
		// 		let config = {
		// 			headers: {
		// 				'Authorization' : token
		// 			}
		// 		}
		// 		var request_url = api_url + '/deliver/' + orderId;
		// 		var response = await axios.put(request_url,null,config);
        //         if (response.status == '200'){
		// 			toast.info(response.data['message']);
        //             return true;   
        //         }
        //         else{
        //             toast.error(response.data['message']);                    
        //             return false;
        //         }
		// 	}
		// 	catch(error){
		// 		console.log(error);
		// 		toast.error(error.response.data.message);
        //         return false;
		// 	}
		// }
	},
	persist: true,
})