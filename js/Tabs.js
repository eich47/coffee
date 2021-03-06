import { CoffeeCard } from "./CoffeeCard";
export class Tabs {
  constructor() {}

  buildTabs(content) {
    this.tabs = this.createDomNode("div", "gift__tabs");
    this.containerTab = this.createDomNode("div", "gift__list");
    this.itemTabs = this.createDomNode("div", "gift__item");
    this.controlsTabs = this.createDomNode("div", "gift__controls");
    this.control = this.createDomNode("button", "gift__control-item");

    this.setContent(content);

    this.setTabName(content);

    this.appendTabsElements();

    this.bindEvents();

    return this.tabs;
  }

  createDomNode(element, ...classes) {
    const node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  }

  setContent(content) {
    const items = content.map((gift) => {
      const clone = this.itemTabs.cloneNode(true);
      clone.setAttribute("data-id", gift.id);
      const card = new CoffeeCard(gift);
      const coffeeCardGift = card.generateCard();
      clone.append(coffeeCardGift);
      return clone;
    });

    this.containerTab.append(...items);
  }

  setTabName(content) {
    const controls = content.map((gift, index) => {
      const clone = this.control.cloneNode(true);
      clone.setAttribute("data-item-id", gift.id);
      if (index === 0) {
        clone.classList.add("gift__control-item_selected");
      }
      clone.innerHTML = gift.rest.nameTab;
      return clone;
    });

    this.controlsTabs.append(...controls);
  }

  appendTabsElements() {
    this.tabs.append(this.containerTab);
    this.tabs.append(this.controlsTabs);
  }

  bindEvents() {
    this.controlsTabs.addEventListener("click", (e) => {
      const selectedClass = "gift__control-item_selected";
      const target = e.target;
      let chosenTabId = null;

      const switchControl = () => {
        this.controlsTabs.childNodes.forEach((el) => {
          el.classList.remove(selectedClass);
        });
        chosenTabId = target.dataset.itemId;
        target.classList.add(selectedClass);
      };
      const switchTab = () => {
        this.containerTab.childNodes.forEach((tab) => {
          tab.style.display = "none";
          if (tab.dataset.id === chosenTabId) {
            tab.style.display = "block";
          }
        });
      };
      switchControl();
      switchTab();
    });
  }
}
