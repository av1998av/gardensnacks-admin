<template>
  <div v-if="isLoggedIn()">
    <header-bar></header-bar>
    <RouterView />
  </div>
  <div v-else>
    <RouterView />
  </div>  
</template>


<script>
import { RouterLink, RouterView } from 'vue-router'
import HeaderBar from '@/components/HeaderBar.vue'
import { mapActions, mapState } from 'pinia'
import { useUserStore } from './stores/user'

export default {
  components: { HeaderBar },
  methods: {
    ...mapState(useUserStore, {
      isLoggedIn: 'isLoggedIn',
    }),
  }
}
</script>

<style scoped>
</style>
