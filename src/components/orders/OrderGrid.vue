<template>
  <table class="table mt-5">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in summary" :key="item.id">
      <th scope="row">1</th>
      <td>{{item.orderId}}</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>    
  </tbody>
</table>
<user-profile></user-profile>
</template>

<script>
import UserProfile from './UserProfile.vue';
export default {
	props: ['summary'],
  components : {UserProfile}
}
</script>

<style>

</style>