import { Modal } from "./Modal";

export class CoffeeCardModal extends Modal {
  constructor(classes, { title, fullDescription }) {
    super(classes);
    this.title = title;
    this.description = fullDescription;
  }

  generatorContent() {
    let template = "";
    let coffee = document.createElement("div");
    coffee.classList.add("coffee-modal");

    this.title &&
      (template += `<div class="coffee-modal__title">
      ${this.title}
    </div>`);

    this.description &&
      (template += `<p class="coffee-modal__description" >
      ${this.description}
    </p>`);

    coffee.innerHTML = template;
    return coffee;
  }

  renderModal() {
    let content = this.generatorContent();
    super.buildModal(content);
  }
}
