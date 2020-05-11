<template>
  <div class="sezione-slider">
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="https://life.ns12.it/wp-content/uploads/2020/02/slide_1.jpg" alt="First slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="https://life.ns12.it/wp-content/uploads/2020/02/slide_2.jpg" alt="Second slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="https://life.ns12.it/wp-content/uploads/2020/02/slide_3.jpg" alt="Third slide">
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
