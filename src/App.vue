<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Actors</router-link> |
      <router-link to="/about">Movies</router-link> |
      <router-link to="/movies">MoviesIndex</router-link> |
      <router-link to="/movies/new">MoviesNew</router-link> |
      <router-link to="/movies/show">MoviesShow</router-link> |
      <router-link to="/movies/edit">MoviesEdit</router-link> |
      <router-link to="/signup">Signup</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/logout">Logout</router-link> |
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
