<template>
  <div>
    <v-container fluid>
      <v-card color="#eeeeee lighten-2">
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Title"
                  required
                  :rules="[v => !!v || 'Title is required']"
                  v-model="formSchema.title"
                ></v-text-field>
              </v-col>
              <v-col cols="3" sm="4">
                <v-textarea
                  clearable
                  clear-icon="mdi-close-circle"
                  label="Description"
                  value=""
                  rows="1"
                  :rules="[v => !!v || 'Description is required']"
                  v-model="formSchema.description"
                ></v-textarea>
              </v-col>
              <v-col cols="3" sm="4">
                <v-text-field
                  label="Price"
                  :rules="priceRules"
                  required
                  v-model="formSchema.price"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" sm="4">
                <input
                  type="file"
                  id="image"
                  class="form-control"
                  @change="getImage"
                />
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="onSubmit"
              >
                {{ btnTitle }}
              </v-btn>

              <v-btn color="error" class="mr-4" @click="reset">
                Reset
              </v-btn>
            </v-card-actions>
          </v-container>
        </v-form>
      </v-card>
      <!--end -->
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { createProduct,updateProduct } from "./../utils/product";
export default {
  name: "Product-Form",
  props: ["formSchema"],
  data() {
    return {
      valid: true,
      priceRules: [
        v => !!v || "Price is required",
        v => /^\d+(?:[.,]\d+)*$/gm.test(v) || "Price must be valid format"
      ]
    };
  },
  computed: {
    btnTitle() {
      return this.formSchema.id > 0 ? "Update" : "Create";
    },
    formTitle() {
      return this.formSchema.id > 0 ? "Update Product" : "Create Product";
    }
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        if (this.formSchema.id > 0) {
          updateProduct(this.formSchema)
            .then(res => {
              this.reset();
              this.formSchema.id = 0
              this.formSchema.image = ""
              this.$emit("onClose", res, "update");
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          createProduct(this.formSchema)
            .then(res => {
              this.reset();
              this.$emit("onClose", res, "create");
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    getImage(e) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = e => {
        this.formSchema.image = e.target.result;
      };
    }
  }
};
</script>
