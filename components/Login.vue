<template>
<v-card   elevation="3"
  shaped class="py-4 px-4">
  <v-card-title>{{showLoginForm?"Login":"Register"}}</v-card-title>
       <v-card-text>
  <v-form
  v-if="showLoginForm"
    ref="form"
    v-model="valid"
    lazy-validation
  >
     

    <v-text-field
      v-model="login.username"
      label="Username"
      :rules="rquiredRules"
      
    ></v-text-field>

      <v-text-field v-model="login.password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      label="Password" 
      :rules="rquiredRules"
      @click:append="showPassword = !showPassword"
      ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="onLogin"
    >
      Login
    </v-btn>
    <v-btn
      color="primary"
      class="mr-4"
      @click="showLoginForm=!showLoginForm"
    >
      Register
    </v-btn>
  </v-form>

  <v-form
  v-if="!showLoginForm"
    ref="Registerform"
    v-model="valid"
    lazy-validation
  >
     

    <v-text-field
      v-model="registerInfo.username"
      label="Username"
      :rules="rquiredRules"
      
    ></v-text-field>
    <v-text-field
      v-model="registerInfo.firstName"
      label="FirstName"
      :rules="rquiredRules"
      
    ></v-text-field>
    <v-text-field
      v-model="registerInfo.lastName"
      label="LastName"
      :rules="rquiredRules"
      
    ></v-text-field>

      <v-text-field v-model="registerInfo.password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      label="Password" 
      :rules="rquiredRules"
      @click:append="showPassword = !showPassword"
      ></v-text-field>
      <v-text-field v-model="confirmPassword"
      :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPasswordConfirm ? 'text' : 'password'"
      label="Repeat Password" 
      :rules="confirmPasswordRule"
      @click:append="showPasswordConfirm = !showPasswordConfirm"
      ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="onRegister"
    >
      Register
    </v-btn>
    <v-btn
      color="primary"
      class="mr-4"
      @click="showLoginForm=!showLoginForm"
    >
      Back to Login
    </v-btn>
  </v-form>
       </v-card-text>
  <ShowError :errors="errors"/>
</v-card>
</template>

<script>

export default {

  data() {
    return {
      showLoginForm:true,
      showPassword: false,
      showPasswordConfirm: false,
      valid: true,
      login: {
        username: '',
        password: ''
      },
      registerInfo: {
        username: '',
        password: '',
        firstName:'',
        lastName:''
      },
      confirmPassword:'',
      rquiredRules: [
        v => !!v || 'required',
      ],
      confirmPasswordRule:[
         v => !!v || 'required',
         v => v==this.registerInfo.password || 'Password not match.',
      ],
      errors:[]
    }
  },
  watch:{
    showLoginForm:function(){
      this.errors=[]
    }
  },
  methods:{
  async onLogin() {
      try {
          if(this.$refs.form.validate())
          {
             const response=  await  this.$store.dispatch("authenticateUser", this.login)
            if(response)
              this.errors=response.data;
            else
              this.$router.push('/todo');
          }
      } catch (err) {
        console.log("erorr",err)
      }
    },
    async onRegister(){
         try {
       if(this.$refs.Registerform.validate())
          {
             const response=  await  this.$store.dispatch("registerUser", this.registerInfo)
            if(response)
              this.errors=response.data;
            else
              this.$router.push('/todo');
          }
           } catch (err) {
        console.log("erorr",err)
      }
    }
  }
}
</script>