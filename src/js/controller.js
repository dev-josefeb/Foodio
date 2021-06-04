import * as model from './model.js';
import recipeView from './views/recipeView.js';
import headerView from './views/headerView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 1) Loading the Recipe
    await model.loadRecipe(id);

    // 2) Rendering the Recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(error);
  }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipes));
headerView.render();
