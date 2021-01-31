<template>
  <v-container fluid>
    <v-layout align-center justify-center wrap>
      <v-flex xs10 sm12 md5>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-spacer></v-spacer>

            <v-card-text>
              <v-text-field
                v-model="formSchema.email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>

              <v-text-field
                type="password"
                v-model="formSchema.password"
                :rules="passwordRules"
                label="Password"
                required
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <div v-if="isSuccess">
                <v-progress-circular :width="3" color="red" indeterminate>
                </v-progress-circular>
              </div>
              <div v-if="isSuccess">
                <p style="color: green;">Login Successfull...</p>
              </div>
              <div v-if="isFailed">
                <p style="color: red;">
                  Login failed! Invalid email or password
                </p>
              </div>
              <v-spacer></v-spacer>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="onSubmit"
              >
                <v-icon>mdi-key</v-icon>
                Login
              </v-btn>

              <v-btn color="warning" @click="resetValidation">
                <v-icon>mdi-recycle</v-icon>Reset
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { loginUser, isLoggedIn } from "./../utils/auth";
export default {
  data() {
    return {
      isLoggedIn: false,
      valid: true,
      formSchema: {
        email: "",
        password: "",
      },
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "Password must at least 6 characters",
      ],
      isSuccess: false,
      isFailed: false,
    };
  },
  methods: {
    async onSubmit() {
      if (this.$refs.form.validate()) {
        try {
          await loginUser(this.formSchema.email, this.formSchema.password);
          isLoggedIn();
          this.$router.push("/home");
        } catch (error) {
          this.message = "Invalid Credentials...";
        }
      } else {
        console.log(new Error("Invalid !!"));
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style></style>
