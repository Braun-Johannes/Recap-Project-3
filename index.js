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
async function fetchCharacters(pageIndex) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${pageIndex}`
  );
  const data = await response.json();
  maxPage = data.info.pages;
  const characters = data.results;
  renderCharacterCards(characters);
}

fetchCharacters(1);

prevButton.addEventListener("click", () => {
  const nextPageIndex = Math.max(page - 1, 1);
  fetchCharacters(nextPageIndex);
  page = nextPageIndex;
  pagination.textContent = page + `/${maxPage}`;
});

nextButton.addEventListener("click", () => {
  const nextPageIndex = Math.min(page + 1, maxPage);
  fetchCharacters(nextPageIndex);
  page = nextPageIndex;
  pagination.textContent = page + `/${maxPage}`;
});
