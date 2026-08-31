import { createWebHistory, createRouter } from "vue-router";

import { AppRoutes } from "../constants/app-routes.ts";

import Home from "../pages/home.vue";
import AboutMe from "../pages/about-me.vue";
import Contact from "../pages/contact.vue";
import Projects from "../pages/projects.vue";
import Project from "../pages/project.vue";

const BASE_TITLE = "Gabriel Passos";

const routes = [
  {
    path: AppRoutes.HOME,
    name: "home",
    component: Home,
    meta: { title: "Home" },
  },
  {
    path: AppRoutes.ABOUT_ME,
    name: "about",
    component: AboutMe,
    meta: { title: "Sobre mim" },
  },
  {
    path: AppRoutes.CONTACT,
    name: "contact",
    component: Contact,
    meta: { title: "Contato" },
  },
  {
    path: AppRoutes.PROJECTS,
    name: "projects",
    component: Projects,
    meta: { title: "Projetos" },
  },
  {
    path: `${AppRoutes.PROJECT}/:id`,
    name: "project",
    component: Project,
  },
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

router.afterEach((to) => {
  document.title = to.meta.title
    ? `${BASE_TITLE} · ${to.meta.title}`
    : BASE_TITLE;
});
