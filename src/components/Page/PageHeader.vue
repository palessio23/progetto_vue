<template>

  <div class="main-header">
    <div class="container">
      <nav class="navbar navbar-expand-md navbar-fixed-top">
        <div class="div-logo">
          <a class="navbar-brand" href="/home"><img class="logo-link" src="https://life.ns12.it/wp-content/uploads/2019/11/cropped-logodefns12life-2024x507.png"></a>
        </div>

        <div class="btn-group navbar-user navbar-text">
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

<style>
.navbar {
  padding:0;
}
.div-logo {
  margin-right: auto!important;
}
.logo-link {
  height: 50px;
  width: auto;
}
.navbar-user {

}
@media (min-width: 768px) {
  .div-logo {
    padding: 15px 0;
    }}
    </style>
