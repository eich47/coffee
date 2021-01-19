export default class MobileMenu {
  buttonMenu: HTMLButtonElement
  //menu - меню какое будем модифицировать
  menu: HTMLElement
  mobileMenuClass: string
  //bntMenu - кнопка которая вызывает показ меню
  bntMenuClass: string

  constructor(bntMenu: string, menu: string) {
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
    const navMenuClone = this.menu.cloneNode(true) as HTMLElement
    navMenuClone.classList.add(this.mobileMenuClass, 'd-none')
    document.body.insertAdjacentElement('afterbegin', navMenuClone)
  }

  addEvents() {
    this.buttonMenu.addEventListener('click', (e) => {
      e.preventDefault()
      const menu = document.querySelector(`.${this.mobileMenuClass}`)
      menu.classList.toggle('show')
      const target = e.target as HTMLElement
      const bnt = target.closest(this.bntMenuClass) as HTMLButtonElement
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
