import { defineStore } from 'pinia'
import axios from "axios"
import { useToast } from 'vue-toastification'

const api_url = import.meta.env.VITE_API_URL;
const toast = useToast()

export const useMessageGroupStore = defineStore("MessageGroup",{
	state: () => ({
		MessageGroups: [],
	}),
	getters: {
		getMessageGroups(state){
			return state.MessageGroups;
		}
	},
	actions: {
		async fetchMessageGroups(token){
			try {
				let config = {
					headers: {
						'Authorization' : token
					}
				}
				var request_url = api_url + '/MessageGroup';
				var response = await axios.get(request_url, config);
				if (response.status == '200'){
					this.MessageGroups = response.data['messageGroups'];
					console.log(this.MessageGroups);
                    toast.info('MessageGroups fetched');
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
		async createMessageGroup(MessageGroup, token){
			//validation errors are not handled here
			try {
				let config = {
					headers: {
						'Authorization' : token
					}
				}
				var request_url = api_url + '/MessageGroup';
				var response = await axios.post(request_url, {
					"name" : MessageGroup['name'],
					"category" : MessageGroup['category']
				}, config);
				if (response.status == '200'){
					toast.info('MessageGroup created');
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
		async deactivateMessageGroup(MessageGroupId, token){
			//validation errors are not handled here
			try {
				let config = {
					headers: {
						'Authorization' : token
					}
				}
				var request_url = api_url + '/MessageGroup/' + MessageGroupId + '/deactivate';
				var response = await axios.put(request_url, null, config);
				if (response.status == '200'){
					toast.info('MessageGroup deactivated');
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
		async activateMessageGroup(MessageGroupId, token){
			//validation errors are not handled here
			try {
				let config = {
					headers: {
						'Authorization' : token
					}
				}
				var request_url = api_url + '/MessageGroup/' + MessageGroupId + '/activate';
				var response = await axios.put(request_url, null, config);
				if (response.status == '200'){
					toast.info('MessageGroup deactivated');
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
		async addUsersToMessageGroup(userIds, messageGroupId, token){
			try {
				let config = {
					headers: {
						'Authorization' : token
					}
				}
				var request_url = api_url + '/messageGroupUsers';
				var response = await axios.post(request_url, {
					"groupId" : messageGroupId,
					"userIds" : userIds
				}, config);
				if (response.status == '200'){
					toast.info('Added Users to Message Group');
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
	}
});