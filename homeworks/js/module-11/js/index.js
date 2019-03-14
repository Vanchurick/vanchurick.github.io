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
let matches = document.querySelector('.matches')

let sizes = [...document.querySelectorAll('[name="size"]')];
let colors = [...document.querySelectorAll('[name="color"]')];
let releaseDates = [...document.querySelectorAll('[name="release_date"]')];

form.addEventListener("submit", filterProducts);

let btnClear = document.querySelector('[type="reset"]');
btnClear.addEventListener('click', resetForm);

const filter = { size: [], color: [], release_date: [] };

const templateCard = document.querySelector('#card-temlate').innerHTML.trim();
const temp = Handlebars.compile(templateCard);
const galleryCard = document.querySelector('.gallery-cards');
galleryCard.innerHTML = laptops.reduce((acc, el) => acc + temp(el), '');

function filterProducts(e) {
  e.preventDefault();
  createFilter();
  createHtmml(filterResult(laptops))
}

function resetForm () {
  form.reset();
  galleryCard.innerHTML = laptops.reduce((acc, el) => acc + temp(el), '');
}

function createFilter() {
  filter.size = sizes.filter(el => el.checked).map(el => +el.value);
  filter.color = colors.filter(el => el.checked).map(el => el.value);
  filter.release_date = releaseDates
    .filter(el => el.checked)
    .map(el => +el.value);
}

function filterResult (arr) {
  let sizeFilterResult = arr.filter(el => filter.size.includes(el.size));

  let colorFilterResult = sizeFilterResult.filter(el => filter.color.includes(el.color));
  if(sizeFilterResult.length === 0) {
    colorFilterResult = arr.filter(el => filter.color.includes(el.color));
  }
  let releaseFilterResult = colorFilterResult.filter(el => filter.release_date.includes(el.release_date))
  if(colorFilterResult.length === 0) {
  releaseFilterResult = sizeFilterResult.filter(el => filter.release_date.includes(el.release_date))
  }
  if(colorFilterResult.length === 0 && sizeFilterResult.length === 0) {
    releaseFilterResult = arr.filter(el => filter.release_date.includes(el.release_date))
  }
  
  let s = sizeFilterResult.length;
  let c = colorFilterResult.length;
  let r = releaseFilterResult.length;
  
  if(s === 0 && c !==0 && filter.release_date.length !== 0) return releaseFilterResult;
  if(s !== 0 && c !==0 && r !== 0) return releaseFilterResult;
  if(s !== 0 && c ===0 && r === 0) return sizeFilterResult;
  if(s === 0 && c !==0 && r === 0) return colorFilterResult;
  if(s === 0 && c ===0 && r !== 0) return releaseFilterResult;
  if(s !== 0 && c !==0 && r === 0) return colorFilterResult;
  if(s !== 0 && c ===0 && r !== 0) return releaseFilterResult;
  if(s === 0 && c !==0 && r !== 0) return releaseFilterResult;
  if(s === 0 && c ===0 && r === 0) return arr;
}


function createHtmml (obj) {
  galleryCard.innerHTML = obj.reduce((acc, el) => acc + temp(el), '');
  matches.textContent = `Matches: ${obj.length}`;
}



let filtredLaptops = laptops.filter((el) => {
  if (filter.size.includes(el.size) && filter.color.includes(el.color) && filter.release_date.includes(el.release_date)){
    return el;
  };
  if (filter.release_date.length === 0 && filter.color.length === 0 && filter.size.length === 0) {
    return el;
  };
  if (filter.release_date.length === 0) {
    if (filter.size.includes(el.size) && filter.color.includes(el.color)){
      return el;
    };
    if (filter.color.length === 0) {
      if (filter.size.includes(el.size)){
        return el;
      };
    }
    if (filter.size.length === 0) {
      if (filter.color.includes(el.color)){
        return el;
      };
    }
  }
  if (filter.size.length === 0) {
    if (filter.release_date.includes(el.release_date) && filter.color.includes(el.color)){
      return el;
    };
    if (filter.color.length === 0) {
      if (filter.release_date.includes(el.release_date)){
        return el;
      };
    }
    if (filter.release_date.length === 0) {
      if (filter.color.includes(el.color)){
        return el;
      };
    }
  }
  if (filter.color.length === 0) {
    if (filter.size.includes(el.size) && filter.release_date.includes(el.release_date)){
      return el;
    };
    if (filter.size.length === 0) {
      if (filter.release_date.includes(el.release_date)){
        return el;
      };
    }
    if (filter.release_date.length === 0) {
      if (filter.size.includes(el.size)){
        return el;
      };
    }
  }
 
});