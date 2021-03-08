export class Menu {
  constructor() {
    this.containerMenuClass = "mobile-menu-container";
    this.showMenuClass = "show";
  }

  generateMenu() {
    this.removeMenu();
    const menuContainer = document.createElement("nav");
    menuContainer.classList.add(this.containerMenuClass);

    const existingMenu = document.querySelector(".header__nav .navigation");
    const existingMenuClone = existingMenu.cloneNode(true);
    menuContainer.append(existingMenuClone);

    this.bindEvent(menuContainer);

    return menuContainer;
  }

  removeMenu() {
    const menu = document.querySelector(`.${this.containerMenuClass}`);
    if (menu !== null) {
      const parent = menu.parentNode;
      parent.removeChild(menu);
    }
  }

  bindEvent(menu) {
    menu.addEventListener("click", () => {
      menu.classList.remove(this.showMenuClass);
    });

    window.addEventListener("scroll", () => {
      if (menu.classList.contains(this.showMenuClass)) {
        menu.classList.remove(this.showMenuClass);
      }
    });
  }
}
