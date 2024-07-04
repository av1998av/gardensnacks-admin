<template>
<base-spinner v-if="isLoading" />
<div v-else class="container">
  <div class="mt-4"><p class="h3">Orders</p></div>
  <div class="row mt-4 text-center">
      <div class="row mx-auto">
        <div class="col-md-4 col-12 mt-2">
          <input type="date" v-model="selectedDate" class="form-control form-control-lg w-100">
        </div>
        <div class="col-md-4 col-12 mt-2">
          <select name="cars" class="form-control form-control-lg w-100" v-model="selectedstatus">
            <option value="created">Created</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div class="col-md-2 col-12 mt-2">
          <button class="btn btn-primary btn-lg w-100" v-on:click="fetchOrdersFromStore()">Search</button> 
        </div>
        <div class="col-md-2 col-12 mt-2">
          <button class="btn btn-danger btn-lg w-100" v-on:click="clearFilters()">Clear</button> 
        </div>
      </div>    
  </div>
  <order-grid @sendDispatchNotificationToParent="sendDispatchNotificationToStore" @sendDeliverNotificationToParent="sendDeliverNotificationToStore" @fetchBillNotification="fetchBillFromStore" :summary=summary></order-grid>
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
            selectedDate : new Date().toISOString().slice(0,10),
            selectedstatus : 'created',
            isLoading : false,
            summary: []           
        }
    },
  methods: {
        ...mapActions(useOrderStore, ['fetchOrders','sendDispatchNotification','markAsDelivered','fetchBill']),
        ...mapState(useUserStore, {
            getToken: 'getToken'
        }),
        ...mapState(useOrderStore, {
            getOrders: 'getOrders'
        }),
        clearFilters(){
          this.selectedDate = null;
          this.selectedstatus = null;
        },
        async fetchOrdersFromStore(){            
            try{
                this.isLoading = true;
                var token = this.getToken();
                var success = await this.fetchOrders(token,this.selectedDate,this.selectedstatus);
                if(success){
                    this.isLoading = false;
                    this.summary = this.getOrders();
                    console.log(this.summary);
                }
            }
            catch(error){
                console.log(error);
            }
        },
        async sendDispatchNotificationToStore(paymentId, trackingId, courierName){            
            try{
                this.isLoading = true;
                var token = this.getToken();
                var success = await this.sendDispatchNotification(token,paymentId, trackingId, courierName);
                if(success){
                    this.isLoading = false;
                    // this.summary = this.getOrders();
                    // console.log(this.summary);
                }
            }
            catch(error){
                console.log(error);
            }
        },
        async sendDeliverNotificationToStore(orderId){            
            try{
                this.isLoading = true;
                var token = this.getToken();
                var success = await this.markAsDelivered(token,orderId);
                if(success){
                    this.isLoading = false;
                    this.summary = this.getOrders();
                }
            }
            catch(error){
                console.log(error);
            }
        },
        async fetchBillFromStore(orderId){
          try{
                this.isLoading = true;
                var token = this.getToken();
                var link = await this.fetchBill(token,orderId);
                if(link != null){
                    window.open(link, '_blank')
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