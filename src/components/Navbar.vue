<template>
  <nav>
    <v-toolbar>
      <!--      <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <!-- <v-app-bar-nav-icon class="grey--text"></v-app-bar-nav-icon> -->

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <!-- <v-btn text slot="activator"> -->
          <v-btn text v-on="on">
            <v-icon left>mdi-account-circle</v-icon>
            <span>Majed</span>
          </v-btn>
        </template>
        <v-list>
          <!-- v-list-tile is changed to v-list-item -->
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
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
