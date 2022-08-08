const auth = "563492ad6f917000010000011770bc193a4e41ccade521dbdab1c500";

let GetPicture = document.querySelector(".getPicture");
let section = document.querySelector("section");
let searchButton = document.querySelector(".searchButton");
let inputValue = document.querySelector(".input");
let page = 1;
//search
let input = "";
let currentSearch = false;
/*=========input===============*/
inputValue.addEventListener("input", (e) => {
  e.preventDefault();
  input = e.target.value;
});
/*============check your input==============*/
searchButton.addEventListener("click", () => {
  if (input.value) {
    alert("請輸入");
  }
  clearGallery();
  currentSearch = true;
  searchPhoto(input, page);
});
/*===========clear page=================*/
function clearGallery() {
  document.querySelector("section").innerHTML = "";
  page = 1;
}
/*=============display===============*/
function displayPicture(res) {
  res.photos.forEach((e) => {
    const photo = document.createElement("div");
    photo.classList.add("picBox");
    let picture = e.src.large;
    let Photographer = e.photographer;
    photo.innerHTML = `<div class="imageContainer"><img class="pic" src=${picture}></div> <p class = "grapher">作者:${Photographer}</p><p>
    Download Image:</p>
    <a className="down" target="_blank" href=${picture}>
      Click Here
    </a>`;
    section.appendChild(photo);
  });
}
/*==============init==================*/
async function currentPhoto(page) {
  const datas = await fetch(
    `https://api.pexels.com/v1/curated?page=${page}&&per_page=15`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    }
  );
  const response = await datas.json();
  displayPicture(response);
}
/*==============search================*/
async function searchPhoto(query, page) {
  const datas = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=${page}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    }
  );
  const response = await datas.json();
  displayPicture(response);
}

/*============lord more picture===========*/
let more = document.querySelector(".more");
more.addEventListener("click", () => {
  if (!currentSearch) {
    page++;
    currentPhoto(page);
  } else {
    if (input === "") {
      return;
    }
    page++;
    searchPhoto(input, page);
  }
});

currentPhoto(page);

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}
/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 150) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);
