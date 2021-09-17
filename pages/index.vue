<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
        <Login />
    </v-col>
  </v-row>
</template>
<script>
export default {
  middleware: ["check_auth"],
 mounted(){
   if(this.$store.getters.isAuthenticated){
     this.$router.push('/todo');
   }
 }
}
</script>
