import EventEmitter from './emitter';

export default class View extends EventEmitter {
  constructor() {
    super();

    this.form = document.querySelector('.js-form');
    this.input = document.querySelector('.js-input');
    this.button = document.querySelector('.js-button');
    this.bookmarksContainer = document.querySelector('.js-bookmarks');

    this.form.addEventListener(
      'submit',
      this.sendInputValueToController.bind(this),
    );

    this.deleteBtns = [];
  }

  sendInputValueToController(e) {
    e.preventDefault();
    if(this.input.value === '') return alert('Enter bookmark!');
    this.emit('create', this.input.value);
    this.form.reset();
  }

  createBookmarksInHTML(arr) {
    let source = document.querySelector('#bookmark-template').innerHTML.trim();
    let template = Handlebars.compile(source);
    let markup = arr.reduce((acc, el) => acc + template(el), '');
    this.bookmarksContainer.innerHTML = markup;

    this.deleteBtns = document.querySelectorAll('.js-delete-button');
    [...this.deleteBtns].forEach(btn =>
      btn.addEventListener(
        'click',
        this.sendIdOfBookmarkForDeleteToController.bind(this),
      ),
    );
  }

  sendIdOfBookmarkForDeleteToController(e) {
    this.emit('delete', e.target.parentNode.id);
  }
}
