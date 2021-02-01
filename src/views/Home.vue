<template>
  <div>
    <NavBar :username="userName" />
    <v-container fluid>
      <v-flex xs10 sm10 md10 class="pa-md-4 mx-lg-auto">
        <ProductForm
          :formSchema="formSchema"
          @onSubmit="createProduct"
        ></ProductForm>
      </v-flex>

      <!--divider -->
      <v-flex xs10 sm10 md10 class="pa-md-4 mx-lg-auto">
        <ProductList :formSchema="formSchema"></ProductList>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/Navbar.vue";
import ProductForm from "@/components/ProductForm.vue";
import ProductList from "@/components/ProductList.vue";
import { createProduct, updateProduct } from "./../utils/product";
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
    createProduct(formValue) {
      this.formSchema = formValue;
      if (this.formSchema.id > 0) {
        updateProduct(this.formSchema).then((res) => {
          console.log(res);
        });
      } else {
        createProduct(this.formSchema).then((res) => {
          console.log(res);
        });
      }
    },
  },
  mounted() {},
};
</script>
