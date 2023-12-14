<template>
  <login-form></login-form>
</template>

<script>
import LoginForm from '@/components/login/LoginForm.vue'
import { mapState } from 'pinia'
import { useUserStore } from '../stores/user'
export default {
  components: { LoginForm },
  methods: {
    ...mapState(useUserStore, {
      isLoggedIn: 'isLoggedIn'
    }),
  },
  created(){
    if(this.isLoggedIn()){
      this.$router.push({ name : 'orders' })
    }
  }
}
</script>

<style>

</style>