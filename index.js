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
const maxPage = 1;
const page = 1;
const searchQuery = "";

async function fetchCharacters() {
  cardContainer.innerHTML = " ";
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();
  const characters = data.results;
  characters.forEach((character) => {
    const {
      name: name,
      status: status,
      episode: episodes,
      type: type,
      image: url,
    } = character;
    const occurrences = episodes.length;

    CharacterCard(name, status, type, occurrences, url);
  });

  // return data;
}

fetchCharacters();
