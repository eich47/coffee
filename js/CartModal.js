import { Modal } from "./Modal";

export class CartModal extends Modal {
  constructor(classes, cart) {
    super(classes);
    this.cart = cart;
  }

  generatorContent() {
    let template = ``;
    this.content = document.createElement("div");
    this.content.classList.add("coffee-modal");
    this.content.innerHTML = `<h2>Корзина</h2>`;

    this.content.append(this.cart);

    return this.content;
  }

  renderCartModal() {
    let content = this.generatorContent();
    super.buildModal(content);
  }
}
