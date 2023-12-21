<!--
 * @name: 
 * @param: 
 * @return: 
-->
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/list">Problems</router-link> |
      <router-link to="/add">Add Question</router-link>|
      <router-link to="/studyPlan">Study Plan</router-link> |
      <router-link to="/user">User Center</router-link>|
      <router-link to="/login">Login</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import 'style/common.scss';
nav {
  padding: 20px 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
