<template>
<div id="resource">
<div class="btn-group mb-3" role="group">
  <button
    v-for="tab in tabs"
    v-bind:key="tab[1]"
    v-bind:class="{'btn btn-secondary rounded-0 shadow-none border-light' : currentTab !==  tab[1], 'btn btn-primary rounded-0 shadow-none': currentTab === tab[1] }"
    v-on:click="currentTab = tab[1]"
  ><span class="pr-1" v-html="tab[0]"></span>{{tab[1]}}
  </button>
  </div>
  <transition name="component-fade" mode="out-in">
    <component
      v-bind:is="currentTabComponent"
      class="tab"
    ></component>
  </transition>

</div>
</template>

<script>

import costs from './tab-component/Costs';
import registry from './tab-component/Registry';
import projects from './tab-component/Projects';
import experiences from './tab-component/Experiences';
import certifications from './tab-component/Certifications';

export default {
  name: 'resource',
  components: {
    costs,
    projects,
    experiences,
    registry,
    certifications
  },
  data() {
    return{
      currentTab: 'Costs',
      tabs: [
        ['<i class="material-icons"> face </i>', 'Registry'],
        ['<i class="material-icons">work</i>', 'Projects'],
        ['<i class="material-icons"> euro_symbol</i>', 'Costs'],
        ['<i class="material-icons">public</i>', 'Experiences'],
        ['<i class="material-icons">school</i>', 'Certifications']
            ]
    }
  },
  computed: {
    currentTabComponent: function () {
      return this.currentTab.toLowerCase()
    }
  }
}
</script>

<style scoped>
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .2s ease;
  }
  .component-fade-enter, .component-fade-leave-to {
    opacity: 0;
  }
  button{
    display: inline-flex;
    border: none;
  }
  @media(max-width: 420px){
    div#resource {
      /*overflow-y: scroll;
      height: 100%;*/
      padding-left: 0px;
    }
    .btn-group{
      overflow-x: scroll;
      width: -webkit-fill-available;
    }
  }
</style>