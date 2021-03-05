export class CoffeeCard {
  constructor({ id, urlToImg, price, title, description }) {
    this.id = id;
    this.urlToImg = urlToImg;
    this.price = price;
    this.title = title;
    this.description = description;
  }

  generateCard() {
    let template = "";
    let card = document.createElement("div");
    card.classList.add("coffee-card");
    card.setAttribute("data-id", this.id);

    //img block
    template += `<div class="coffee-card__image">`;
    if (
      this.urlToImg &&
      (template += `<img src="${this.urlToImg}" alt="coffee desc"></img>`)
    )
      template += `</div>`;

    //content block
    template += `<div class="coffee-card__content">`;
    //name
    this.title &&
      (template += `<div class="coffee-card__name">${this.title}</div>`);

    this.description &&
      (template += `<p class="coffee-card__description">${this.description}</p>`);

    this.price &&
      (template += `<span class="coffee-card__price">${this.price}</span>`);

    //action buttons
    template += `<div class="coffee-card__action">
      <button class="link-button link-button_buy">
        Заказать
      </button>
      <button class="link-button">Подробнее</button>
    </div>`;

    template += `</div>`;

    card.innerHTML = template;

    return card;
  }
}
