<template>
<div class="Search">
  <div class="container-fluid">
    <div class="col">
      <form class="d-flex align-items-center flex-column bd-highlight mb-3">
        <h3><span class="badge badge-pill badge-primary mb-2 pb-2">Search</span></h3>
        <div class="input-group md-3 m-2">
          <span class="input-group-text" id="basic-addon1">Month</span>
          <input v-model="month">
        </div>
        <div class="input-group md-3 m-2">
          <span class="input-group-text" id="basic-addon1">Year</span>
          <input v-model="year">
        </div>
        <div class="input-group md-3 m-2">
          <span class="input-group-text" id="basic-addon1">Resource</span>
          <input v-model="resource">
        </div>
        <button type="button" class="btn btn-primary m-3 ripple" id="btn-search" v-on:click="Search"><i class="material-icons">search</i></button>
        <span class="badge badge-danger m-3">{{error}}</span>
        <div class="spinner-border text-primary m-3" role="status" v-if="showLoad">
          <span class="sr-only">Loading...</span>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Search',
  data () {
    return {
      month: '2',
      year: '2019',
      resource: 'CALROS01002',
      showLoad: false,
      error:''
    }
  },
  methods: {
    Search: function () {
    this.$store.state.infoResource = '';
    this.error = '';
    this.dataArr = [];
    this.headArr = [];
    this.$store.state.detailsRes = '';

    /*axios.post('http://192.168.6.132:8080/hrcont/api/v1/getCostiRisorsaPeriodo',
              { codiceRisorsa: this.resource, anno: this.year, periodo: this.month, tipoPeriodo: "C" })*/
    axios.get("/sample.json")
      .then( response => {
        this.showLoad = true;
        this.$store.state.infoResource = response;
      })
      .catch( error => {
        this.showLoad = false;
        this.error = error;
      })
      .then( () => {
        if(!(this.error === '')) return;
        this.showLoad = false;
        this.$router.push('/home/resource')
      })

    }

  }
}

</script>

<style scoped>
  .col {
    text-align: left
  }
  span#basic-addon1{
    width:100px;
  }
  .input-group{
    justify-content:center;
  }
  .badge-danger{
    margin-top: 20px
  }
  .Search {
    margin-top: 7%;
    border-radius: 0;
  }
  #btn-search {
    padding-bottom: unset;
    box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
  }
  #btn-search:hover {
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

/* Button style material */
/*button {
  border: none;
  border-radius: 2px;
  padding: 12px 18px;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  color: white;
  background-color: #2196f3;
  box-shadow: 0 0 4px #999;
  outline: none;
}*/

</style>
