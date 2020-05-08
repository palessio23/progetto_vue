<template>
<div class="Register">
  <form class="container">
    <div class="text-center">
      <h4><span class="badge badge-pill badge-warning pb-2">Register</span></h4>
      <div class="form-group">
        <div v-if="!errFormUser">
          <input type="username" class="form-control" placeholder="Username" v-model="username" required autofocus autocapitalize="off" spellcheck="false">
        </div>
        <div v-else>
          <input type="username" class="form-control is-invalid" placeholder="Username" v-model="username" autocapitalize="off" spellcheck="false">
        </div>
      </div>
      <div class="form-group">
        <div v-if="!errFormPass">
          <input type="password" class="form-control" placeholder="Password" v-model="password1" autocapitalize="off" spellcheck="false">
        </div>
        <div v-else>
          <input type="password" class="form-control is-invalid" placeholder="Password" v-model="password1" autocapitalize="off" spellcheck="false">
        </div>
        {{ password1 }}
      </div>
      <div class="form-group">
        <div v-if="!errFormPass">
          <input type="password" class="form-control" placeholder="Repeat password" v-model="password2" autocapitalize="off" spellcheck="false">
        </div>
        <div v-else>
          <input type="password" class="form-control is-invalid" placeholder="Repeat password" v-model="password2" autocapitalize="off" spellcheck="false">
        </div>
        {{ password2 }}
      </div>
      <button type="button" class="btn btn-primary ripple" id="btn-register" v-on:click="clickRegister">Register</button>
      <br>
      <button type="button" class="btn btn-secondary mt-2 ripple" id="btn-login" v-on:click="clickLogin">Login</button>
      <div class="alert alert-danger" role="alert" v-if="errFormPass">
        <!--Passwords don't match.-->{{errorText}}
      </div>
      <div class="alert alert-danger" role="alert" v-if="netErr">
        {{ serverError }}
      </div>
      <div class="alert alert-success" role="alert" v-if="successRequest">
        Registrazione effettuata.
      </div>
      <div class="spinner-border text-success" role="status" v-if="successRequest">
        <span class="sr-only">Loading...</span><!--sr stands for mobile?-->
      </div>
    </div>
  </form>
</div>
</template>

<script>
import axios from 'axios';

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
var regExpPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;

export default {
  name: 'Register',
  data () {
    return {
      username: 'Sam',
      password1: 'sam',
      password2: 'sam',
      errFormUser: false,
      errFormPass: false,
      successRequest: false,
      serverError: 'Network error.',
      errorText: '',

      JSONToSend: '',
      url: '',
      JSONReceived: '',
      netErr: false
    }
  },
  methods: {
    clickRegister: function(){//aggiungere badge
      if (this.password1 === this.password2) {
        if(!regExpPass.test(this.password1)){//too weak
          this.errorText = "Password non valida: deve essere lunga almeno 8 caratteri, contenere almeno un carattere alfabetico minuscolo e uno maiuscolo, un numero e un carattere speciale.";
          this.errFormPass = true;
          return;
        }
        this.JSONToSend =  {data:{type: "account", attributes: {username: this.username, password: this.password1}}};
        this.url = "http://192.168.6.166:3000/register";
        axios.post(this.url,
          JSON.stringify(this.JSONToSend),
          {
            headers: {
              "Content-Type":"application/vnd.api+json",
              "Accept":"application/vnd.api+json"
            }
          }
        ).then( res => {
          if(res.status === 204){ //https://jsonapi.org/format/#crud-creating-client-ids : not 200 because we can use UUID
            this.successRequest = true;
            sleep(3000).then(() => { //temporaly show the badge
              this.successRequest = false;
              this.$router.push('/login');
            });
          }
          else window.console.log(res.status)
        }).catch((err) => {
          window.console.log("Register" + " " + err);
          this.serverError = err.response.data.errors[0].detail;
          this.netErr = true;
          sleep(2000).then(() => { //temporaly show the badge
            this.netErr = false;
          });
        });
      }else{//if passwords mismatch
        this.errFormPass = true;
        this.errorText = "I due campi password non sono uguali";
      }
    },
    clickLogin: function () {
      this.$router.push("/login");
    }
  },
  watch: {
    password1:function(){
      this.errFormPass = false;
    },
    password2:function(){
      this.errFormPass = false;
    },
    username:function(){
      this.errFormUser = false;
    }
  }
}
</script>

<style scoped>
  .container { 
    width: 22%;
    margin-top: 4%;
  }
  .alert {
    margin-top: 1rem;
    /*width: max-content;*/
    margin-left: auto;
    margin-right: auto;
  }
  #btn-login, #btn-register {
    box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
  }
  #btn-login:hover {
    box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.30);
  }
  /* Ripple effect */
  .ripple {
    background-position: center;
    transition: background 0.3s;
  }
  .ripple:hover {
    background: #47a7f5 radial-gradient(circle, transparent 1%, #2174b8 1%) center/15000%;
  }
  .ripple:active {
    background-color: #6eb9f7;
    background-size: 100%;
    transition: background 0s;
  }
  @media (max-width: 560px) {
    .container{
      width: 60%;
      margin-top: 18%;
    }
  }
</style>