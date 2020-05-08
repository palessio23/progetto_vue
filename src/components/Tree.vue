<template>
  <li class = "nav-item">
    <router-link class="btn" v-bind:class="{'btn-secondary': this.$route.path === model.link}" aria-pressed="true" :to="model.link">
      <!--<i class="material-icons">{{model.icon}}</i><span>-->
      {{model.name}}
    </router-link>
    <ul v-if="notLeaf">
      <Tree
        v-for="model in model.children"
        :model="model"
        :key="model.id">
      </Tree>
    </ul>
  </li>

</template>

<script>

export default {
  name: 'Tree',
  props:{
    model: Object
  },
  computed: {
    notLeaf: function () {
      return this.model.children &&
        this.model.children.length
    }
  }
}
</script>
