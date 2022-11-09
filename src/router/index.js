import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/useAuth";
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
import RecipeDetailView from "@/views/recipes/RecipeDetailView.vue";
import RecipeCreateView from "@/views/recipes/RecipeCreateView.vue";

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
      meta: { layout: "base" },
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
      meta: { layout: "base" },
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      meta: { layout: "base" },
      component: RegisterView,
    },

    // Membership Routes
    {
      path: "/pricing",
      name: "pricing",
      meta: { layout: "base" },
      component: PricingView,
    },
    {
      path: "/checkout",
      name: "checkout",
      meta: { layout: "base" },
      component: CheckoutView,
    },

    // Ingredient Routes
    {
      path: "/dashboard/ingredients/list",
      name: "ingredient-list",
      component: IngredientListView,
    },
    {
      path: "/dashboard/ingredient/add",
      name: "ingredient-add",
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
      name: "recipe-list",
      component: RecipeListView,
    },
    {
      path: "/dashboard/recipes/create",
      name: "recipe-create",
      component: RecipeCreateView,
    },
    {
      path: "/dashboard/recipe/:id/delete",
      name: "recipe-delete",
      component: RecipeConfirmDeleteView,
    },
    {
      path: "/dashboard/recipe/:id/detail",
      name: "recipe-detail",
      component: RecipeDetailView,
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

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const publicPages = ["home", "login", "register"];

  if (publicPages.includes(to.name)) {
    return next();
  }

  if (!auth.isAuthenticated) {
    console.log("user not authenticated");
    router.push({ name: "login" });
  }

  return next();
});

export default router;
