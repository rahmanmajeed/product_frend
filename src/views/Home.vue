<template>
  <div>
    <NavBar :username="userName" />
    <v-container fluid>
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        :color="color"
        absolute
        right
        rounded="pill"
        top
      >
        {{ message }}

        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <v-flex xs10 sm10 md10 class="pa-md-4 mx-lg-auto">
        <ProductForm :formSchema="formSchema" @onClose="close"></ProductForm>
      </v-flex>

      <!--divider -->
      <v-flex xs10 sm10 md10 class="pa-md-4 mx-lg-auto">
        <ProductList
          :formSchema="formSchema"
          @editItem="setEditItem"
          @onDelete="close"
          :updateList="isUpdateList"
        ></ProductList>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/Navbar.vue";
import ProductForm from "@/components/ProductForm.vue";
import ProductList from "@/components/ProductList.vue";
// import { createProduct, updateProduct } from "./../utils/product";
export default {
  name: "Home",
  components: {
    NavBar,
    ProductList,
    ProductForm,
  },
  data() {
    return {
      user: "",
      formSchema: {
        id: 0,
        title: "",
        description: "",
        price: "",
        image: "",
      },
      snackbar: false,
      message: "",
      timeout: 2000,
      color: "success",
      isUpdateList: false,
    };
  },
  computed: {
    userName() {
      return localStorage.getItem("Username")
        ? localStorage.getItem("Username")
        : "User";
    },
  },
  methods: {
    close(res, status) {
      console.log(res, status);
      if (status === "create") {
        this.message = "product create successfully";
        this.color = "success";
        this.snackbar = true;
      } else if (status === "update") {
        this.message = "product update successfully";
        this.color = "success";
        this.snackbar = true;
      } else if (status === "delete") {
        this.color = "error";
        this.message = "product delete successfully";
        this.snackbar = true;
      }
      this.isUpdateList = true;
      setTimeout(() => {
        this.snackbar = false;
        this.isUpdateList = false;
      }, 2000);
    },
    setEditItem(item) {
      this.formSchema = item;
    },
  },
  mounted() {},
};
</script>
