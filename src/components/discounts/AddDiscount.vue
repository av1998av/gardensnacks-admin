<template>
  <div class="card">
  <div class="card-body">
    <h5 class="card-title float-start">Add Discount</h5>
	<br><br>
	<div class="mb-3">
		<label class="form-label float-start">Code</label>
		<input type="text" v-model="code" class="form-control">
	</div>
	<div class="mb-3">
		<label class="form-label float-start">Percent</label>
		<input type="decimal" v-model="percent" class="form-control">
	</div>
	<button v-on:click="addDiscountNotificationFromForm" class="btn btn-primary w-100">Submit</button>
  </div>
</div>
</template>

<script>
export default {
	data(){
		return {
			code: '',
			percent: 0
		}
	},
	emits: ['addDiscountNotification'],
	methods: {
		addDiscountNotificationFromForm(){
			this.$emit('addDiscountNotification', this.code, this.percent)
		}
	}
}
</script>

<style>

</style>