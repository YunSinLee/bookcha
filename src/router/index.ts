import { createRouter, createWebHistory } from "vue-router";
import OnboardingView from "@/views/OnboardingView.vue";
import BookListView from "@/views/BookListView.vue";
import BookFormView from "@/views/BookFormView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "onboarding",
      component: OnboardingView,
    },
    {
      path: "/books",
      name: "books",
      component: BookListView,
    },
    {
      path: "/books/new",
      name: "book-new",
      component: BookFormView,
    },
    {
      path: "/books/:id/edit",
      name: "book-edit",
      component: BookFormView,
    },
  ],
});

export default router;
