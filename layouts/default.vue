<template>
  <v-app dark>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
       <v-spacer></v-spacer>

  <v-tooltip v-if="$store.getters.isAuthenticated" bottom>
      <template v-slot:activator="{ on, attrs }">
        
         <v-btn icon v-bind="attrs"
          v-on="on" @click="onLogout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <span>{{fullName}}</span>
      </template>
      <span>Logout</span>
    </v-tooltip>
     
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      get fullName() {
        return localStorage.getItem('fullName') || '';
      },
      clipped: false,
      fixed: false,
      title: 'Todo'
    }
  },
  methods:{
       onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
  
}
</script>
