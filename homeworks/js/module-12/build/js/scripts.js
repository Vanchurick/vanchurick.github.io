"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var keyAPI = "5c97dd5c0903cf2826553dde5f86a5c02a277376713fd";
var URL = "http://api.linkpreview.net/?key=".concat(keyAPI, "&q=https://");
var form = document.querySelector("#form");
var input = form.querySelector("input");
input.setAttribute("placeholder", "www.google.com");
form.addEventListener("submit", createBookmark);
window.addEventListener("DOMContentLoaded", updateView);
var templateCard = document.querySelector("#card").innerHTML.trim();
var temp = Handlebars.compile(templateCard);
var container = document.querySelector(".bookmarks");
var bookmarks = [];

function createBookmark(e) {
  e.preventDefault();
  if (input.value.length === 0) return;

  if (!inputValidation(input.value)) {
    form.reset();
    return alert("Закладка не валидная");
  }

  fetch(URL + input.value).then(function (response) {
    return response.json();
  }).then(function (data) {
    return addToBookmarks(bookmarks, data);
  }).catch(function (err) {
    return console.log(err);
  });
  form.reset();
}

function addToBookmarks(arr, obj) {
  if (isBookmarkExist(arr, obj)) {
    form.reset();
    return alert("Закладка уже существует!");
  }

  for (var key in obj) {
    if (key === "error") return alert("".concat(obj.description));
  }

  arr.unshift(obj);
  createCardsInHTML(arr);
  localStorage.setItem("bookmarks", JSON.stringify(arr));
}

function createCardsInHTML(arr) {
  container.innerHTML = arr.reduce(function (acc, el) {
    return acc + temp(el);
  }, "");
  var removeBtns = document.querySelectorAll(".remove");

  _toConsumableArray(removeBtns).map(function (el) {
    return el.addEventListener("click", removeBookmark);
  });
}

function removeBookmark(e) {
  e.target.parentNode.remove();
  var filtered = bookmarks.filter(function (el) {
    return e.target.previousElementSibling.href !== el.url;
  });
  bookmarks = filtered;
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function inputValidation(string) {
  var regular = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
  var result = regular.test(string);
  return result;
}

function isBookmarkExist(arr, obj) {
  var copyObj = arr.find(function (el) {
    return el.url === obj.url;
  });
  return copyObj;
}

function updateView() {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  createCardsInHTML(bookmarks);
}