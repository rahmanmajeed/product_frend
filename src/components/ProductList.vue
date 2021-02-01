<template>
  <div>
    <v-container fluid>
      <!-- Confirmation delete box -->
      <v-layout row justify-center>
        <v-dialog v-model="confirmModel" max-width="290">
          <v-card>
            <v-card-text
              >Are you sure you want to delete this data?</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                flat="flat"
                @click.native="confirmModel = false"
                >Disagree</v-btn
              >
              <v-btn
                color="green darken-1"
                flat="flat"
                @click.native="confirmDelete(row_index, delete_id)"
              >
                Agree
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      <!-- /Confirmation delete box -->
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
            sort-by="title"
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-btn class="mx-0" icon>
                <v-icon small class="mr-2" @click="editItem(item)" color="teal">
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn class="mx-0" icon>
                <v-icon small @click="deleteItem(item)" color="pink">
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </template>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { allProduct, deleteProduct } from "./../utils/product";
// import {API_SERVER_URL} from './../../server'
export default {
  name: "Product-List",
  props: ["formSchema", "updateList"],
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
        { text: "Action", value: "actions", align: "center" },
      ],
      desserts: [],
      confirmModel: false,
    };
  },
  methods: {
    getAllProducts() {
      allProduct()
        .then((res) => {
          this.desserts = res.data.products;
          console.log(res.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editItem(item) {
      this.$emit("editItem", item);
    },
    deleteItem(item) {
      const res = confirm("Are you sure to Delete this Product. ?");
      if (res) {
        deleteProduct(item)
          .then((res) => {
            console.log(res);
            this.$emit("onDelete", res, "delete");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    confirmDelete(row_index, id) {
      console.log(row_index, id);
    },
  },
  watch: {
    updateList() {
      this.updateList ? this.getAllProducts() : "";
    },
  },

  mounted() {
    this.getAllProducts();
  },
};
</script>
