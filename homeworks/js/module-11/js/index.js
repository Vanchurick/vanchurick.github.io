"use strict";
const laptops = [
  {
    size: 13,
    color: "white",
    price: 28000,
    release_date: 2015,
    name: 'Macbook Air White 13"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 13,
    color: "gray",
    price: 32000,
    release_date: 2016,
    name: 'Macbook Air Gray 13"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 13,
    color: "black",
    price: 35000,
    release_date: 2017,
    name: 'Macbook Air Black 13"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "white",
    price: 45000,
    release_date: 2015,
    name: 'Macbook Air White 15"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "gray",
    price: 55000,
    release_date: 2016,
    name: 'Macbook Pro Gray 15"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "black",
    price: 45000,
    release_date: 2017,
    name: 'Macbook Pro Black 15"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "white",
    price: 65000,
    release_date: 2015,
    name: 'Macbook Air White 17"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "gray",
    price: 75000,
    release_date: 2016,
    name: 'Macbook Pro Gray 17"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "black",
    price: 80000,
    release_date: 2017,
    name: 'Macbook Pro Black 17"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  }
];

let form = document.querySelector(".js-form");
let matches = document.querySelector(".matches");

let sizes = [...document.querySelectorAll('[name="size"]')];
let colors = [...document.querySelectorAll('[name="color"]')];
let releaseDates = [...document.querySelectorAll('[name="release_date"]')];

form.addEventListener("submit", filterProducts);

let btnClear = document.querySelector('[type="reset"]');
btnClear.addEventListener("click", resetForm);

let filter = {
  size: [],
  color: [],
  release_date: []
};

const templateCard = document.querySelector("#card-temlate").innerHTML.trim();
const temp = Handlebars.compile(templateCard);
const galleryCard = document.querySelector(".gallery-cards");
galleryCard.innerHTML = laptops.reduce((acc, el) => acc + temp(el), "");

function filterProducts(e) {
  e.preventDefault();
  createFilter();
  createHtmml(filterResult(laptops));
}

function resetForm() {
  form.reset();
  galleryCard.innerHTML = laptops.reduce((acc, el) => acc + temp(el), "");
  matches.textContent = "";
}

function resetFilter() {
  filter.size = [];
  filter.color = [];
  filter.release_date = [];
}

function createFilter() {
  resetFilter();
  let checked = document.querySelectorAll("input[type=checkbox]:checked");
  [...checked].forEach(el => filter[el.name].push(el.value));
  
  // filter.size = sizes.filter(el => el.checked).map(el => +el.value);
  // if (filter.size.length === 0) filter.size = sizes.map(el => +el.value);
  // filter.color = colors.filter(el => el.checked).map(el => el.value);
  // if (filter.color.length === 0) filter.color = colors.map(el => el.value);
  // filter.release_date = releaseDates
  // .filter(el => el.checked)
  // .map(el => +el.value);
  // if (filter.release_date.length === 0) filter.release_date = releaseDates.map(el => +el.value);
}

function filterResult(arr) {
  // let a = arr.reduce((acc, el) => {
  //   if (
  //     filter.size.includes(el.size) &&
  //     filter.color.includes(el.color) &&
  //     filter.release_date.includes(el.release_date)
  //   ) {
  //     acc.push(el);
  //   }
  //   return acc;
  // }, []);
  // console.log(a);
  // return a;
  let result;
  return result = arr
    .filter(
      el =>
        filter.size.includes(String(el.size)) || filter.size.length === 0
    )
    .filter(
      el =>
        filter.color.includes(String(el.color)) || filter.color.length === 0
    )
    .filter(
      el =>
        filter.release_date.includes(String(el.release_date)) ||
        filter.release_date.length === 0
    );
    
    
}

function createHtmml(arr) {
  if (obj.length === 0) alert("No matches! Choose another filter parameters!");
  galleryCard.innerHTML = arr.reduce((acc, el) => acc + temp(el), "");
  matches.textContent = `Matches: ${arr.length}`;
}
