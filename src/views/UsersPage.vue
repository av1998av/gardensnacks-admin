<template>
<div class="mx-auto" style="width:95%">
  <div class="mt-4"><p class="h3">Users</p></div>
  <!-- <users-grid class="mt-3"></users-grid> -->
   <w-table
    :headers="table.headers"
    :items="table.users"
    fixed-headers
    fixed-footer
    :fetch="fetch"
    :pagination="table.pagination"
    :loading="table.loading"
    style="max-height: 1000px"
  >
  </w-table>
</div>
  <!-- <users-grid></users-grid> -->
</template>

<script>
import UsersGrid from '../components/users/UsersGrid.vue';
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores/user';
export default {
  components : { UsersGrid },
  data(){
    return {
      table: {
        headers: [
          { label: 'ID', key: 'id' },
          { label: 'Email Or Phone', key: 'emailOrPhone' },
          { label: 'Orders', key: '' },
          { label: 'Last Order', key: '' },
          { label: 'Addresses', key: '' },
        ],
        users: [],
        loading: false,
        pagination: {
          page: 1,
          itemsPerPage: 20,
          total: this.getTotal()
        }
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