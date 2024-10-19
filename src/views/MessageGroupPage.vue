<template>
  <base-spinner v-if="isLoading"></base-spinner>
  <div v-else class="container">
    <div class="mt-4"><p class="h3">Message Groups</p></div>
    <messagegroup-grid
      :messageGroups="messageGroups"
      @addMessagegroupNotificationToParent=addMessagegroupNotification
    ></messagegroup-grid>
  </div>  
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useUserStore } from '../stores/user';
import { useMessageGroupStore } from '../stores/messageGroup';
import MessagegroupGrid from '../components/messageGroups/MessagegroupGrid.vue';
export default {
  components : { MessagegroupGrid },
  data(){
    return {
      isLoading: false,
      messageGroups: []
    }
  },
  methods: {
    ...mapActions(useMessageGroupStore, ['fetchMessageGroups','createMessageGroup','deactivateMessageGroup','activateMessageGroup']),
    ...mapState(useUserStore, {
      getToken: 'getToken'
    }),
    ...mapState(useMessageGroupStore, {
      getMessageGroups: 'getMessageGroups'
    }),
    async fetchMessageGroupsFromStore(){            
      try{
        this.isLoading = true;
        var token = this.getToken();
        var success = await this.fetchMessageGroups(token);
        if(success){
          this.isLoading = false;
          this.messageGroups = this.getMessageGroups();          
        }
      }
      catch(error){
        console.log(error);
      }
    },
    async addMessagegroupNotification(name, category){
      try{
        this.isLoading = true;
        var token = this.getToken();
        var success = await this.createMessageGroup({name, category}, token);
        if(success){
          this.isLoading = false;
          this.fetchMessageGroupsFromStore();
        }
      }
      catch(error){
        console.log(error);
      }
    },
  },
  created(){
    this.fetchMessageGroupsFromStore();
  }
}
</script>

<style>

</style>