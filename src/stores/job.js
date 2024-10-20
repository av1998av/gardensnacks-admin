import { defineStore } from 'pinia'
import axios from "axios"
import { useToast } from 'vue-toastification'

const api_url = import.meta.env.VITE_JOBS_URL;
const toast = useToast()

export const useJobStore = defineStore("job",{
	state: () => ({
		jobs: [],
	}),
	getters: {
		getJobs(state){
			return state.jobs;
		}
	},
	actions: {
		async fetchJobs(token){
			try {
				let config = {
					headers: {
						'Authorization' : token
					}
				}
				var request_url = api_url;
				var response = await axios.get(request_url, config);
				if (response.status == '200'){
					this.jobs = response.data;
					console.log(this.jobs);
                    toast.info('Jobs fetched');
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
		async createJob(job, token){
			try {
				let config = {
					headers: {
						'Authorization' : token
					}
				}
				var request_url = api_url;
				var response = await axios.post(request_url, {
					"messageGroupId" : job['messageGroup'],
					"templateId" : job['templateId'],
					"timestamp" : job['timestamp'],
					"content" : job['content']
				}, config);
				if (response.status == '200'){
					toast.info('Job created');
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