<template>
<v-text-field  v-model="name" @keydown.enter="$emit('edit',{name:name,isCompelete:todoItem.isCompelete,id:todoItem.id})">
         <v-icon
      slot="append"
      large
       @click="$emit('edit',{name:name,isCompelete:todoItem.isCompelete,id:todoItem.id})"
    >
      mdi-pencil
    </v-icon>
    <v-spacer></v-spacer>
    <v-icon
    large
      slot="append"
      color="red"
       @click="$emit('delete',todoItem.id)"
    >
      mdi-delete
    </v-icon>
 
    <v-icon
    large
      slot="prepend"
      :color="todoItem.isCompelete ? 'green':'gray'"
      @click="$emit('toggle',todoItem.id)"
    >
      {{todoItem.isCompelete ? "mdi-check":"mdi-record-circle-outline" }}
    </v-icon>
  </v-text-field>
</template>

<script>
export default {
props:["todoItem"],
data(){
      return{
            name:this.todoItem.name
      }
}
}
</script>