import * as model from './model.js';
import recipeView from './views/recipeView.js';
import headerView from './views/headerView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

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
    recipeView.renderError();
  }
}

async function controlSearchResults() {
  try {
    resultsView.renderSpinner();

    // 1. Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load search results
    await model.loadSearchResults(query);
    console.log(model.state.search.results);

    // 3. Render search results
    resultsView.render(model.getSearchResultsPage());
  } catch (error) {
    console.log(error);
  }
}

function init() {
  headerView.renderWithoutData();
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}

init();
