<template>
  <body>
    <div class="about">
      <h1>New Movie</h1>
      <div>
        Title: <input type="text" v-model="newMovieTitle" /><br>
        Year: <input type="text" v-model="newMovieYear" /><br>
        Plot: <input type="text" v-model="newMoviePlot" /><br>
        Director: <input type="text" v-model="newMovieDirector" /><br>
      </div>
      
      <button v-on:click="createMovie()">Create Movie</button>

      <h2>All Movies</h2>
      {{currentMovie}}

      <div v-for="movie in movies">
        <h2>Title: {{ movie.title }}</h2>
        <div>
          <button v-on:click="showMovie(movie)">More Info</button>
        </div>
        <div v-if="movie === currentMovie">
          <p>Year: {{ movie.year }}</p>
          <p>Plot: {{ movie.plot }}</p>
          <p>Director {{ movie.director }}</p>
          <h4>Edit Movie</h4>
          <div>
            Title: <input type="text" v-model="movie.title" /><br>
            Year: <input type="text" v-model="movie.year" /><br>
            Plot: <input type="text" v-model="movie.plot" /><br>
            Director: <input type="text" v-model="movie.director" /><br>
            <button v-on:click="updateMovie(movie)">Update Movie</button><br>
            <button v-on:click="destroyMovie(movie)">Destroy Movie</button><br>
            {{movie}}
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      movies: [],
      currentMovie: {},
      newMovieTitle: "",
      newMovieYear: "",
      newMoviePlot: "",
      newMovieDirector: ""
    };
  },
  created: function() {
    axios.get("/api/movies").then(response => {
      this.movies = response.data;
      console.log(this.movies)
    });
  },
  methods: {
    createMovie: function() {
      var params = {
        title: this.newMovieTitle,
        year: this.newMovieYear,
        plot: this.newMoviePlot,
        director: this.newMovieDirector
      };
      axios
        .post("/api/movies", params)
        .then(response => {
          console.log("Success", response.data);
          this.movies.push(response.data);
          this.newMovieTitle = "";
          this.newMovieYear = "";
          this.newMoviePlot = "";
          this.newMovieDirector = "";
        })
        .catch(error => {
          console.log(error.response.data.errors);
        });
    },
    showMovie: function(movie) {
      if (this.currentMovie === movie) {
        this.currentMovie = {};
      } else {
        this.currentMovie = movie;
      }
    },
    updateMovie: function(movie) {
      var params = {
        title: movie.title,
        year: movie.year,
        plot: movie.plot,
        director: movie.director
      };
      axios.patch("/api/movies/" + movie.id, params)
        .then(response => {
          console.log("Success", response.data);
        })
        .catch(error => {
          console.log(error.response.data.errors);
        });
    },
    destroyMovie: function(movie) {
      axios.delete("/api/movies/" + movie.id)
        .then(response => {
          console.log("Success", response.data);
          var index = this.movies.indexOf(movie);
          this.movies.splice(index, 1);
        });
    }
  }
};
</script>