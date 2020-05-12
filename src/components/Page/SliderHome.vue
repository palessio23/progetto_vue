<template>
  <div class="sezione-slider">
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img :src="coppiaImgLink1.img" class="d-block w-100" alt="..." :href="coppiaImgLink1.link">
        </div>

        <div v-for="imglink in coppiaImgLinkArr" v-bind:key="imglink.id" class="carousel-item">
          <img :src="imglink.img" class="d-block w-100" alt="..." :href="imglink.link">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <div class="sfondo-control-icon">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </div>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <div class="sfondo-control-icon">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </div>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
let serverUrl = 'http://localhost:3000';
export default {
  name: 'sezione-slider',
  data () {
    return {
      coppiaImgLink1: '',  //{img:"https://life.ns12.it/wp-content/uploads/2020/02/slide_1.jpg", link:"link1"},
      coppiaImgLinkArr: '' /*[{img:"https://life.ns12.it/wp-content/uploads/2020/02/slide_2.jpg", link:"link2"},
      {img:"https://life.ns12.it/wp-content/uploads/2020/02/slide_3.jpg", link:"link3"}]*/
    }
  },
  beforeMount(){
    axios.post(serverUrl + '/sliderImg')
    .then( res => {
      let arr = res.data;
      window.console.log("print" + res.data)
      this.coppiaImgLink1 = arr[0];
      for(let i=1; i < arr.length; i++){
        this.coppiaImgLinkArr[i-1] = arr[i];
      }
    })
    .catch(err => window.console.log(err));
  }
}
</script>

<style scoped>
.sezione-slider {
  padding: 20px 0;
}
.sfondo-control-icon {
  cursor: pointer;
  background: rgba(0,0,0,1);
  width: 40px;
  height: 40px;
  display: block;
  z-index: 1000;
  border-radius: 50%;
}
.carousel-control-prev-icon, .carousel-control-next-icon {
  vertical-align: -webkit-baseline-middle;
}
</style>
