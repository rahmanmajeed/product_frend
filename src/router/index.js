import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import { isLoggedIn } from "./../utils/auth";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      allowAnonymous: true
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      allowAnonymous: false
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.name === "Login" && isLoggedIn()) {
    next({ path: "/home" });
    // next({ path: '/login', query: { redirect: to.fullPath } })
  } else if (!to.meta.allowAnonymous && !isLoggedIn()) {
    next({ path: "/", query: { redirect: to.fullPath } });
  } else {
    next(true);
  }
});
export default router;
