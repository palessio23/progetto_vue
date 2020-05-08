<template>
  <div class="Login">
    <div id = "mainCont" class="text-center">
      <span class="badge">Login Image</span>

      <div id="login_error" v-if="errForm">
        <strong>ERRORE</strong>: {{ textError }}<br>
      </div>

      <label>Username</label>
      <div class="form-group">
        <input type="username" :style="errorShake" class="input" placeholder="Username" v-model="username" required autofocus autocapitalize="off" spellcheck="false">
      </div>
      <label>Password</label>
      <div class="form-group">
        <input type="password" :style="errorShakeRev" class="input" placeholder="Password" v-model="password" autocapitalize="off" spellcheck="false">
      </div>

      <br>
      <p id="a-register" v-on:click="clickRegister">Register</p>
      <button type="button" class="btn btn-primary ripple" id="btn-login" v-on:click="clickLogin">
        Login
      </button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  };
  const tempUrl = "http://localhost:3000"

  export default {
    name: 'Login',
    data () {
      return {
        username: 'Sam',
        password: 'sam',
        errForm: false,
        textError: 'Username or password incorrect.',
        waitSpinner: false,

        errorShake: "margin-right:auto;",
        errorShakeRev: "margin-right:auto;",

        JSONToSend: '',
        url: '',
        id: '1'//TO DO: rivedere
      }
    },
    methods: {
      clickLogin: function () {
        this.waitSpinner = true;
        sleep(1000).then(() => { //temporaly show the badge
          this.JSONToSend = {data:{type: "account", id: this.id, attributes: {username: this.username, password: this.password}}};
          this.url = tempUrl + "/login";
          axios.post(this.url,
          JSON.stringify(this.JSONToSend),
          {
            headers: {
              "Content-Type":"application/vnd.api+json",
              "Accept":"application/vnd.api+json"
            }
          }
          ).then( (res) => {
            if(res.status === 200){
              this.$store.state.jsonProductUser=res.data.included;
              this.$store.state.username = this.username; //memorize user actually logged
              var token = res.data.data.attributes.token; //fake token
              localStorage.user = this.username;
              window.console.log(localStorage.user);
              localStorage.token = token;
              this.$router.push('/home');//correct credentials => go to home
            }
          }).catch( error => { //possible error: password or user not correct
            window.console.log("Login(err): " + error); //error.response, tip from the web
            if(error.response) this.textError = error.response.data.errors[0].detail;
            else this.textError = " problema di rete, controlla la connessione";
            this.waitSpinner = false;
            this.errForm = true;
            if(error.response){
              var int = [100,300,500];// to animate login error
              for(var i in [1,2,3]){
                sleep(int[i]).then(() => {
                  this.errorShakeRev = "margin-right: " + "20" + "px;";
                  this.errorShake = "margin-right: " + "40" + "px;";
                });
                sleep(int[i]+100).then(() => {
                  this.errorShakeRev = "margin-right: " + "40" + "px;";
                  this.errorShake = "margin-right: " + "20" + "px;";
                });
              }
              sleep(700).then(() => {
                this.errorShakeRev = "margin-right: " + "auto" + ";";
                this.errorShake = "margin-right: " + "auto" + ";";
              });
            }
          });
        });
      },
      clickRegister: function () {
        this.$router.push('/register');
      },
    },
    watch: {
      password:function(){
        this.errForm = false;
      },
      username:function(){
        this.errForm = false;
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 22%;
    margin-top: 4%;
  }
  .badge{
    margin-bottom: 20px;
    height: 145px;
    background: white;
    padding: 20px;
    width: 100%;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    border: 1px solid #fe7d68;
  }
  input:focus {
    outline: none;
    box-shadow: 0px 0px 0px 1px #007cba;
  }
  #login_error{
    border-left-color: #dc3232;
    padding: 12px;
    background-color: #fff;
    border-radius: 20px 0 20px 0;
    cursor: pointer;
    font-size: 12px;
    line-height: 1.4;
    width: 85%;
    border-left-style: solid;
    border-left-width: 4px;
    margin: 0 auto 20px;
  }
  label {
    color: #ffffff;
    display: flex;
    margin-left: 40px;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 400;
    text-align: left;
  }
  #a-register{
    margin-top: 20px;
    font-size: 13px;
    padding: 0 24px 0;
    color: white;
    cursor: pointer;
    width: 5%;
    margin-left: 10%;
  }
  #mainCont {
    position: fixed;
    width: 365px;
    height: auto;
    padding-bottom: 30px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) matrix(1, 0, 0, 1, 0, 0);
    background: linear-gradient(180deg, rgba(80, 18, 83, 0.6) 0%, rgba(49, 25, 73, 0.8) 100%);
    border-radius: 10px;
    padding-top: 0;
    box-shadow: 0px 4px 15px 2px rgb(18, 2, 23);
    border-bottom: 1px solid #000008;
  }
  .alert {
    margin-top: 1rem;
    width: max-content;
    margin-left: auto;
    margin-right: auto;
  }
  .input {
    border: 1px solid #fe7d68;
    border-radius: 150px;
    padding: 0 20px;
    height: 42px;
    font-size: 16px;
    line-height: 16px;
    caret-color: #fbb73c;
    color: #fbcf0a;
    display: block;
    width: 85%;
    margin: auto;
    background: rgba(54, 25, 81, 0.61);
  }
  #btn-register {
    margin-bottom: 15px;
    box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
  }
  #btn-login{
    border: 1px solid #fe7d68 !important;
    border-radius: 50% !important;
    height: 100px !important;
    box-shadow: 1px 0px 30px 0px rgb(37,6,45) !important;
    color: #ffffff !important;
    width: 100px !important;
    font-size: 20px !important;
    bottom: -65px !important;
    right: -25px !important;
    background: rgb(249,46,144) !important;
    background: linear-gradient(180deg, rgb(249, 213, 2) 00%, rgb(249, 35, 145) 100%) !important;
    color: #ffffff !important;
    text-shadow: 0px -1px 1px #1a2147, 1px 0px 1px #192149, 0px 1px 1px #192149, -1px 0px 1px #192149;
    position: relative;
    left: 160px;
    top: 80px;
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
  .Login{
    height:100%;
    width:100%;
    background: url(https://test.life.ns12.it/wp-content/uploads/2019/11/sfondo_form.jpg) center bottom no-repeat;
    position: fixed;/*to avoid bug on background*/
    background-size: cover;
  }
  @media (max-width: 560px) {
    .container{
      width: 60%;
      margin-top: 18%;
    }
  }
</style>
