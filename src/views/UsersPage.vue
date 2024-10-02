<template>
  <div class="mx-auto" style="width:95%">
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
		  <users-mailgroup :selectedUserIds=table.selectedRows></users-mailgroup>
	  </w-overlay>
  </div>
</template>

<script>
import UsersMailgroup from '../components/users/UsersMailgroup.vue';
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores/user';
export default {
  components: { UsersMailgroup },
  data(){
    return {
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
    ...mapState(useUserStore, {
      getToken: 'getToken'
    }),
    ...mapState(useUserStore, {
      getUsers: 'getUsers',
      getTotal: 'getTotal'
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
  }
}
</script>

<style>

</style>