<template>
  <v-container fluid>
    <v-layout align-center justify-center wrap>
      <v-flex xs10 sm12 md5 class="pa-md-4 mx-lg-auto">
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
                <p style="color: green;">Login Processing...</p>
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
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="register">
            <u>Are you New ? please Register</u>
          </v-btn>
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
          this.isSuccess = true;
          this.isFailed = false;
          await loginUser(this.formSchema.email, this.formSchema.password);
          isLoggedIn();
          setTimeout(() => {
            this.isSuccess = false;
            this.$router.push("/home");
          }, 1000);
        } catch (error) {
          this.isFailed = true;
          this.isSuccess = false;
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
      this.isFailed = false;
      this.$refs.form.resetValidation();
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style></style>
