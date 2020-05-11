<template>
  <div>
    <header class="site-header">
      <PageHeader />
    </header>

    <main class="site-content">
      <div class="container">
        <div class="row no-marginLR">
          <SliderHome />

          <div class="col-sm-8 no-paddingLR">
            <ContentHome />
          </div>
          <div class="col-sm-4 no-paddingLR">
            <SidebarHome />
          </div>

        </div>
      </div>
    </main>

    <footer>
      <FooterHome />
    </footer>
  </div>
</template>

<script>
import PageHeader from './PageHeader'
import SliderHome from './SliderHome'
import ContentHome from './ContentHome'
import SidebarHome from './SidebarHome'
import FooterHome from './FooterHome'

export default {
  name: 'page-layout',
  components: {
    PageHeader,
    SliderHome,
    ContentHome,
    SidebarHome,
    FooterHome
  }
}
</script>

<style>
.site-header {
  background: #fff;
  margin: 0;
  padding: 0;
  left: 0;
  top: 0;
  box-shadow: 0 1px 2px rgba(0,0,0,.1);
  z-index: 99999;
  position: relative;
}
.no-paddingLR {
    padding-left:0;
    padding-right:0;
}
.no-paddingLR {
    padding-left:0;
    padding-right:0;
}
@media (max-width: 767px){
  .site-header {
    min-height: 60px;
    position: relative;
  }
}
@media (max-width: 900px) and (min-width: 768px){
  .site-header {
    min-height: auto;
  }
}
</style>
