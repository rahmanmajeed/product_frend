<template>
  <nav>
    <v-toolbar>
      <!--      <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <!-- <v-app-bar-nav-icon class="grey--text"></v-app-bar-nav-icon> -->
      <v-toolbar-title class="grey--text">
        <v-icon>mdi-account </v-icon>
        <span class="font-weight-light">Majedur</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn @click="logout()" color="error">
        <v-icon>mdi-exit-to-app </v-icon>
        <span>Sign Out</span>
        <!-- <v-icon right>exit_to_app</v-icon> -->
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app class="primary">
      <p>test</p>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { logoutUser } from "./../utils/auth";

export default {
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    async logout() {
      await logoutUser();
      this.$router.push({ path: "/" });
    },
  },
};
</script>
