<template>
  <table class="table mt-5">
  <thead>
    <tr>
      <th scope="col">OrderId</th>
      <th scope="col">Profile</th>
      <th scope="col">Address</th>
      <th scope="col">Bill</th>
      <th scope="col">Status</th>
      <th scope="col">Shipping Id</th>
      <th scope="col">Shiping info</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in summary" :key="item.id">
      <td>{{item.orderId}}</td>
      <td><button class="btn btn-primary btn-sm" v-on:click="loadUserProfile(item.User)">Profile</button></td>
      <td><button class="btn btn-success btn-sm" v-on:click="loadUserAddress(item.Address)">Address</button></td>
      <td><button class="btn btn-danger btn-sm">Bill</button></td>
      <td>{{item.status}}</td>
      <td>
        <span v-if="isShippingInfoAvl(item)">{{item.Payment[0].OrderDispatch['trackingId']}}</span>        
      </td>
      <td>
        <span v-if="isShippingInfoAvl(item)">{{item.Payment[0].OrderDispatch['courierName']}}</span>        
        <button v-else class="btn btn-warning btn-sm">Add Shipping info</button>
      </td>
    </tr>    
  </tbody>
</table>
<w-overlay v-model="showUserOverlay">
	<user-profile :user="currUser"></user-profile>
</w-overlay>

<w-overlay v-model="showAddressOverlay">
	<user-address :address="currAddress"></user-address>
</w-overlay>
</template>

<script>
import UserProfile from './UserProfile.vue';
import UserAddress from './UserAddress.vue';
export default {
  data(){
    return {
      showUserOverlay: false,
      showAddressOverlay: false,
      currUser: null,
      currAddress : null,
    }
  },
	props: ['summary'],
  components : {UserProfile, UserAddress},
  methods: {
    loadUserProfile(user){
      this.currUser = user;
      this.showUserOverlay = true;
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
    }
  }
}
</script>

<style>

</style>