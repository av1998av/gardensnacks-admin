<template>
  <div class="table-responsive text-center">
	<table class="table mt-5 mx-auto">
		<thead>
			<th scope="col">Id</th>
			<th scope="col">Code</th>
			<th scope="col">Percent</th>
			<th scope="col">Status</th>
			<th scope="col">Action</th>
		</thead>
		<tbody>
			<tr v-for="item in discounts" :key="item.id">
				<td>{{item.id}}</td>
				<td>{{item.code}}</td>
				<td>{{item.percent*100}}</td>
				<td>{{item.isLive}}</td>
				<td><button v-if="item.isLive" class="btn btn-primary">Deactivate</button></td>
			</tr>
		</tbody>
	</table>
  </div>
</template>

<script>
export default {
	props: ['discounts'],
}
</script>

<style>

</style>