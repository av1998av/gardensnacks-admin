<template>
  <base-spinner v-if="isLoading"></base-spinner>
  <div class="container">
    <div class="mt-4"><p class="h3">Discounts</p></div>
    <discount-grid></discount-grid>
  </div>
</template>

<script>
import DiscountGrid from '../components/discounts/DiscountGrid.vue';
export default {
	components : { DiscountGrid },
  data(){
    return {
      isLoading: false
    }
  }
}
</script>

<style>

</style>