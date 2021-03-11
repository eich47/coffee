import { COFFEE_KEY, LocalStorage } from "./LocalStorage";
export class Cart {
  constructor() {
    this.cart = null;
    this.cartContent = null;
    this.cartItem = null;
    this.removeItem = null;
    this.makeOrderButton = null;
    this.cartItemClass = "cart-checkout__item";
  }

  generateCart(content) {
    this.cart = this.createDomNode("div", "cart-checkout");

    this.cartContent = this.createDomNode("div", "cart-checkout__content");

    this.cartItem = this.createDomNode("div", this.cartItemClass);
    this.cartItem.setAttribute("data-key", COFFEE_KEY);

    this.removeItem = this.createDomNode(
      "span",
      "cart-checkout__close-icon",
      "js-remove"
    );
    this.removeItem.innerHTML =
      '<svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.4239 10.5172L20.6009 2.33999C21.1331 1.80809 21.1331 0.948089 20.6009 0.416194C20.069 -0.115701 19.209 -0.115701 18.6771 0.416194L10.4999 8.59343L2.3229 0.416194C1.79076 -0.115701 0.931004 -0.115701 0.399108 0.416194C-0.133036 0.948089 -0.133036 1.80809 0.399108 2.33999L8.5761 10.5172L0.399108 18.6945C-0.133036 19.2263 -0.133036 20.0863 0.399108 20.6182C0.664184 20.8836 1.01272 21.0169 1.361 21.0169C1.70929 21.0169 2.05758 20.8836 2.3229 20.6182L10.4999 12.441L18.6771 20.6182C18.9425 20.8836 19.2907 21.0169 19.639 21.0169C19.9873 21.0169 20.3356 20.8836 20.6009 20.6182C21.1331 20.0863 21.1331 19.2263 20.6009 18.6945L12.4239 10.5172Z" fill="#2F281E"/></svg>';

    this.makeOrderButton = this.createDomNode(
      "button",
      "link-button",
      "link-button_buy",
      "link-button_cart-order"
    );
    this.makeOrderButton.innerHTML = "Заказать";

    this.totalCostField = this.createDomNode(
      "span",
      "cart-checkout__total-price"
    );
    this.totalCostField.innerHTML = `Сумма: `;
    this.totalCostField.innerHTML += `<span class="cart-checkout__summa">${this.costTotalSumma()}</span>`;

    this.setContent(content);

    this.appendCartElement();

    this.bindEvents();

    return this.cart;
  }

  createDomNode(element, ...classes) {
    const node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  }

  setContent(content) {
    const cartItems = content.map((item) => {
      const clone = this.cartItem.cloneNode(true);
      clone.innerHTML = this.generateItemTemplate(item);
      const cloneRemoveItem = this.removeItem.cloneNode(true);
      cloneRemoveItem.setAttribute("data-id", item.id);

      cloneRemoveItem.addEventListener("click", (e) => {
        const target = e.target.closest(".js-remove");
        this.removeItemFromCart(target);
        document.querySelector(
          ".cart-checkout__summa"
        ).innerHTML = this.costTotalSumma();
      });

      clone.append(cloneRemoveItem);
      return clone;
    });
    this.cartContent.append(...cartItems);
  }

  appendCartElement() {
    this.cart.append(this.cartContent);
    this.cart.append(this.makeOrderButton);
    this.cart.append(this.totalCostField);
  }

  bindEvents() {
    this.makeOrderButton.addEventListener("click", (e) => {
      console.log("order item");
      if (this.countOrderedItem() === 0) {
        const text = e.target.innerHTML;
        e.target.innerHTML = "Добавьте товар в корзину";
        setTimeout(() => {
          e.target.innerHTML = text;
        }, 1000);
      }
    });
  }

  generateItemTemplate({ title, price }) {
    let template = ``;
    template += `<span class="cart-checkout__name">${title}</span>`;
    template += `<span class="cart-checkout__price">${price}</span>`;
    return template;
  }

  //localStorageKey is a key in localStorage that contains id's list.
  //we need to remove got id from that list

  removeItemFromStorage(id, localStorageKey) {
    const localStorage = new LocalStorage();
    localStorage.removeIdFromList(localStorageKey, id);
  }

  removeItemFromCart(target) {
    const id = target.dataset.id;
    const itemCart = target.closest(`.${this.cartItemClass}`);
    const key = itemCart.dataset.key;
    this.removeItemFromStorage(id, key);
    itemCart.remove();
  }

  countOrderedItem() {
    const count = new LocalStorage().getCountItemsByKey(COFFEE_KEY);
    return count;
  }

  costTotalSumma() {
    const items = new LocalStorage().getSelectedItems(COFFEE_KEY);

    const summa = items.reduce((acc, item) => {
      acc += +item.price;
      return acc;
    }, 0);

    return summa;
  }
}