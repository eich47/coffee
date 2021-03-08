export class MenuButton {
  constructor(menu) {
    this.menu = menu;
  }

  bindEvent() {
    const button = document.querySelector(".hamburger");
    if (button === null) {
      console.log(`have not found a button switching a menu`);
      return;
    }
    this.resetState(button);
    button.addEventListener("click", () => {
      button.classList.toggle("animate");
      this.menu.classList.toggle("show");
    });
  }

  resetState(button) {
    button.classList.remove("animate");
  }
}
