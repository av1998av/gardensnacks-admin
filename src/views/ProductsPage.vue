<template>
<base-spinner v-if="isLoading" />
<div v-else class="container">
    <div class="mt-4"><p class="h3">Products</p></div>
    <product-grid :products=products></product-grid>
</div>
</template>

<script>
import ProductGrid from '@/components/products/ProductGrid.vue';
import { mapActions, mapState } from 'pinia'
import { useProductStore } from '../stores/product';
import { useUserStore } from '../stores/user';
export default {
	components: {ProductGrid},
	data(){
		return {
			products: [],
            isLoading: false
		}
	},
	methods: {
		...mapActions(useProductStore, ['fetchProducts']),
        ...mapState(useUserStore, {
            getToken: 'getToken'
        }),
		...mapState(useProductStore, {
            getProducts: 'getProducts'
        }),
        async fetchPorductsFromStore(){            
            try{
				this.isLoading = true;
                var token = this.getToken();
				var success = await this.fetchProducts(token);
                if(success){
                    this.isLoading = false;
                    this.products = this.getProducts();
                    console.log(this.products);
                }
            }
            catch(error){
                console.log(error);
            }
        },
	},
	created(){
      	this.fetchPorductsFromStore();
    }
}
</script>

<style>

</style>