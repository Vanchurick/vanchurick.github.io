export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('create', this.addBookmarks.bind(this));
    view.on('delete', this.deleteBookmark.bind(this));
  }

  addBookmarks(text) {
    this.model
      .addBookmarkToArr(text)
      .then(arr => this.view.createBookmarksInHTML(arr));
  }

  deleteBookmark(id) {
    this.view.createBookmarksInHTML(this.model.deleteBookmarkFromArr(id));
  }

  loadPage() {
    document.addEventListener(
      'DOMContentLoaded',
      this.view.createBookmarksInHTML(this.model.bookmarksArr),
    );
  }
}
