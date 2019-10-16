<template>
  <div class="movies-index">
    <h1>{{ message }}</h1>

    

    <div v-for="movie in movies">
      <h2>{{ movie.title }}</h2>

      <p>Year: {{ movie.year }}</p>
      <p>Director: {{ movie.director }}</p>
      <p>Plot: {{ movie.plot }}</p>
      <router-link v-bind:to="`/movies/${movie.id}`"></router-link>

    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      message: "All Movies",
      movies: []
    };
  },
  created: function() {
    axios.get("/api/movies").then(response => {
      this.movies = response.data;
      console.log(this.movies);
    });
  },
  methods: {}
};
</script>