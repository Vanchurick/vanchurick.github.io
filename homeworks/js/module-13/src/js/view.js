import EventEmitter from './emitter';

export default class View extends EventEmitter {
  constructor() {
    super();

    this.form = document.querySelector('#form');
    this.input = this.form.querySelector('.input');
    this.bookmarksSection = document.querySelector('.bookmarks');

    this.form.addEventListener('submit', this.handelAdd.bind(this));
  }

  handelAdd(e) {
    e.preventDefault();
    if (this.input.value === '') return alert('Empty string');

    this.emit('add', this.input.value);
  }

  createBookmark(obj) {
    let bookmark = document.createElement('div');
    bookmark.classList.add('bookmark');
    bookmark.dataset.id = obj.id;

    let link = document.createElement('a');
    link.setAttribute('href', obj.url);
    link.setAttribute('target', '_blank');

    let img = document.createElement('img');
    img.setAttribute('src', obj.image);
    img.setAttribute('title', obj.description);

    let button = document.createElement('button');
    button.textContent = 'X';
    button.dataset.action = 'remove';
    button.classList.add('remove');

    let title = document.createElement('h3');
    title.textContent = obj.title;

    bookmark.append(link);
    link.append(img);
    bookmark.append(button);
    bookmark.append(title);

    this.addEventListeners(bookmark);

    return bookmark;
  }

  addBookmarkToDOM(obj) {
    if (!obj) return this.form.reset();;
    let bookmark = this.createBookmark(obj);
    this.form.reset();
    this.bookmarksSection.prepend(bookmark);
  }

  addEventListeners(bookmark) {
    let removeBtn = bookmark.querySelector('[data-action="remove"]');
    removeBtn.addEventListener('click', this.handleRemove.bind(this));
  }

  handleRemove({ target }) {
    const parent = target.closest('.bookmark');
    this.emit('remove', parent.dataset.id);
  }

  removeBookmarkFromDOM(id) {
    const item = this.bookmarksSection.querySelector(`[data-id="${id}"]`);
    this.bookmarksSection.removeChild(item);
  }
}
