<template>
  <div id="app" class="bg text-dark">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  beforeCreate () {
    var cookiesToken = localStorage.token;
    if(!cookiesToken) this.$router.push('/login');
    else{
      var user = localStorage.user;
      //call server (user, token)
      this.JSONToSend = {data:{type: "session", id: 1, attributes: {username: user, token: cookiesToken}}};
      this.url = "http://192.168.6.166:3000/validateSession";
      axios.post(this.url,
        JSON.stringify(this.JSONToSend),
        {
          headers: {
            "Content-Type":"application/vnd.api+json",
            "Accept":"application/vnd.api+json"
          }
        }
      )/*.then( res => {
        window.console.log("tokenValid (Login): " + res.status);
        if(res.status === 200) {
          this.$router.push('/home');
        }
      })*/.catch( err => {
        window.console.log("(App) validateSession, beforeMount: " + err);
        var path = window.location.pathname;
        if( path != "/login" && path != "/register" ) this.$router.push('/login');
      });
    }
  }
}
</script>

<style>
.html{
  background-color: lightgray;
}
.bg{
  height:-webkit-fill-available;
  background-color: #eee;
}
</style>
