<template>
<div class="table-responsive text-center">
	<table class="table mt-5 mx-auto">
		<thead>
			<th scope="col">Id</th>
			<th scope="col">Code</th>
			<th scope="col">Percent</th>
			<th scope="col">Status</th>
			<th scope="col">Action</th>
		</thead>
		<tbody>
			<tr v-for="item in discounts" :key="item.id">
				<td>{{item.id}}</td>
				<td>{{item.code}}</td>
				<td>{{item.percent*100}}</td>
				<td>{{item.isLive}}</td>
				<td>
					<button v-if="item.isLive" @click="deactivateDiscountNotificationToStore(item.id)" class="btn btn-danger">Deactivate</button>
					<button v-else @click="activateDiscountNotificationToStore(item.id)" class="btn btn-primary">Activate</button>
				</td>
			</tr>
		</tbody>
	</table>
	<w-overlay v-model="showAddDiscountOverlay">
		<add-discount @addDiscountNotification=addDiscountNotificationToStore></add-discount>
	</w-overlay>
</div>
<button class="btn btn-lg btn-success w-100" @click="showAddDiscountOverlay = true">Add Discount</button>
</template>

<script>
import AddDiscount from './AddDiscount.vue';
export default {
	props: ['discounts'],
	emits: ['addDiscountNotificationToParent', 'deactivateDiscountNotificationToParent'],
	components : {AddDiscount},
	data(){
		return {
			showAddDiscountOverlay: false
		}
	},
	methods: {
		addDiscountNotificationToStore(code, percent){
			this.showAddDiscountOverlay = false;
			this.$emit('addDiscountNotificationToParent', code, percent);
		},
		deactivateDiscountNotificationToStore(discountId){
			this.$emit('deactivateDiscountNotificationToParent', discountId)
		},
		activateDiscountNotificationToStore(discountId){
			this.$emit('activateDiscountNotificationToParent', discountId)
		}
	}
}
</script>

<style>

</style>