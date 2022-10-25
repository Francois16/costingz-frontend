import { createRouter, createWebHistory } from "vue-router";

// Views
import HomeView from "../views/HomeView.vue";

// Auth Routes
import LoginView from "../views/Autentication/LoginView.vue";
import RegisterView from "../views/Autentication/RegisterView.vue";

// Ingredient Routes
import IngredientListView from "@/views/ingredients/IngredientListView.vue";

// Recipe Routes
import RecipeListView from "@/views/recipes/RecipeListView.vue";

// Misc Routes
import NotFoundView from "../views/NotFoundView.vue";

// Pricing Routes
import PricingView from "@/views/membership/PricingView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    // Authentication Routes
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },

    // Membership Routes
    {
      path: "/pricing",
      name: "pricing",
      component: PricingView,
    },

    // Ingredient Routes
    {
      path: "/ingredients/list",
      name: "ingredientList",
      component: IngredientListView,
    },

    // Recipe Routes
    {
      path: "/recipes/list",
      name: "recipeList",
      component: RecipeListView,
    },

    // Misc Routes
    {
      path: "/404",
      name: "404",
      component: NotFoundView,
    },
    {
      // Anything that is not a valid path is
      // redirected to the 404 route.
      path: "/:pathMatch(.*)*",
      redirect: "/404",
    },
  ],
});

export default router;
