<template>
  <nav>
    <v-toolbar>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <v-icon left>mdi-account-circle</v-icon>
            <span>{{ username }}</span>
          </v-btn>
        </template>
        <!-- <v-list> -->
        <!-- v-list-tile is changed to v-list-item -->
        <!-- <v-list-item> -->
        <!-- <v-list-item-title>{{ link.text }}</v-list-item-title> -->
        <!-- </v-list-item> -->
        <!-- </v-list> -->
      </v-menu>

      <v-btn @click="logout()" color="error">
        <v-icon>mdi-exit-to-app </v-icon>
        <span>Sign Out</span>
        <!-- <v-icon right>exit_to_app</v-icon> -->
      </v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
import { logoutUser } from "./../utils/auth";

export default {
  props: ["username"],
  data() {
    return {
      drawer: false,
      links: [
        { icon: "home", text: "Home", route: "/" },
        { icon: "contacts", text: "About", route: "/about" },
      ],
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
