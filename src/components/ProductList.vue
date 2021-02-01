<template>
  <div>
    <v-container fluid>
      <v-card color="#e0e0e0 lighten-2">
        <v-card-title>
          <h3>Product List</h3>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-title>
          <!-- <span class="headline">Project's Vehicle List</span> -->
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <template>
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            :search="search"
            class="elevation-1"
          ></v-data-table>
        </template>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Product-List",
  props: ["formSchema"],
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Title",
          align: "start",
          sortable: false,
          value: "title",
        },
        { text: "Description", value: "description" },
        { text: "Price (tk)", value: "price" },
        { text: "Image", value: "image" },
        { text: "Action" },
      ],
      desserts: [
        {
          title: "Frozen Yogurt",
          description: 159,
          price: 6.0,
          image: 24,
          protein: 4.0,
        },
        {
          title: "Ice cream sandwich",
          description: 237,
          price: 9.0,
          image: 37,
          protein: 4.3,
        },
        {
          title: "Eclair",
          description: 262,
          price: 16.0,
          image: 23,
          protein: 6.0,
        },
      ],
    };
  },
};
</script>
