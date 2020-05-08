<template>
  <div class="container-fluid">

    <nav class="navbar navbar-expand-md navbar-fixed-top">
      <a class="navbar-brand" href="/home/menu">imageHome</a>
      
      <div class="navbar-nav">
        <a href="#" class="nav-item nav-link active">fakeLinkHome</a>
        <a href="#" class="nav-item nav-link">fakeLinkAbout</a>
      </div>
      
      <div class="btn-group">
        <button class="btn dropdown-toggle" @mouseover=" clss = 'dropdown-menu dropdown-menu-right show'" @mouseleave=" clss = 'dropdown-menu dropdown-menu-right'"
          type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{ username }}
        </button>
        <div :class="clss"  
          @mouseover = " clss = 'dropdown-menu dropdown-menu-right show' "
          @mouseleave = " clss = 'dropdown-menu dropdown-menu-right' "
          aria-labelledby="dropdownMenuButton"
        >
          
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <form class="form-inline ml-auto">
            <button type="button" class="btn" v-on:click="logout"><i class="material-icons">exit_to_app</i> Logout </button>
          </form>
        </div>
      </div>
    </nav>


    <div class="row">

      <main role="main" class="col">
        <transition name="component-fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </main>
    </div>
  </div>
</template>


<script>

export default {
  name: 'Home',
  data () {
    return {
      username: localStorage.user,
      over: false,
      clss: 'dropdown-menu dropdown-menu-right'
    }
  },
  methods:{
    logout: function(){
      localStorage.user = undefined;
      localStorage.token = undefined;
      this.$router.push("/login");
    }
  }
}
</script>


<style scoped>
  .col-md-1{
    background-color: #c1c1c1;
    padding-right:0px;
    padding-left:0px;
    display: inline-flex;
    justify-content: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 8.333%;
  }
  .row{
    height: 100%;
    padding-top: 82px;
    margin-right: 0px;
  }
  .container-fluid{
    height:100%;
    padding-left: 0px;
    padding-right: 0px;
  }
  .col{
    padding-right: inherit;
  }
  .navbar{
    padding-left: 40px;
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
    height: auto;
    background-color: #fff;
    padding: .4rem 1rem;
    justify-content: space-between;
  }
  .nav-link {
    text-decoration: none;
    padding: 22px 11px;
    font-size: 15px;
    font-family: 'Open Sans',sans-serif!important;
    color: #666;
    transition: .3s ease;
  }
  .navbar-nav{
    flex-direction: row;
  }
  .navbar-fixed-top{
    position: fixed;
    right: 0;
    left: 0;
    z-index: 1030;
  }
  .flex-column{
    margin-bottom: unset;
  }
  .btn{
    display: inline-flex;
    box-shadow: none;
  }
  .component-fade-enter-active, .component-fade-leave-active {/*for router-view transition*/
    transition: opacity .1s ease;
  }
  .component-fade-enter, .component-fade-leave-to {
    opacity: 0;
  }
  @media (max-width: 785px) {
    .btn{
      font-size: 0.8em;
      padding: 6px;
    }
    .col{
      padding-right: unset!important;
    }
  }
  @media (max-width: 420px) {
    .btn{
      font-size: 0.7em;
      padding: 5px;
    }
    .row{
      height: 100%;
      margin-right: 0px;
    }
  }
</style>