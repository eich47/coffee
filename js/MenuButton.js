export class MenuButton {
  constructor(menu) {
    this.menu = menu;
    this.animateClass = "animate";
  }

  bindEvent() {
    const button = document.querySelector(".hamburger");
    if (button === null) {
      console.log(`have not found a button switching a menu`);
      return;
    }
    this.resetState(button);
    button.addEventListener("click", () => {
      button.classList.toggle(this.animateClass);
      this.menu.classList.toggle("show");
    });
    window.addEventListener("scroll", () => {
      button.classList.remove(this.animateClass);
    });
  }

  resetState(button) {
    button.classList.remove(this.animateClass);
  }
}
