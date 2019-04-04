export default class Controller {
  constructor(model, view){
    this.model = model;
    this.view = view;

    view.on('add', this.addBookmark.bind(this));
    view.on('remove', this.removeBookmark.bind(this))
  }

  addBookmark(text) {
  this.model.addBookmarkToArray(text).then(item => this.view.addBookmarkToDOM(item));
   
  }

  removeBookmark(id) {
    this.model.removeBookmarkFromArray(id);
    this.view.removeBookmarkFromDOM(id);
  }

  
}
