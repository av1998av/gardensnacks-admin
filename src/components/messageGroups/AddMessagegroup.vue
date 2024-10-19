<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title float-start">Add MessageGroup</h5>
      <br><br>
      <div class="mb-3">
        <label class="form-label float-start">Name</label>
        <input type="text" v-model="name" class="form-control">
      </div>
      <div class="mb-3">
        <label class="form-label float-start">Category</label>
        <select v-model="category" class="form-control">
          <option value="email">Email</option>
          <option value="whatsapp">Whatsapp</option>
        </select>
      </div>
      <button v-on:click="addMessagegroupNotificationFromForm" class="btn btn-primary w-100">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      name: '',
      category: 'Email'
    }
  },
  emits: ['addMessagegroupNotification'],
  methods: {
		addMessagegroupNotificationFromForm(){
			this.$emit('addMessagegroupNotification', this.name, this.category)
		}
	}
}
</script>

<style>

</style>