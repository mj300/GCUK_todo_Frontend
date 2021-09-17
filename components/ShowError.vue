<template>
  <ul v-if="errors.length>0" id="errorPanel">
  <li v-for="err in errors" :key="err.key">
    {{ err.value }}
  </li>
</ul>
</template>

<script>
export default {
 props:{
       errors:[]
 }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

ul li {
  color: red;
}
</style>