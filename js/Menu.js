export class Menu {
  constructor() {}

  generateMenu() {
    const menuContainer = document.createElement("nav");
    menuContainer.classList.add("mobile-menu-container");

    const existingMenu = document.querySelector(".header__nav .navigation");
    menuContainer.append(existingMenu);

    return menuContainer;
  }
}
