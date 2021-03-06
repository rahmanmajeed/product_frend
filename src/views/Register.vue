<template>
  <v-container fluid>
    <v-layout align-center justify-center wrap>
      <v-flex xs10 sm12 md8 class="pa-md-4 mx-lg-auto">
        <v-card class="elevation-12">
          <v-toolbar dark color="success">
            <v-toolbar-title>Register form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-spacer></v-spacer>

            <v-card-text>
              <v-text-field
                v-model="formSchema.name"
                :rules="[(v) => !!v || 'Name is required']"
                label="Name"
                required
              ></v-text-field>

              <v-text-field
                v-model="formSchema.email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>

              <v-row>
                <v-col cols="3" sm="6">
                  <v-text-field
                    type="password"
                    v-model="formSchema.password"
                    :rules="passwordRules"
                    label="Password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="3" sm="6">
                  <v-text-field
                    type="password"
                    v-model="formSchema.password_confirmation"
                    :rules="[
                      rules.confirm_pass_Rules(
                        formSchema.password_confirmation,
                        formSchema.password
                      ),
                    ]"
                    label="Confirm Password"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <div v-if="isSuccess">
                <v-progress-circular :width="3" color="red" indeterminate>
                </v-progress-circular>
              </div>
              <div v-if="isSuccess">
                <p style="color: green;">Processing...</p>
              </div>
              <div v-if="isFailed">
                <p style="color: red;">
                  Registration failed!
                </p>
              </div>
              <v-spacer></v-spacer>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="onSubmit"
              >
                <v-icon>mdi-server</v-icon>
                Register
              </v-btn>

              <v-btn color="warning" @click="resetValidation">
                <v-icon>mdi-recycle</v-icon>Reset
              </v-btn>
            </v-card-actions>
          </v-form>
          <v-spacer></v-spacer>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { register } from "./../utils/auth";
export default {
  data() {
    return {
      isLoggedIn: false,
      valid: true,
      formSchema: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "Password must at least 6 characters",
      ],

      rules: {
        confirm_pass_Rules: (v, v1) => {
          if (v === v1) {
            return true;
          } else {
            return "Password doesn't match";
          }
        },
      },
      isSuccess: false,
      isFailed: false,
    };
  },
  methods: {
    async onSubmit() {
      if (this.$refs.form.validate()) {
        try {
          this.isSuccess = true;
          await register(this.formSchema);
          setTimeout(() => {
            this.isSuccess = false;
            this.$router.push("/");
          }, 2000);
        } catch (error) {
          this.isFailed = true;
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
  },
};
</script>

<style></style>
