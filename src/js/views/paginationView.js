import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      handler(+btn.dataset.goto);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    // Page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', currentPage);
    }

    // Last Page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', currentPage);
    }

    // Other Pages
    if (currentPage < numPages) {
      return this._generateMarkupButton('prev', currentPage) + this._generateMarkupButton('next', currentPage);
    }

    // Page 1, and no other pages
    return '';
  }

  _generateMarkupButton(buttonType, currentPage) {
    const page = buttonType === 'prev' ? currentPage - 1 : currentPage + 1;

    return `
        <button data-goto="${page}" class="btn--inline pagination__btn--${buttonType === 'prev' ? 'prev' : 'next'}">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-${buttonType === 'prev' ? 'left' : 'right'}"></use>
            </svg>
            <span>Page ${page}</span>
        </button>
    `;
  }
}

export default new PaginationView();
