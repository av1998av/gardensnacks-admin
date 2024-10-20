<template>
  <div class="table-responsive">
    <table class="table mt-5">
      <thead>
        <tr>
          <th>Name</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in jobs" :key=item>
          <td>{{item['name']}}</td>
          <td>{{item['next_run_time']}}</td>
        </tr>
      </tbody>
    </table>
    <w-overlay v-model="showAddJobOverlay">
		  <add-job @addJobNotification=addJobNotificationToStore></add-job>
	  </w-overlay>
  </div>
  <button class="btn btn-lg btn-success w-100" @click="showAddJobOverlay = true">Add Job</button>
</template>

<script>
import AddJob from './AddJob.vue';
export default {
  components: {AddJob},
  props: ['jobs'],
  data(){
    return {
      showAddJobOverlay: false
    }
  },
  methods: {
    addJobNotificationToStore(templateId, timestamp, messageGroup, content){
			this.showAddJobOverlay = false;
			this.$emit('addJobNotificationToParent', templateId, timestamp, messageGroup, content);
		},
  }
}
</script>

<style>

</style>