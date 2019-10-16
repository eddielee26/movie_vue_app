<template>
  <div class="movies-show">

    <h1>{{ message }}</h1>
    <h2>{{ movie.title }}</h2>
    <p>Year: {{ movie.year }}</p>
    <p>Director: {{ movie.director }}</p>
    <p>Plot: {{ movie.plot }}</p>

    <router-link v-bind:to="`/movies/${movie.id}/edit`">Edit</router-link>

    <div>
      <button v-on:click="destroyMovie()">Destroy</button>
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
      message: "Movie Show",
      movie: []
    };
  },
  created: function() {
    axios.get("/api/movies/" + this.$route.params.id).then(response => {
      this.movie = response.data;
      console.log(this.movie);
    });
  },
  methods: {
    destroyMovie: function() {
      axios.delete("/api/movies/" + this.movie.id)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/movies");
        });
    }
  }
};
</script>