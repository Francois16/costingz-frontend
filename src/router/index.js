import { createRouter, createWebHistory } from "vue-router";

// Views
import HomeView from "../views/HomeView.vue";

// Dashboard Views
import DashboardView from "@/views/dashboard/DashboardView.vue";

// Auth Routes
import LoginView from "../views/Autentication/LoginView.vue";
import RegisterView from "../views/Autentication/RegisterView.vue";

// Ingredient Routes
import IngredientListView from "@/views/ingredients/IngredientListView.vue";
import IngredientConfirmDeleteView from "@/views/ingredients/IngredientConfirmDeleteView.vue";
import IngredientAddView from "@/views/ingredients/IngredientAddView.vue";
import IngredientUpdateView from "@/views/ingredients/IngredientUpdateView.vue";

// Recipe Routes
import RecipeListView from "@/views/recipes/RecipeListView.vue";
import RecipeConfirmDeleteView from "@/views/recipes/RecipeConfirmDeleteView.vue";
// Misc Routes
import NotFoundView from "@/views/NotFoundView.vue";

// Pricing Routes
import PricingView from "@/views/membership/PricingView.vue";
import CheckoutView from "@/views/membership/CheckoutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    // Dashboard Routes
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
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
    {
      path: "/checkout",
      name: "checkout",
      component: CheckoutView,
    },

    // Ingredient Routes
    {
      path: "/dashboard/ingredients/list",
      name: "ingredientList",
      component: IngredientListView,
    },
    {
      path: "/dashboard/ingredient/add",
      name: "ingredientAdd",
      component: IngredientAddView,
    },
    {
      path: "/dashboard/ingredient/:id/confirm-delete",
      name: "confirm-ingredient-delete",
      component: IngredientConfirmDeleteView,
    },
    {
      path: "/dashboard/ingredient/:id/update",
      name: "ingredient-update",
      component: IngredientUpdateView,
    },

    // Recipe Routes
    {
      path: "/dashboard/recipes/list",
      name: "recipeList",
      component: RecipeListView,
    },
    {
      path: "/dashboard/recipe/:id/delete",
      name: "recipe-delete",
      component: RecipeConfirmDeleteView,
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
