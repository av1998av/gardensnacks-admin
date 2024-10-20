<template>
  <div class="card">
  <div class="card-body">
    <h5 class="card-title float-start">Add Job</h5>
	<br><br>
	<div class="mb-3">
		<label class="form-label float-start">Message Group</label>
		<select v-model="messageGroup" class="form-select">
          <option v-for="item in messageGroups" :key="item.id" :value="item.id">{{item.name}}</option>      
        </select>
	</div>
	<div class="mb-3">
		<label class="form-label float-start">Template Id</label>
		<input type="text" v-model="templateId" class="form-control">
	</div>
	<div class="mb-3">
		<label class="form-label float-start">Timestamp</label>
		<input type="text" v-model="timestamp" class="form-control">
	</div>
	<div class="mb-3">
		<label class="form-label float-start">Content</label>
		<input type="text" v-model="content" class="form-control">
	</div>
	<button v-on:click="addJobNotificationFromForm" class="btn btn-primary w-100">Submit</button>
  </div>
</div>
</template>

<script>
import { useMessageGroupStore } from '../../stores/messageGroup';
import { useUserStore } from '../../stores/user';
import { mapActions, mapState } from 'pinia'
export default {
	data(){
		return {
			templateId: '',
			timestamp: '',
			messageGroup: '',
			content: '',
			messageGroups: []
		}
	},
	emits: ['addJobNotification'],
	methods: {
		...mapState(useUserStore, {
      		getToken: 'getToken'
    	}),
		...mapActions(useMessageGroupStore, ['fetchMessageGroups']),
		...mapState(useMessageGroupStore, {
      		getMessageGroups: 'getMessageGroups',
    	}),
		addJobNotificationFromForm(){
			this.$emit('addJobNotification', this.templateId, this.timestamp, this.messageGroup, this.content)
		},
		async fetchMessageGroupsFromStore(){            
			try{
				var token = this.getToken();
				var success = await this.fetchMessageGroups(token);
				if(success){
					this.messageGroups = this.getMessageGroups();
					console.log(this.messageGroups);
				}
			}
			catch(error){
				console.log(error);
			}
		},
	},
	created(){
   		this.fetchMessageGroupsFromStore();
  	}
}
</script>

<style>

</style>