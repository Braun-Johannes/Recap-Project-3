export function CharacterCard(name, status, type, occurrences, url) {
  const cardContainer = document.querySelector('[data-js="card-container"]');

  const newCard = document.createElement("ul");
  newCard.classList.add("card-container");
  newCard.setAttribute("data-js", "card-container");
  newCard.innerHTML = `<li class="card">
  <div class="card__image-container">
    <img
      class="card__image"
      src=${url}
      alt="Rick Sanchez"
    />
    <div class="card__image-gradient"></div>
  </div>
  <div class="card__content">
    <h2 class="card__title">${name}</h2>
    <dl class="card__info">
      <dt class="card__info-title">Status</dt>
      <dd class="card__info-description">${status}</dd>
      <dt class="card__info-title">Type</dt>
      <dd class="card__info-description">${type}</dd>
      <dt class="card__info-title">Occurrences</dt>
      <dd class="card__info-description">${occurrences}</dd>
    </dl>
  </div>
</li>`;

  cardContainer.append(newCard);
}
