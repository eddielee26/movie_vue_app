<template>
  <div class="movies-edit">

    <form v-on:submit.prevent="submit()">
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Title:</label> 
        <input type="text" class="form-control" v-model="title">
      </div>
      <div class="form-group">
        <label>Year:</label>
        <input type="text" class="form-control" v-model="year">
      </div>
      <div class="form-group">
        <label>Director:</label>
        <input type="text" class="form-control" v-model="director">
      </div>
      <div class="form-group">
        <label>Plot:</label>
        <input type="text" class="form-control" v-model="plot">
      </div>

        <input type="submit" class="btn btn-primary" value="Submit">
      </form>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      movie: {},
      errors: []
    };
  },
  created: function() {
    axios.get("/api/movies/" + this.$route.params.id).then(response => {
      this.movie = response.data;
      console.log(this.movie);
    });
  },
  methods: {
    submit: function() {
      var params = {
        title: this.movie.title,
        year: this.movie.year,
        director: this.movie.director,
        plot: this.movie.plot,
      };
      axios
        .patch("/api/movies/" + this.movie.id, params)
        .then(response => {
          this.$router.push("/movies/" + this.movie.id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>