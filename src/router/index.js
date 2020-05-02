import Vue from "vue";
import VueRouter from "vue-router";
import Top from "../components/Top.vue";
import TopForGuest from "../components/TopForGuest.vue";
import First from "../components/First.vue";
import Test from "../components/Test.vue";
import Graph from "../components/Graph.vue";


Vue.use(VueRouter);

const routes = [{
    path: "*",
    redirect: "top"
  },
  {
    path: "/",
    name: "first",
    component: First
  },
  {
    path: "/top",
    name: "top",
    component: Top
  },
  {
    path: "/guestTop",
    name: "guestTop",
    component: TopForGuest
  },

  {
    path: "/graph",
    name: "graph",
    component: Graph
  },
  {
    path: "/graph/:uid",
    name: "graphWithPa",
    component: Graph
  },
  {
    path: "/test",
    name: "test",
    component: Test
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;