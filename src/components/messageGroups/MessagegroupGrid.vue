<template>
  <div class="table-responsive text-center">
    <table class="table mt-5 mx-auto">
      <thead>
        <th scope="col">Id</th>
        <th scope="col">Name</th>
        <th scope="col">Category</th>
        <th scope="col">Users #</th>
      </thead>
      <tbody>
        <tr v-for="item in messageGroups" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.category}}</td>
          <td>{{item.userCount}}</td>
        </tr>
      </tbody>
    </table>
    <w-overlay v-model="showAddMessageGroupOverlay">
		  <add-messagegroup @addMessagegroupNotification=addMessagegroupNotificationToStore></add-messagegroup>
	  </w-overlay>
  </div>
  <button class="btn btn-lg btn-success w-100" @click="showAddMessageGroupOverlay = true">Add Message Group</button>
</template>

<script>
import AddMessagegroup from './AddMessagegroup.vue'
export default {
  props: ['messageGroups'],
  emits: ['addMessagegroupNotificationToParent'],
  components: {AddMessagegroup},
  data(){
    return {
      showAddMessageGroupOverlay: false,
    }
  },
  methods: {
    addMessagegroupNotificationToStore(name, category){
			this.showAddMessageGroupOverlay = false;
			this.$emit('addMessagegroupNotificationToParent', name, category);
		},
  }
}
</script>

<style>

</style>