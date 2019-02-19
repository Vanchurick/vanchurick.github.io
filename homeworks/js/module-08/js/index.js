"use strict";

const galleryItems = [
  {
    preview: "./img/1.jpeg",
    fullview: "./img/10.jpeg",
    alt: "alt text 1"
  },
  {
    preview: "./img/2.jpeg",
    fullview: "./img/20.jpeg",
    alt: "alt text 2"
  },
  {
    preview: "./img/3.jpeg",
    fullview: "./img/30.jpeg",
    alt: "alt text 3"
  },
  {
    preview: "./img/4.jpeg",
    fullview: "./img/40.jpeg",
    alt: "alt text 4"
  },
  {
    preview: "./img/5.jpeg",
    fullview: "./img/50.jpeg",
    alt: "alt text 5"
  },
  {
    preview: "./img/6.jpeg",
    fullview: "./img/60.jpeg",
    alt: "alt text 6"
  }
];

const gallery = document.querySelector(".js-image-gallery");
// create element
let fullview = document.createElement("div");
let preview = document.createElement("ul");
let fullImg = document.createElement("img");
// classes
fullview.classList.add("fullview");
preview.classList.add("preview");
// attributes
fullImg.setAttribute("src", galleryItems[0].fullview);
fullImg.setAttribute("alt", "alt text 1");
// paste el to html
gallery.append(fullview);
fullview.append(fullImg);
gallery.append(preview);

function createItemOfPreviewGallery(obj) {
  // create element
  let li = document.createElement("li");
  let img = document.createElement("img");
  // attributes
  img.setAttribute("src", obj.preview);
  img.setAttribute("data-fullview", obj.fullview);
  img.setAttribute("alt", obj.alt);
  // paste el to html
  li.append(img);

  return li;
}

function createPreviewGallery(arr) {
  for (let el of arr) {
    preview.append(createItemOfPreviewGallery(el));
  }
}

createPreviewGallery(galleryItems);
preview.firstChild.classList.add("choosen");

function chooseFullImg(e) {
  if(e.target.nodeName !== 'IMG') return;
  fullImg.setAttribute("src", e.target.getAttribute("data-fullview"));

  let previewGallery = document.querySelectorAll(".preview > li");

  previewGallery.forEach(el => redShadow(el));

  function redShadow(el) {
    if (e.target === el.firstElementChild) {
      el.classList.add("choosen");
    } else {
      el.classList.remove("choosen");
    }
  }
}

preview.addEventListener("click", chooseFullImg);
