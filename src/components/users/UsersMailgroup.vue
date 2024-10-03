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
        <label class="form-label">Select Message Group</label>
        <select v-model="chosenMessageGroupId" class="form-select">
          <option v-for="item in messageGroups" :key="item.id" :value="item.id">{{item.name}}</option>      
        </select>
      </div>
      <button v-on:click="sendAddUsersToMessageGroupNotification()" class="btn btn-primary">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['selectedUserIds','messageGroups'],
  emits: ['addUsersToMessageGroupNotificationToParent'],
  data(){
		return {
      chosenMessageGroupId: null,
			showAddDiscountOverlay: false
		}
	},
  methods: {
    sendAddUsersToMessageGroupNotification(){
      this.$emit('addUsersToMessageGroupNotificationToParent', this.chosenMessageGroupId);
    }
  }
}
</script>

<style>

</style>