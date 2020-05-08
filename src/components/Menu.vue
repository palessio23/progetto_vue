<template>
  <div class="menu">
    <div class="container-fluid">
      <div class="row" v-bind:class="{'row-cols-1' : $mq === 'xsm', 'row-cols-2': $mq === 'sm', 'row-cols-3': $mq === 'md', 'row-cols-4': $mq === 'lg'}">

        <div v-for="prod in product"  v-bind:key="prod._id" class="col my-3">
          <div class="card rounded-0 bg-transparent my-2 d-block">
            <img :src="prod.image" class="card-img-top" :alt="prod.image">
            <div class="card-body">
              <!--<h5 class="card-title">{{prod.name}}</h5>-->
              <div v-if="(prod.site).substring(0, 1) != '/' "> <!-- for external link -->
                <a :href="prod.site" class="btn btn-outline-secondary">{{prod.name}}</a>
              </div>
              <div v-else>                                                       <!-- for internal link -->
                <a @click="$router.push(prod.site)" class="btn btn-outline-secondary">{{prod.name}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueMq from 'vue-mq'
import Vue from 'vue'
import axios from 'axios';

Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    xsm: 570,
    sm: 1030,
    md: 1270,
    lg: Infinity,
  },
  defaultBreakpoint: 'xsm' // customize this for SSR
});

export default {
  name: 'Menu',
  data: function () {
    return {
      product: ''
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
      window.console.log(res.data.included)
          this.$store.state.jsonProductUser=res.data.included;
          this.$store.state.username = user;// correct?
          //this.$router.push('/home');
        }
      }).then( () => {
        this.product = this.$store.state.jsonProductUser;
        window.console.log(this.product);
      }).catch( err => {
        window.console.log("(menu) product not obtained, beforeMount: " + err); // TO DO: show some message into the page or redirect, for now redirect
        this.$router.push("/login");
      });
    }
  }
}
</script>


<style scoped>
.row{
  padding-right: inherit!important;
  display: inline-flex;
  /*overflow: auto;
  height: 885px;*/
}
.row-cols-4>*, .row-cols-3>*{/*to avoid card overlap*/
  max-width: 100%;
}
.col{
  padding-right: unset!important;
}
.card{
  /*width: 250px;
  height: 250px;
  cursor: pointer;*/
  border: none
}
img{
  width: 250px;
  height: 250px;
  border-radius: 2.3rem;
}
</style>
