<template>
<base-spinner v-if="isLoading" />
<div v-else class="container">
  <div class="mt-4"><p class="h3">Orders</p></div>
  <div class="row mt-4 text-center">
      <div class="row">
        <div class="col-md-5 col-12 mt-2">
          <input type="date" class="form-control form-control-lg w-100">
        </div>
        <div class="col-md-5 col-12 mt-2">
          <input type="text" class="form-control form-control-lg w-100" placeholder="status">
        </div>
        <div class="col-md-1 col-12 mt-2">
          <button class="btn btn-primary btn-lg">Search</button> 
        </div>
        <div class="col-md-1 col-12 mt-2">
          <button class="btn btn-danger btn-lg">Clear</button> 
        </div>
      </div>    
  </div>
  <order-grid :summary=summary></order-grid>
</div>
</template>

<script>
import OrderGrid from '../components/orders/OrderGrid.vue';
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores/user'
import { useOrderStore } from '../stores/order';
export default {
  components : { OrderGrid },
  data(){
        return {
            isLoading : false,
            summary: []           
        }
    },
  methods: {
        ...mapActions(useOrderStore, ['fetchOrders']),
        ...mapState(useUserStore, {
            getToken: 'getToken'
        }),
        ...mapState(useOrderStore, {
            getOrders: 'getOrders'
        }),
        async fetchOrdersFromStore(){            
            try{
                this.isLoading = true;
                var token = this.getToken();
                var success = await this.fetchOrders(token,'2023-10-24','cancelled');
                if(success){
                    this.isLoading = false;
                    this.summary = this.getOrders();
                    console.log(this.summary);
                }
            }
            catch(error){
                console.log(error);
            }
        }
    },
    created(){
      this.fetchOrdersFromStore();
    }
}
</script>

<style>

</style>