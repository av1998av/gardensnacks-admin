<template>
<div class="mx-auto" style="width:95%">
  <div class="mt-4"><p class="h3">Users</p></div>
  <users-grid class="mt-3"></users-grid>
</div>
  <!-- <users-grid></users-grid> -->
</template>

<script>
import UsersGrid from '../components/users/UsersGrid.vue';
export default {
  components : { UsersGrid },
}
</script>

<style>

</style>