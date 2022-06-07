import IngredientListView from "../views/ingredients/IngredientListView.vue";
import IngredientDetailView from "../views/ingredients/IngredientDetailView.vue";
import IngredientAddView from "../views/ingredients/IngredientAddView.vue";

export default [
  {
    path: "/ingredients",
    name: "ingredients",
    component: IngredientListView,
  },
  {
    path: "/ingredient/:id/detail",
    name: "ingredient-detail",
    component: IngredientDetailView,
  },
  {
    path: "/ingredient/add",
    name: "ingredient-add",
    component: IngredientAddView,
  },
];
