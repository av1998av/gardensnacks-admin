<template>
  <base-spinner v-if="isLoading"></base-spinner>
  <div class="container">
    <div class="mt-4"><p class="h3">Discounts</p></div>
    <discount-grid :discounts=discounts @addDiscountNotificationToParent=addDiscountNotification></discount-grid>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useDiscountStore } from '../stores/discount';
import { useUserStore } from '../stores/user';
import DiscountGrid from '../components/discounts/DiscountGrid.vue';
export default {
	components : { DiscountGrid },
  data(){
    return {
      isLoading: false,
      discounts: []
    }
  },
  methods: {
    ...mapActions(useDiscountStore, ['fetchDiscounts','createDiscount']),
    ...mapState(useUserStore, {
      getToken: 'getToken'
    }),
    ...mapState(useDiscountStore, {
      getDiscouints: 'getDiscounts'
    }),
    async fetchDiscountsFromStore(){            
      try{
        this.isLoading = true;
        var token = this.getToken();
        var success = await this.fetchDiscounts(token);
        if(success){
          this.isLoading = false;
          this.discounts = this.getDiscouints();
          console.log(this.discounts);
        }
      }
      catch(error){
        console.log(error);
      }
    },
    async addDiscountNotification(code, percent){
      try{
        this.isLoading = true;
        var token = this.getToken();
        var success = await this.createDiscount({code, percent}, token);
        if(success){
          this.isLoading = false;
          this.fetchDiscountsFromStore();
        }
      }
      catch(error){
        console.log(error);
      }
    }
  },
  created(){
    this.fetchDiscountsFromStore();
  }
}
</script>

<style>

</style>