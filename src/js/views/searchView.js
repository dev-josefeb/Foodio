class SearchView {
  getQuery() {
    const query = document.querySelector('.search').querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  addHandlerSearch(handler) {
    document.querySelector('.search').addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  _clearInput() {
    document.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
