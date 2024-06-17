<!--
 * @name: 
 * @param: 
 * @return: 
-->
<template>
  <div id="app">
    <page-header/>
    <router-view />
  </div>
</template>
<script>
import pageHeader from './components/page-header.vue'
export default {
  name: "app",
  components: {
    pageHeader
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style lang="scss">
@import "style/app.scss";
@import "style/responsive.scss";
</style>
