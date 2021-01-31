<template>
  <div>
    <NavBar />
    <v-container fluid>
      <v-flex xs10 sm12 md10 class="pa-md-4 mx-lg-auto">
        <ProductForm></ProductForm>
      </v-flex>

      <!--divider -->
      <v-flex xs10 sm12 md10 class="pa-md-4 mx-lg-auto">
        <ProductList></ProductList>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/Navbar.vue";
import ProductForm from "@/components/ProductForm.vue";
import ProductList from "@/components/ProductList.vue";

export default {
  name: "Home",
  components: {
    NavBar,
    ProductList,
    ProductForm,
  },
};
</script>
