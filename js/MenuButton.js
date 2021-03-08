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
    button.addEventListener("click", () => {
      button.classList.toggle("animate");
      this.menu.classList.toggle("show");
    });
  }
}
