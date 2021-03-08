export class Menu {
  constructor() {
    this.containerMenuClass = "mobile-menu-container";
  }

  generateMenu() {
    this.removeMenu();
    const menuContainer = document.createElement("nav");
    menuContainer.classList.add(this.containerMenuClass);

    const existingMenu = document.querySelector(".header__nav .navigation");
    const existingMenuClone = existingMenu.cloneNode(true);
    menuContainer.append(existingMenuClone);

    return menuContainer;
  }

  removeMenu() {
    const menu = document.querySelector(`.${this.containerMenuClass}`);
    if (menu !== null) {
      const parent = menu.parentNode;
      parent.removeChild(menu);
    }
  }
}
