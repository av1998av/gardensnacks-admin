<template>
<button class="btn btn-warning">Add</button>
  <table class="table mt-2">
	<thead>
		<tr>
			<th>ID</th>
			<th>Name</th>
			<th>Description</th>
			<th>Subtitle</th>
			<th>Edit</th>
		</tr>
	</thead>
	<tbody>
		<tr v-for="item in products" :key="item.id">
			<td>{{item.id}}</td>			
			<td>{{item.name}}</td>
			<td>{{item.subtitle}}</td>
			<td><img :src="item.image" alt="" style="max-height:260px;max-width:250px"></td>
			<td><button class="btn btn-primary">Edit</button></td>
		</tr>
	</tbody>
  </table>
</template>

<script>
export default {
	props: ['products'],
}
</script>

<style>

</style>