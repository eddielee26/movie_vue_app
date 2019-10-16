<!-- NOTE: _actor.json.jb VIEW and actor.rb MODEL edits made to make this code work  -->

<template>
  <div class="home">
    <h1>New Actor</h1>
    <div>
      First Name: <input type="text" v-model="newActorFirstName" /><br>
      Last Name: <input type="text" v-model="newActorLastName" /><br>
      Gender: <input type="text" v-model="newActorGender" /><br>
      Age: <input type="text" v-model="newActorAge" /><br>
    </div>

    <button v-on:click="createActor()">Create Actor</button>

    <h2>All Actors</h2>
    {{currentActor}}

    <div v-for="actor in actors">
      <h2>Name: {{ actor.first_name }} {{ actor.last_name }}</h2>
      <div>
        <button v-on:click="showActor(actor)">More Info</button>
      </div>
      <div v-if="actor === currentActor">
        <p>Gender: {{ actor.gender }}</p>
        <p>Age: {{ actor.age }}</p>
        <h4>Edit Actor</h4>
        <div>
          First Name: <input type="text" v-model="actor.first_name" /><br>
          Last Name: <input type="text" v-model="actor.last_name" /><br>
          Gender: <input type="text" v-model="actor.gender" /><br>
          Age: <input type="text" v-model="actor.age" /><br>
          <button v-on:click="updateActor(actor)">Update</button><br>
          <button v-on:click="destroyActor(actor)">Destroy</button><br>
          {{actor}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      actors: [],
      currentActor: {},
      newActorFirstName: "",
      newActorLastName: "",
      newActorGender: "",
      newActorAge: ""
    };
  },
  created: function() {
    axios.get("/api/actors").then(response => {
      this.actors = response.data;
      console.log(this.actors)
    });
  },
  methods: {
    createActor: function() {
      var params = {
        first_name: this.newActorFirstName,
        last_name: this.newActorLastName,
        gender: this.newActorGender,
        age: this.newActorAge
      };
      axios
        .post("/api/actors", params)
        .then(response => {
          console.log("Success", response.data);
          this.actors.push(response.data);
          this.newActorFirstName = "";
          this.newActorLastName = "";
          this.newActorGender = "";
          this.newActorAge = "";
        })
        .catch(error => {
          console.log(error.response.data.errors);
        });
    },
    showActor: function(actor) {
      if (this.currentActor === actor) {
        this.currentActor = {};
      } else {
        this.currentActor = actor;
      }
    },
    updateActor: function(actor) {
      var params = {
        first_name: actor.first_name,
        last_name: actor.last_name,
        gender: actor.gender,
        age: actor.age
      };
      axios.patch("/api/actors/" + actor.id, params)
        .then(response => {
          console.log("Success", response.data);
        })
        .catch(error => {
          console.log(error.response.data.errors);
        });
    },
    destroyActor: function(actor) {
      axios.delete("/api/actors/" + actor.id)
        .then(response => {
          console.log("Success", response.data);
          var index = this.actors.indexOf(actor);
          this.actors.splice(index, 1);
        });
    }
  }
};
</script>


