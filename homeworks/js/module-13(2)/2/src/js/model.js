import v4 from 'uuid/v4';

export default class Model {
  constructor() {
    this.bookmarksArr = JSON.parse(localStorage.getItem('bookmarks')) || [];
    this.keyAPI = '5c97dd5c0903cf2826553dde5f86a5c02a277376713fd';
    this.URL = `https://api.linkpreview.net/?key=${this.keyAPI}&q=https://`;
    this.regular = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
  }

  addBookmarkToArr(text) {
    // console.log('До if. Здесь true но код ниже не работает, если эта строка раскоментирована. Игнорирует if и сразу переходит к else хотя условие вроде как выполняется', this.regular.test(text));
    if (this.regular.test(text)) {
      console.log('после if. И почему здесь показывает false. Если эту строку удалить или закоментировать работает через раз сначала работает потом игнорирует fetch.',this.regular.test(text),);
      return fetch(this.URL + text)
        .then(resp => resp.json())
        .then(data => {
          let obj = data;
          for (let key in obj) {
            if (key === 'error') {
              alert(`${obj.description}`);
              return this.bookmarksArr;
            }
          }
          if (this.bookmarksArr.some(el => el.url === obj.url)) {
            alert('Bookmark have been added earlier!');
            return this.bookmarksArr;
          }
          obj.id = v4();
          this.bookmarksArr.unshift(obj);
          localStorage.setItem('bookmarks', JSON.stringify(this.bookmarksArr));
          return this.bookmarksArr;
        })
        .catch(err => console.log(err));
    } else {
      alert('False bookmark');
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(this.bookmarksArr);
        }, 100);
      });
    }
  }

  deleteBookmarkFromArr(id) {
    let filteredArr = this.bookmarksArr.filter(el => el.id !== id);
    localStorage.setItem('bookmarks', JSON.stringify(filteredArr));
    this.bookmarksArr = filteredArr;
    return this.bookmarksArr;
  }
}
