"use strict";
/*
  1. Модифицируйте готовую функцию createPostCard() из задания 
    номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ) так, 
    чтобы она принимала объект post с данными для заполнения полей 
    в карточке.
      
  2. Создайте функцию createCards(posts), которая принимает массив
    объектов-карточек, вызывает функцию createPostCard(post) столько
    раз, сколько объектов в массиве, сохраняя общий результат и возвращает 
    массив DOM-элементов всех постов.
    
  3. Повесьте все посты в какой-то уже существующий DOM-узел.
*/

const posts = [
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 1",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: "link-1.com"
  },
  {
    img: "https://placeimg.com/400/150/nature",
    title: "Post title 2",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: "link-2.com"
  },
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 3",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: "link-3.com"
  }
];

function createPostCard(obj, box) {
  let container = document.querySelector(box);
  // create element
  let movie = document.createElement("div");
  let img = document.createElement("img");
  let movieBody = document.createElement("div");
  let h2 = document.createElement("h2");
  let movieDescription = document.createElement("p");
  let p = document.createElement("p");
  let link = document.createElement("a");
  // classes
  movie.classList.add("movie");
  img.classList.add("movie__image");
  movieBody.classList.add("movie__body");
  h2.classList.add("movie__title");
  movieDescription.classList.add("movie__description");
  // attributes
  img.setAttribute("src", obj.img);
  img.setAttribute("alt", "");
  link.setAttribute("href", obj.link);
  //text content
  h2.textContent = obj.title;
  movieDescription.textContent = obj.text;
  link.textContent = "Link";
  // paste el to html
  container.append(movie);
  movie.append(img);
  movie.append(movieBody);
  movieBody.append(h2);
  movieBody.append(movieDescription);
  movieBody.append(p);
  p.append(link);
}

// createPostCard(a);

function createCards(posts, container) {
  for (let el of posts) {
    createPostCard(el, container);
  }
}

createCards(posts, ".div");

