<template>
  <div class="container">

                <!-- Area Chart -->
                <div class="col-sm-8">
                  <div class="card shadow mb-4">
                    <!-- Card Body -->
                    <div class="card-body">
                      <div class="chart-area"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                        <canvas id="myAreaChart" style="display: block; height: 320px; width: 1123px;" width="1403" height="400" class="chartjs-render-monitor"></canvas>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Pie Chart -->
                <div class="col-sm-4">
                  <div class="card shadow mb-4">
                    <!-- Card Body -->
                    <div class="card-body">

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


                    </div>
                  </div>
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

</style>
