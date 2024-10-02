<template>
  <div class="card" style="width: 25rem;height:20rem">
    <div class="card-body">
      <h5 class="card-title">Add Users to MailGroup</h5>
      <div class="mb-3">
        <label class="form-label">User Ids</label>
        <br>
        {{selectedUserIds}}
        <br><br>
        <p>{{selectedUserIds.length}} Users</p>
      </div>
      <div class="mb-3">
        <label class="form-label">Message Group</label>
        <input type="text" v-model="trackingId" class="form-control">
      </div>
      <button class="btn btn-primary">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['selectedUserIds'],
  data(){
		return {
			showAddDiscountOverlay: false
		}
	},
}
</script>

<style>

</style>