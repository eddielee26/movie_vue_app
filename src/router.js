import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import MoviesIndex from './views/MoviesIndex.vue';
import MoviesNew from './views/MoviesNew.vue';
import MoviesShow from './views/MoviesShow.vue';
import MoviesEdit from './views/MoviesEdit.vue';
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import( webpackChunkName: "about"  './views/About.vue')
    },
    {
      path: '/movies',
      name: 'movies-index',
      component: MoviesIndex
    },
    {
      path: "/movies/new",
      name: "movies-new",
      component: MoviesNew
    },
    {
      path: "/movies/:id",
      name: "movies-show",
      component: MoviesShow
    },
    {
      path: "/movies/:id/edit",
      name: "movies-edit",
      component: MoviesEdit
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout
    }
  ]
});
