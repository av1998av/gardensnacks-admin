<template>
  <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Address</h5>
    <p class="card-text">
      {{address.name}}<br>
      {{address.door}}<br>
      {{address.street}}<br>
      {{address.state}}<br>
      {{address.pincode}}<br>
    </p>    
    <p class="card-text">
      {{address.phone}}
    </p>
  </div>
</div>
</template>

<script>
export default {
  props : ['address']
}
</script>

<style>

</style>