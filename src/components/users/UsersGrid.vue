<template>
<div>
  <w-table
  :headers="table.headers"
  :items="table.items"
  fixed-headers
  fixed-footer
  :fetch="fetch"
  :pagination="table.pagination"
  :loading="table.loading"
  style="max-height: 1000px"
>
</w-table>
</div>
</template>

<script>
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker'
export default {
  data(){
    return {
    table: {
      headers: [
        { label: 'ID', key: 'id' },
        { label: 'First name', key: 'firstName' },
        { label: 'Last name', key: 'lastName' },
        { label: 'Birthdate', key: 'birthdate1' },
        { label: 'Birthdate', key: 'birthdate2' },
        { label: 'Birthdate', key: 'birthdate3' },
      ],
      items: [], // The frontend has no data by default.
      loading: false,
      pagination: {
        page: 17,
        itemsPerPage: 25,
        total: 2000,
        itemsPerPageOptions: []
      }
    }
  }
  },
  methods: {
    // All these parameters are available from Wave UI.
    fetch ({ page, start, end, total, itemsPerPage, sorting }) {
      const tableItemsInApi = Array(2000).fill('').map((item, i) => ({
  id: i + 1,
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  birthdate1: (faker.date.birthdate()).toISOString().substring(0, 10),
  birthdate2: (faker.date.birthdate()).toISOString().substring(0, 10),
  birthdate3: (faker.date.birthdate()).toISOString().substring(0, 10)
}))
      this.table.loading = 'header' // Display the loading bar.

      // Simulating a call to the backend with a delay of 1 second.
      // Once you receive the rows from the backend assign them to the table.items var.
      setTimeout(() => {
        const itemsFromApi = tableItemsInApi.slice(0) // Clone the array before sorting.
        if (sorting.length) {
          const sortKey = sorting[0].substring(1)
          itemsFromApi.sort((a, b) => {
            if (sorting[0][0] === '+') return a[sortKey] < b[sortKey] ? -1 : 1
            else return a[sortKey] > b[sortKey] ? -1 : 1
          })
        }
        this.table.items = itemsFromApi.slice(start - 1, end)
        this.table.loading = false
      }, 1000)
    }
  }
}
</script>

<style>

</style>