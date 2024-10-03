<template>
  <base-spinner v-if="isLoading" />
  <div v-else class="mx-auto" style="width:95%">
    <div class="mt-4 d-flex">
      <span class="h3">Users</span>
      <button class="btn btn-success ms-auto" v-if="table.selectedRows.length > 0" v-on:click="showAddToGroupOverlay = true">Add to MailGroup</button>
    </div>
    <w-table
      :headers="table.headers"
      :items="table.users"
      fixed-headers
      fixed-footer
      fixed-layout
      selectable-rows
      :fetch="fetch"
      :pagination="table.pagination"
      :loading="table.loading"
      v-model:selected-rows="table.selectedRows"
      style="max-height:1000px;margin-top:10px;"
    >
    </w-table>
    <w-overlay v-model="showAddToGroupOverlay">
		  <users-mailgroup @addUsersToMessageGroupNotificationToParent="addUsersToMessageGroupNotificationToStore" :selectedUserIds=table.selectedRows :messageGroups=messageGroups></users-mailgroup>
	  </w-overlay>
  </div>
</template>

<script>
import UsersMailgroup from '../components/users/UsersMailgroup.vue';
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores/user';
import { useMessageGroupStore } from '../stores/messageGroup';
export default {
  components: { UsersMailgroup },
  data(){
    return {
      isLoading: false,
      messageGroups: [],
      showAddToGroupOverlay: false,
      table: {
        headers: [
          { label: 'ID', key: 'id', width: '120px' },
          { label: 'Email Or Phone', key: 'emailOrPhone', width: '250px' },
          { label: 'Orders', key: '', width: '120px'},
          { label: 'Last Order', key: '', width: '120px' },
          { label: 'Addresses', key: '', width: '120px' },
        ],
        users: [],
        loading: false,
        pagination: {
          page: 1,
          itemsPerPage: 20,
          total: this.getTotal()
        },
        selectedRows: []
      }
    }
  },
  methods: {
    ...mapActions(useUserStore, ['fetchUsers']),
    ...mapActions(useMessageGroupStore, ['fetchMessageGroups','addUsersToMessageGroup']),
    ...mapState(useUserStore, {
      getToken: 'getToken',
      getUsers: 'getUsers',
      getTotal: 'getTotal'
    }),
    ...mapState(useMessageGroupStore, {
      getMessageGroups: 'getMessageGroups',
    }),
    async fetch ({ page, start, end, total, itemsPerPage, sorting }) {           
      try{
				this.table.loading = 'header'
        var token = this.getToken();
				var success = await this.fetchUsers(token,page,itemsPerPage);
        if(success){
            this.table.pagination.total = this.getTotal();
            this.table.loading = false;
            this.table.users = this.getUsers();
        }
      }
      catch(error){
          console.log(error);
      }
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
    async addUsersToMessageGroupNotificationToStore(messageGroupId){
      try{
        this.isLoading = true;
        var token = this.getToken();
        var success = await this.addUsersToMessageGroup(this.table.selectedRows, messageGroupId, token); 
        if(success){
          this.isLoading = false;
          this.showAddToGroupOverlay = false;
        }       
      }
      catch(error){
          console.log(error);
      }
    }
  },
  created(){
    this.fetchMessageGroupsFromStore();
  }
}
</script>

<style>

</style>