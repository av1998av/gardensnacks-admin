<template>
  <base-spinner v-if="isLoading"></base-spinner>
  <div v-else class="container">
    <div class="mt-4"><p class="h3">Jobs</p></div>
    <jobs-grid 
      :jobs=jobs
      @addJobNotificationToParent=addJobNotification
    >
    </jobs-grid>
  </div>
</template>

<script>
import JobsGrid from '@/components/jobs/JobsGrid.vue';
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores/user'
import { useJobStore } from '../stores/job';
export default {
	components: { JobsGrid },
  data(){
    return {
      jobs: [],
      isLoading: false
    }
  },
  methods: {
    ...mapActions(useJobStore, ['fetchJobs','createJob']),
    ...mapState(useUserStore, {
      getToken: 'getToken'
    }),
    ...mapState(useJobStore, {
      getJobs: 'getJobs'
    }),
    async fetchJobsFromStore(){            
      try{
        this.isLoading = true;
        var token = this.getToken();
        var success = await this.fetchJobs(token);
        if(success){
            this.isLoading = false;
            this.jobs = this.getJobs();              
        }
      }
      catch(error){
        console.log(error);
      }
    },
    async addJobNotification(templateId, timestamp, messageGroup, content){
      try{
        this.isLoading = true;
        var token = this.getToken();
        var success = await this.createJob({templateId, timestamp, messageGroup, content}, token);
        if(success){
          this.isLoading = false;
          this.fetchJobsFromStore();
        }
      }
      catch(error){
        console.log(error);
      }
    },
  },
  created(){
    this.fetchJobsFromStore();
  }
}
</script>

<style>

</style>