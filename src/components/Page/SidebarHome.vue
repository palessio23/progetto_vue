<template>
  <div class="right-sidebar">

    <div class="sezione-utente">
      <div class="dati-user" id="margin-right">
        <a href="#">
          <img :src="userImg" class="img-user" width="150" height="150" alt="Foto del Profilo">
        </a>
      </div>
      <div class="dati-user">
        <span>ciao !</span>
        <a href="#" >{{ userName }}</a>
      </div>
    </div>

    <div class="sezione-prodotti">

      <div v-for="prod in product"  v-bind:key="prod._id" class="list-prodotto">
            <div v-if="(prod.site).substring(0, 1) != '/' "> <!-- for external link -->
              <img :src="prod.image" class="icona-prodotto" :alt="prod.image">
              <a href="#" class="link-titolo-prodotto">{{prod.name}}</a>
            </div>
            <div v-else>                                                       <!-- for internal link -->
              <a @click="$router.push(prod.site)" class="btn btn-outline-secondary">{{prod.name}}</a>
            </div>
      </div>

    </div>

    <div class="sezione-logout">
      <div class="list-prodotto">
        <i @click="logout()" class="material-icons icona-prodotto">exit_to_app</i>
          <a @click="logout()" class="link-titolo-prodotto">Logout</a><!--modificare il css per renderlo simile ad un link-->
      </div>
    </div>

  </div>
</template>
<script>
import axios from 'axios';
export default {
  data () {
    return {
      username: localStorage.user,
      product: '',
      userName: this.$store.state.user.name,
      userImg: this.$store.state.user.imgProfile
    }
  },
  beforeMount(){// obtain user product to show, alternative explanation: refresh
    var cookiesToken = localStorage.token;
    if(!cookiesToken) this.$router.push('/login');
    else{
      var user = localStorage.user;
      //call server (user, token)
      this.JSONToSend = {data:{type: "userRequest", id: 1, attributes: {username: user, token: cookiesToken}}};
      this.url = "http://localhost:3000/retrieveResource?resource=product";
      axios.post(this.url,
        JSON.stringify(this.JSONToSend),
        {
          headers: {
            "Content-Type":"application/vnd.api+json",
            "Accept":"application/vnd.api+json"
          }
        }
      ).then( res => {
        if(res.status === 200) {
          this.$store.state.jsonProductUser=res.data.included;
          this.$store.state.user.name = user;// correct?
          //this.$router.push('/home');
        }
      }).then( () => {
        this.product = this.$store.state.jsonProductUser;
      }).catch( err => {
        window.console.log("(menu) product not obtained, beforeMount: " + err); // TO DO: show some message into the page or redirect, for now redirect
        this.$router.push("/login");
      });
    }
  },
  methods:{
    logout: function(){
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.right-sidebar{
  background-color: #fff;
  border-radius: 4px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-border-radius: 4px;
  -o-border-radius: 4px;
}
.right-sidebar .sezione-utente {
  padding: 25px;
}
.dati-user {
  display: inline-block;
  vertical-align: middle;

}
#margin-right {
  margin-right: 15px;
}
.img-user {
  display: block;
  width: 60px;
  height: 60px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -ms-border-radius: 3px;
  -o-border-radius: 3px;
  border-radius: 3px;
}
.dati-user span  {
  display: block;
  color: #969696;
  font-size: 13px;
  margin-bottom: 10px;
  text-transform: capitalize;
}
.dati-user a  {
  display: block;
  color: #7c838a;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  text-transform: capitalize;
}
.sezione-prodotti {
  padding: 25px 0;
  border-top: 1px solid #f6f6f6;
}
.list-prodotto {
  outline: 0;
display: block;
padding: 12px 25px;
}
.icona-prodotto {
  -webkit-border-radius: 100%;
-moz-border-radius: 100%;
-ms-border-radius: 100%;
-o-border-radius: 100%;
border-radius: 100%;
    background-color: #5ac6ed;
    width: 35px;
height: 35px;
font-size: 14px;
line-height: 35px;
text-align: center;
margin-right: 12px;
color: #fff;
}
.link-titolo-prodotto {
  color: #7c838a;
font-size: 13px;
font-weight: 600;
line-height: 18px;
display: inline-block;
text-transform: capitalize;
}
.sezione-logout {
border-top: 1px solid #f2f2f2;
cursor: pointer;
}
</style>
