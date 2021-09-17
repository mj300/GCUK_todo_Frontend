<template>
  <v-row  class="justify-center">
    <v-col md="8">
      <v-text-field v-model="newTodoName" 
      label="Add Todo"
       @keydown.enter="onAdd" >
           <v-icon
      slot="append"
       color="green"
       large
       @click="onAdd"
    >
      mdi-plus
    </v-icon>
      </v-text-field>
     <TodoItem v-for="todo in todoList" :key="todo.id" :todoItem="todo" @toggle="onToggle" @edit="onEdit" @delete="onDelete" />
    <v-row>
      <v-col sm="12" md="10">
   <v-pagination v-if="pageLength>1"
      v-model="seletedPage"
      :length="pageLength"
      circle
      :total-visible="6"
    ></v-pagination>
    </v-col>
    <v-col sm="6" md="2">
     <v-select 
          :items="items"
          v-model="itemPerPage"
        ></v-select>
    </v-col>
    </v-row>
    </v-col>

     <v-snackbar
      v-model="snackbar"
    >
      <span>
          {{ message }}
      </span>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import {GetAllTodo,Add,Toggle,Edit,Delete} from '../module/api/todo'
export default {
  middleware: ["check_auth", "auth"],
  computed :{
      pageLength(){
        if(this.totalPage==0)
          return 0;
        return Math.ceil(this.totalPage/this.itemPerPage);
      }
  },
  async created(){
   await this.getAllTodo();
  },

  data(){
    return{
      snackbar:false,
      message:[],
      newTodoName:'',
      todoItem:{
        isCompelete:true,
        name:"shopping",
        id:"1"
      },
      todoList:[],
      totalPage:0,
      itemPerPage:5,
      seletedPage:1,
      items:[5,10,20,50]
   }
  },
     watch: {
seletedPage:function (val) {
     this.getAllTodo();
    },
itemPerPage:function (val) {
     this.getAllTodo();
    },
totalPage:function (val) {
     if(this.pageLength<this.seletedPage)
       this.seletedPage=this.pageLength!=0?this.pageLength:1;
    }
   },
  methods:{
    showSnack(message){
      this.snackbar=true;
      this.message=message;
      setTimeout(()=>{
        this.snackbar=false;
      },3000)
    },

   async getAllTodo(){
   
  const response=await GetAllTodo(this.seletedPage,this.itemPerPage);
      switch (response.status) {
          case 200:
            this.todoList= response.data.itemList;
            this.totalPage=response.data.total;
            break;
          default:
            console.log(response);
            this.showSnack("somthing went wrong.");
          break;
        }
    },
    async onToggle(id){
      await Toggle(id);
       await this.getAllTodo();
    },
   async onEdit(todo){
       await Edit(todo);
       await this.getAllTodo();
       this.showSnack("Todo Item Edited.");
    },
    async onDelete(id){
       await Delete(id);
       await this.getAllTodo();
        this.showSnack("Todo Item Deleted.");
    },
    async onAdd(){
      if(this.newTodoName)
      {
          await Add(this.newTodoName);
          await this.getAllTodo();
          this.showSnack("Todo Item Added.");
          this.newTodoName='';
      }
       
    }
  }
}
</script>
