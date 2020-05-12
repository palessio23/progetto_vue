<template>
  <div>
  <div class="sfondo-footer">
    <div class="container">
      <div class="row">
        <!--<div class="col-sm margin-colonna">
          Colonna1
        </div>
        <div class="col-sm margin-colonna">
          Colonna2
        </div>
        <div class="col-sm margin-colonna">
          Colonna3
        </div>-->
        <div v-for="col in cols" v-bind:key="col.id" class="col-sm margin-colonna">
          {{col}}
        </div>
      </div>
    </div>
  </div>
  <div class="footer-credit">
    <p class="footer-info">COPYRIGHT © 2020 </p>
  </div>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      cols:["Colonna1","Colonna2","Colonn"]
    }
  }
}
</script>

<style scoped>
.sfondo-footer {
  background: #444;
  color: #fff;
  height:200px;
}
.margin-colonna {
  margin: 2.5%;
}
.footer-credit {
  clear: both;
  text-align: center;
  padding: 2px;
  background: #222;
  color: #fff;
}
.footer-info {
  margin: 5px 0;
  font-size: 14px;
}
</style>
