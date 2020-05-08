<template>
  <div id = "Modal">
    <transition name="Modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div v-bind:class="{'modal-container' : $mq !== 'sm', 'modal-container rounded-circle shadow-none': $mq === 'sm' }">
              
            <button type="button" class="close" aria-label="Close" @click="$emit('close')">
              <span aria-hidden="true">&times;</span>
            </button>
            <slot name="body">
              
              <!-- "desktop table"  -->
              <table class = "table table-striped" v-if="$mq !== 'sm'">
                <thead>
                  <tr>
                    <th scope="row" v-for="head in headArr" v-bind:key="head.id">{{ head }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope ="row">Retribuzioni</td>
                    <td v-for="data in copyDetail" v-bind:key="data.id">{{data.retribuzioni}}</td>
                  </tr>
                  <tr>
                    <td scope ="row">Inail</td>
                    <td v-for="data in copyDetail" v-bind:key="data.id">{{data.inail}}</td>
                  </tr>
                  <tr>
                    <td scope ="row">Contributivo</td>
                    <td v-for="data in copyDetail" v-bind:key="data.id">{{data.contributivo}}</td>
                  </tr>
                  <tr>
                    <td scope ="row">Totale</td>
                    <td v-for="data in copyDetail" v-bind:key="data.id">{{data.totale}}</td>
                  </tr>
                </tbody>
              </table>
              


              <table class = "table table-sm table-dark" v-if="$mq === 'sm'">
                <tbody>
                  <div v-for="data in copyDetail" v-bind:key="data.id" >
                    <tr>
                      <td>
                        {{ data.tipoContributo }}
                      </td>
                    </tr>
                    <tr>
                      <td> Retribuzioni </td>
                      <td>{{ data.retribuzioni }}</td>
                    </tr>
                    <tr>
                      <td> Inail </td>
                      <td>{{ data.inail }}</td>
                    </tr>
                    <tr>
                      <td> Contributivo </td>
                      <td>{{ data.contributivo }}</td>
                    </tr>
                    <tr>
                      <td> Totale </td>
                      <td>{{ data.totale }}</td>
                    </tr>
                  </div>
                </tbody>
              </table>
              
              </slot>
            </div>
          </div>
        </div>
    </transition>
  </div>
</template>


<script>
import VueMq from 'vue-mq'
import Vue from 'vue'

Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    sm: 450,
    md: 1250,
    lg: Infinity,
  },
  defaultBreakpoint: 'sm' // customize this for SSR
})

export default {
  name: 'Modal',
  data () {
    return {
      headArr: [],
      copyDetail: this.$store.state.detailsRes
    }
  },
  mounted()  {
      this.headArr.push("");
      for(var i in this.$store.state.detailsRes){
        this.headArr.push(this.$store.state.detailsRes[i].tipoContributo);
        //rounding values
        var copyDetail = this.$store.state.detailsRes;
        copyDetail[i].retribuzioni = Number((this.$store.state.detailsRes[i].retribuzioni)).toFixed(2);
        copyDetail[i].inail = Number((this.$store.state.detailsRes[i].inail)).toFixed(2);
        copyDetail[i].contributivo = Number((this.$store.state.detailsRes[i].contributivo)).toFixed(2);
        copyDetail[i].totale = Number((this.$store.state.detailsRes[i].totale)).toFixed(2);
      }
  }
}

</script>





<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: min-content;
  margin: 0px auto;
  padding: unset;
  background-color: #e0e0e0;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: unset;
  padding: unset;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
@media (max-width: 430px) {
  button.close {
    padding-right: 46%;
    padding-left: 46%;
  }
  .table{
    font-size: smaller;
  }
  .modal-container{
    background-color: #c5291a;
  }
}
@media (min-width: 430px) {
  button.close {
    padding-right: 2%;
    padding-top: 1%;
  } 
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>