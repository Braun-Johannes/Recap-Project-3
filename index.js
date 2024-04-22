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

  console.log(targetUrl);

  if (pageIndex !== null) {
    targetUrl = targetUrl + `?page=${pageIndex}`;
    console.log(targetUrl);
  }

  if (searchQuery !== null) {
    if (pageIndex === null) {
      targetUrl = targetUrl + `?name=${searchQuery}`;
    } else {
      targetUrl = targetUrl + `&name=${searchQuery}`;
    }
    console.log(targetUrl);
  }

  const response = await fetch(targetUrl);

  const data = await response.json();

  console.log(data.info.pages);

  maxPage = data.info.pages;
  const characters = data.results;

  console.log(characters);

  renderCharacterCards(characters);
}

fetchCharacters(1, null);

prevButton.addEventListener("click", () => {
  const nextPageIndex = Math.max(page - 1, 1);
  fetchCharacters(nextPageIndex, searchQuery);
  page = nextPageIndex;
  pagination.textContent = page + `/${maxPage}`;
});

nextButton.addEventListener("click", () => {
  const nextPageIndex = Math.min(page + 1, maxPage);
  fetchCharacters(nextPageIndex, searchQuery);
  page = nextPageIndex;
  pagination.textContent = page + `/${maxPage}`;
});

searchBar.addEventListener("submit", () => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  searchQuery = data.query;
  page = 1;

  if (searchQuery !== "") {
    fetchCharacters(page, searchQuery);
    pagination.textContent = `${page}/${maxPage}`;

    console.log(maxPage);
  } else {
    searchQuery = "";
    fetchCharacters(page, searchQuery);
  }
  console.log("Query: ", data.query);
});
