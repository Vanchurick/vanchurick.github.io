"use strict";
const keyAPI = "5c97dd5c0903cf2826553dde5f86a5c02a277376713fd";
const URL = `http://api.linkpreview.net/?key=${keyAPI}&q=https://`;
let form = document.querySelector("#form");
let input = form.querySelector("input");
input.setAttribute("placeholder", "www.google.com");
form.addEventListener("submit", createBookmark);
window.addEventListener("DOMContentLoaded", updateView);
let templateCard = document.querySelector("#card").innerHTML.trim();
let temp = Handlebars.compile(templateCard);
let container = document.querySelector(".bookmarks");
let bookmarks = [];

function createBookmark(e) {
  e.preventDefault();
  if (input.value.length === 0) return;
  if (!inputValidation(input.value)) {
    form.reset();
    return alert("Закладка не валидная");
  }

  fetch(URL + input.value)
    .then(response => response.json())
    .then(data => addToBookmarks(bookmarks, data))
    .catch(err => console.log(err));

  form.reset();
}

function addToBookmarks(arr, obj) {
  if (isBookmarkExist(arr, obj)) {
    form.reset();
    return alert("Закладка уже существует!");
  }
  for (let key in obj) {
    if (key === "error") return alert(`${obj.description}`);
  }
  arr.unshift(obj);

  createCardsInHTML(arr);
  localStorage.setItem("bookmarks", JSON.stringify(arr));
}

function createCardsInHTML(arr) {
  container.innerHTML = arr.reduce((acc, el) => acc + temp(el), "");
  let removeBtns = document.querySelectorAll(".remove");
  [...removeBtns].map(el => el.addEventListener("click", removeBookmark));
}

function removeBookmark(e) {
  e.target.parentNode.remove();
  let filtered = bookmarks.filter(
    el => e.target.previousElementSibling.href !== el.url
  );
  bookmarks = filtered;
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function inputValidation(string) {
  let regular = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
  let result = regular.test(string);
  return result;
}

function isBookmarkExist(arr, obj) {
  let copyObj = arr.find(el => el.url === obj.url);
  return copyObj;
}

function updateView() {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  createCardsInHTML(bookmarks);
}
