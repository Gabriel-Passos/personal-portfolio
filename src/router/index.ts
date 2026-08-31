import { createWebHistory, createRouter } from "vue-router";

import { AppRoutes } from "../constants/app-routes.ts";

import Home from "../pages/home.vue";
import AboutMe from "../pages/about-me.vue";
import Contact from "../pages/contact.vue";
import Projects from "../pages/projects.vue";
import Project from "../pages/project.vue";

const routes = [
  { path: AppRoutes.HOME, component: Home },
  { path: AppRoutes.ABOUT_ME, component: AboutMe },
  { path: AppRoutes.CONTACT, component: Contact },
  { path: AppRoutes.PROJECTS, component: Projects },
  { path: `${AppRoutes.PROJECT}/:id`, name: "Project", component: Project },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});
