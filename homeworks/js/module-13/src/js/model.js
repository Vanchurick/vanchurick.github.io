import v4 from 'uuid/v4';

export default class Model {
  constructor(bookmarks = []) {
    this.bookmarks = bookmarks;
  }

  addBookmarkToArray(text) {
    if(!this.inputValidation(text)){
      alert("Закладка не валидная")
      text = "";
    }
    const keyAPI = '5c97dd5c0903cf2826553dde5f86a5c02a277376713fd';
    const URL = `https://api.linkpreview.net/?key=${keyAPI}&q=https://`;
    return fetch(URL + text)
      .then(resp => resp.json())
      .then(data => {
        const obj = data;
        if (this.bookmarks.find(item => item.url === obj.url))
          return alert('Закладка уже существует');
        for (let key in obj) {
          if (key === 'error') return alert(`${obj.description}`);
        }
        obj.id = v4();
        this.bookmarks.push(obj);
        console.log(this.bookmarks);
        return obj;
      })
      .catch(err => console.log(err));
  }

  removeBookmarkFromArray(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
    console.log(this.bookmarks);
  }

  inputValidation(string) {
    let regular = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
    let result = regular.test(string);
    return result;
  }
}
