<template>
  <div class="table-responsive">
    <table class="table mt-5">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">City</th>
      <th scope="col">Amount</th>
      <!-- <th scope="col">Profile</th> -->
      <th scope="col">Address</th>
      <th scope="col">Bill</th>
      <th scope="col">Status</th>
      <th scope="col">Shipping Id</th>
      <th scope="col">Shiping info</th>
      <th scope="col">Actions</th>
      <th scope="col">OrderId</th>
      <th scope="col">PaymentId</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in summary" :key="item.id">
      <td>{{item.Address.name}}</td>
      <td>{{item.Address.city}}</td>
      <td>{{item.Payment[0].amount}}</td>
      <!-- <td><button class="btn btn-primary btn-sm" v-on:click="loadUserProfile(item.User)">Profile</button></td> -->
      <td><button class="btn btn-success btn-sm" v-on:click="loadUserAddress(item.Address)">Address</button></td>
      <td><button class="btn btn-danger btn-sm" v-on:click="fetchBill(item.orderId)">Bill</button></td>
      <td>{{item.status}}</td>
      <td>
        <span v-if="isShippingInfoAvl(item)">{{item.Payment[0].OrderDispatch['trackingId']}}</span>        
      </td>
      <td>
        <span v-if="isShippingInfoAvl(item)">{{item.Payment[0].OrderDispatch['courierName']}}</span>        
      </td>
      <td>
        <button v-if="!isShippingInfoAvl(item)" class="btn btn-warning btn-sm" v-on:click="showDispatchForm(item.Payment[item.Payment.length-1])">Add Shipping info</button>
        <button v-else-if="item.status == 'shipped'" @click="showDeliverDialog(item)" class="btn btn-info">Mark as delivered</button>
      </td>
      <td>{{item.orderId}}</td>
      <td>{{item.Payment[0].paymentId}}</td>
    </tr>    
  </tbody>
</table>
  </div>
<w-overlay v-model="showUserOverlay">
	<user-profile :user="currUser"></user-profile>
</w-overlay>

<w-overlay v-model="showAddressOverlay">
	<user-address :address="currAddress"></user-address>
</w-overlay>

<w-overlay v-model="showDispatchFormOverlay">
	<dispatch-form @sendDispatchNotification="sendDispatchNotificationToStore" :paymentId="currPaymentId"></dispatch-form>
</w-overlay>

<w-dialog
  v-model="markAsDeliveredDialog"
  :fullscreen="false"
  :width="300"
  :persistent="false"
  :persistent-no-animation="false"
>
  
  <div>
    Are you sure to mark this order as delivered?
  </div>

  <template #actions>
    <button class="btn btn-success me-2" @click="markAsDelivered(item)">Proceed</button>
    <button class="btn btn-danger me-2" @click="markAsDeliveredDialog = false">Close</button>
  </template>
</w-dialog>
</template>

<script>
import UserProfile from './UserProfile.vue';
import UserAddress from './UserAddress.vue';
import DispatchForm from './DispatchForm.vue';
export default {
  data(){
    return {
      showUserOverlay: false,
      showAddressOverlay: false,
      showDispatchFormOverlay: false,
      markAsDeliveredDialog: false,
      currPaymentId: null,
      currItem: null,
      currUser: null,
      currAddress : null,
    }
  },
  emits: ['sendDispatchNotificationToParent','sendDeliverNotificationToParent'],
	props: ['summary'],
  components : {UserProfile, UserAddress, DispatchForm},
  methods: {
    loadUserProfile(user){
      this.currUser = user;
      this.showUserOverlay = true;
    },
    showDispatchForm(payment){
      console.log(payment);
      this.showDispatchFormOverlay = true;
      this.currPaymentId = payment["paymentId"];
    },
    showDeliverDialog(item){
      this.markAsDeliveredDialog = true;
      this.currItem = item;
    },
    loadUserAddress(address){
      this.currAddress = address;
      this.showAddressOverlay = true;
    },
    isShippingInfoAvl(item){
      if(item.Payment[0].OrderDispatch){
        return true
      }
      return false
    },
    markAsDelivered(){
      this.$emit('sendDeliverNotificationToParent', this.currItem.orderId);
    },
    fetchBill(orderId){
      this.$emit('fetchBillNotification', orderId);
    },
    sendDispatchNotificationToStore(paymentId, trackingId, courier){
      this.$emit('sendDispatchNotificationToParent', paymentId, trackingId, courier);
    }
  }
}
</script>

<style>

</style>