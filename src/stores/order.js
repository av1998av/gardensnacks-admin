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
					request_url += 'status='+status+'&'
				}
				request_url = request_url.slice(-1) == '&' ? request_url.slice(0,-1) : request_url; 
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
		},
		async sendDispatchNotification(token, paymentId, trackingId, courierName){
			try {
				let config = {
					headers: {
						'Authorization' : token
					}
				}
				var request_url = api_url + '/dispatch';
				var response = await axios.post(request_url,{
					"paymentId" : paymentId,
    				"trackingId" : trackingId,
    				"courierName" : courierName 
				}, config);
                if (response.status == '200'){
					toast.info(response.data['message']);
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
		async markAsDelivered(token, orderId){
			try {
				let config = {
					headers: {
						'Authorization' : token
					}
				}
				var request_url = api_url + '/deliver/' + orderId;
				var response = await axios.put(request_url,null,config);
                if (response.status == '200'){
					toast.info(response.data['message']);
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
		async fetchBill(token, orderId){
			try {
				console.log('-------------');
				console.log(token);
				console.log('-------------');
				let config = {
					headers: {
						'Authorization' : token
					}
				}
				var request_url = api_url + '/bill/' + orderId;
				var response = await axios.get(request_url,config);
                if (response.status == '200'){
					toast.info(response.data['bill']);
					// window.open(response.data['bill'], target='_blank');
                    return response.data['bill'];   
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