export default class MobileMenu {
  //bntMenu - кнопка которая вызывает показ меню
  //menu - меню какое будем модифицировать
  constructor(bntMenu, menu) {
    this.buttonMenu = document.querySelector(bntMenu)
    this.menu = document.querySelector(menu)
    this.mobileMenuClass = 'mobile-menu'
    this.bntMenuClass = bntMenu

    this.init()
  }

  init() {
    this.cloneExistMenu()
    this.addEvents()
    this.closeMenuOnClick()
  }

  //склонируем меню для декстопной версии что затем показать
  //его на мобильной версии предваритель стилизовав
  //и добавив необходимые классы
  cloneExistMenu() {
    const navMenuClone = this.menu.cloneNode(true)
    navMenuClone.classList.add(this.mobileMenuClass, 'd-none')
    document.body.insertAdjacentElement('afterbegin', navMenuClone)
  }

  addEvents() {
    this.buttonMenu.addEventListener('click', (e) => {
      e.preventDefault()
      const menu = document.querySelector(`.${this.mobileMenuClass}`)
      menu.classList.toggle('show')
      const bnt = e.target.closest(this.bntMenuClass)
      bnt.classList.toggle('animate')
    })
  }

  closeMenuOnClick() {
    const menu = document.querySelector(`.${this.mobileMenuClass}`)
    menu.addEventListener('click', (e) => {
      e.preventDefault()
      menu.classList.remove('show')
      this.buttonMenu.classList.remove('animate')
    })
  }
}
