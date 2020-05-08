<template>
  <div>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon"> Nome </span>
      </div>
      <input v-model="registryRes['name']" @change="updateErrorRender('name', false)" type="text"
             v-bind:class="{'form-control' : !error['name'], 'form-control is-invalid': error['name']}"
             aria-label="First name" aria-describedby="basic-addon1"
      >
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon"> Cognome </span>
      </div>                                <!-- type and change focus -->
      <input v-model="registryRes['lastname']" @change="updateErrorRender('lastname', false)" type="text" 
             v-bind:class="{'form-control' : !error['lastname'], 'form-control is-invalid': error['lastname'] }" 
             aria-label="Last name" aria-describedby="basic-addon1"
      >
      <div class="invalid-tooltip">
          I campi nome e cognome sono obbligatori, inoltre sono ammessi solo caratteri alfabetici.
      </div>
    </div>

    <div class="input-group mb-3">
      <div class="input-group-append">
        <span class="input-group-text" id="basic-addon">Data di nascita</span>
      </div>
      <input v-model="registryRes['birthdata']" id="dataText" @change="updateErrorRender('birthdata', false)" type="date" 
             v-bind:class="{'form-control' : !error['birthdata'], 'form-control is-invalid': error['birthdata'] }" 
             aria-label="Birth data" aria-describedby="basic-addon2"
      >
    </div>
    <div class="input-group mb-3">
      <div class="input-group-append">
        <span class="input-group-text" id="basic-addon">Luogo di nascita</span>
      </div>
      <input v-model="registryRes['birthplace']" @change="updateErrorRender('birthplace', false)" type="text" 
             v-bind:class="{'form-control' : !error['birthplace'], 'form-control is-invalid': error['birthplace'] }" 
             aria-label="Birthplace" aria-describedby="basic-addon2"
      >
      <div class="invalid-tooltip">
          I campi data di nascita e luogo di nascita sono obbligatori.
      </div>
    </div>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon">E-Mail</span>
      </div><!-- @change="validEmail(registryRes['email'])" type="email" -->
      <input v-model="registryRes['email']" @change="updateErrorRender('email',false)"
             v-bind:class="{'form-control' : !error['email'], 'form-control is-invalid': error['email'] }" 
             aria-label="E-mail" aria-describedby="basic-addon3"
      >
      <div class="invalid-tooltip">
          Il campo e-mail non è corretto.
      </div>
    </div>

    <label for="domicile">Domicilio:</label>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon">Comune</span>
      </div>
      <input v-model="registryRes['municipality']" @change="updateErrorRender('municipality', false)" type="text" 
             v-bind:class="{'form-control' : !error['municipality'], 'form-control is-invalid': error['municipality'] }" 
             aria-label="Municipality" aria-describedby="basic-addon"
      >
      <div class="invalid-tooltip">
          Il campo è obbligatorio.
      </div>
    </div>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon">Toponomastica</span>
      </div>
      <input v-model="registryRes['placenames']" @change="updateErrorRender('placenames', false)" type="text" 
             v-bind:class="{'form-control' : !error['placenames'], 'form-control is-invalid': error['placenames'] }" 
             aria-label="Place names" aria-describedby="basic-addon"
      >
      <div class="invalid-tooltip">
          Il campo è obbligatorio.
      </div>
    </div>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon">Indirizzo</span>
      </div>
      <input v-model="registryRes['address']" @change="updateErrorRender('address', false)" type="text" 
             v-bind:class="{'form-control' : !error['address'], 'form-control is-invalid': error['address'] }" 
             aria-label="Address" aria-describedby="basic-addon"
      >
      <div class="invalid-tooltip">
          Il campo è obbligatorio.
      </div>
    </div>

    <div class="form-group form-check mt-5">
      <input type="checkbox" class="form-check-input" id="checkbox" v-model="registryRes['checkedCatPro']">
      <label class="form-check-label" for="exampleCheck1">Categoria protetta</label>
      <div class="invalid-tooltip">
          Il campo è obbligatorio.
      </div>
    </div>

    <div id="ButtonAndBadge">
      <button type="button" @click="clickModify" class="btn btn-primary mr-2">Modifica</button>
      <h5><span class="badge badge-success" v-show="success">Modifica avvenuta con successo</span></h5>
    </div>

  </div>
</template>

<script>

var reEmail = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i; //accept .{1,} but the corret way is .{2,}
var reDate = /^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i;
var reAlpha = /^[A-Za-z]+$/i;
var reNoEmpty = /^(\s|\S)*(\S)+(\s|\S)*$/i;

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default {
  name: 'tab-registry',
  data(){
    return{
      registryRes: { ...this.$store.state.registryRes}, //make a copy with ...var operator
      error:{}, //store error situation
      success: false, //all field correct => true
      names:['name', 'lastname', 'email', 'birthdata', 'birthplace', 'municipality','placenames', 'address', 'checkedCatPro']
    }
  },
  mounted(){
    for(var dataName of this.names){
      if( this.registryRes[dataName] === undefined ) this.registryRes[dataName] = '';
      this.error[dataName] = false;
    }
  },
  methods:{
    clickModify: function(){
      //validity controlled
      if(!this.validEmail(this.registryRes['email'])) this.updateErrorRender('email', true);
      
      if(!this.validBirthdata(this.registryRes['birthdata'])) this.updateErrorRender('birthdata', true); //set error = true

      var onlyAlphaCheck = ['name', 'lastname'];
      for(var o of onlyAlphaCheck)
        if(!this.onlyAlpha(this.registryRes[o])) this.updateErrorRender(o, true);

      var noEmptyCheck = ['birthplace', 'municipality','placenames', 'address'];
      for(var n of noEmptyCheck)
        if(!this.noEmpty(this.registryRes[n])) this.updateErrorRender(n, true);

      if( this.noError() ){
        this.$store.state.registryRes={ ...this.registryRes};//store copy of data

        this.success = true;
        sleep(2000).then(() => { //temporaly show the badge
          this.success = false;
        });
      }
      //createSendJSON(); accordance to the JSON:API standard
    },
    noError(){
      for(var dataName of this.names)
        if(this.error[dataName] === true) return false;
      return true;
    },
    updateErrorRender(field, val){
      this.error[field] = val;
      this.$forceUpdate();
    },
    validEmail:function(email) {
      //this.error['email'] = !reEmail.test(email); //if correct then false
      //this.$forceUpdate();
      return reEmail.test(email);
    },
    validBirthdata:function(birthdata) {
      return reDate.test(birthdata);
    },
    onlyAlpha:function(data){
      return reAlpha.test(data);// && data !== undefined;
    },
    noEmpty:function(data){
      return reNoEmpty.test(data);// && data !== undefined;
    }
  }
}
</script>

<style scoped>
  input[type=date], input[type=datetime-local], input[type=month], input[type=time] {
    -webkit-appearance: button;
  }
  div#ButtonAndBadge {
    display: inline-flex;
  }
  .mb-3{
    margin-bottom: 2rem!important;
  }
  .tab{
    margin-right: 5%;
    margin-left: 5%;
  }
  @media(max-width: 420px){
    .tab{
      margin-left: 0%;
      margin-right: 0%;
    }
  }
</style>