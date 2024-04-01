<template>
  <div class="card" style="width: 25rem;height:20rem">
  <div class="card-body">
    <h5 class="card-title">{{paymentId}}</h5>
    <div class="mb-3">
			<label class="form-label">Courier</label>
			<input type="text" v-model="courier" class="form-control">
		</div>
		<div class="mb-3">
			<label class="form-label">Tracking Id</label>
			<input type="text" v-model="trackingId" class="form-control">
		</div>
		<button v-on:click="sendDispatchNotificationFromForm()" class="btn btn-primary">Submit</button>
  </div>
</div>
</template>

<script>
export default {
  props : ['paymentId'],
  emits: ['sendDispatchNotification'],
  data(){
	return {
		courier: 'ST COURIERS',
		trackingId : ''
	}
  },
  methods: {
	sendDispatchNotificationFromForm(){
		this.$emit('sendDispatchNotification', this.paymentId, this.trackingId, this.courier)
	}
  }
}
</script>

<style>

</style>