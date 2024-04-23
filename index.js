import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

function renderCharacterCards(characters) {
  cardContainer.innerHTML = " ";
  characters.forEach((character) => {
    const { name, status, episode, type, image } = character;
    const occurrences = episode.length;

    CharacterCard(name, status, type, occurrences, image);
  });
}

async function fetchCharacters(pageIndex, searchQuery) {
  let targetUrl = "https://rickandmortyapi.com/api/character";

  if (pageIndex !== null) {
    targetUrl = targetUrl + `?page=${pageIndex}`;
  }

  if (searchQuery !== null) {
    if (pageIndex === null) {
      targetUrl = targetUrl + `?name=${searchQuery}`;
    } else {
      targetUrl = targetUrl + `&name=${searchQuery}`;
    }
  }

  const response = await fetch(targetUrl);
  const data = await response.json();

  maxPage = data.info.pages;
  const characters = data.results;

  pagination.textContent = `${pageIndex}/${maxPage}`;

  renderCharacterCards(characters);
}

fetchCharacters(1, null);

function flipPage(step) {
  if (page + step > 0 && page + step < maxPage + 1) {
    fetchCharacters(page + step, searchQuery);
    page += step;
  }
}

prevButton.addEventListener("click", () => {
  flipPage(-1);
});

nextButton.addEventListener("click", () => {
  flipPage(1);
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  searchQuery = data.query;
  page = 1;
  fetchCharacters(page, searchQuery);
});
