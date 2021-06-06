import * as model from './model.js';
import recipeView from './views/recipeView.js';
import headerView from './views/headerView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 1) Mark selected result
    resultsView.update(model.getSearchResultsPage());

    // 2) Loading the Recipe
    await model.loadRecipe(id);

    // 3) Rendering the Recipe
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

    // 3. Render search results
    resultsView.render(model.getSearchResultsPage());

    // 4. Render inital pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
}

function controlPagination(goToPage) {
  // 1 Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2 Render new pagination buttons
  paginationView.render(model.state.search);
}

function controlServings(newServings) {
  // 1. Update the recipe servings (in state)
  model.updateServings(newServings);

  // 2. Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

function controlAddBookmark() {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);
}

function init() {
  headerView.renderWithoutData();
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}

init();
