import {IMenuOptions, Observer, Subject, SubjectMessage} from './menu-types'

class MenuView implements Subject {
  //селектор для меню
  readonly menuSelector: string
  //селектор кнопки, которая будет показывать/скрывать меню
  readonly menuButtonSelector: string
  //menu (из десктоп версии) из которого будем создавать мобильное меню
  readonly $menu: HTMLElement
  //button node по клику на которую показывается/скрывается меню
  readonly $button: HTMLButtonElement

  //для для мобильного меню
  readonly mobileMenuClass = 'mobile-menu'
  //класс для анимации кнопки
  readonly animateButtonClass = 'animate'
  //показать меню
  readonly showMenuClass = 'show'
  //пункт меню
  readonly menuItemSelector = '.nav-item'

  private observers: Array<Observer> = []

  constructor(options: IMenuOptions) {
    this.menuSelector = options.menuSelector
    this.menuButtonSelector = options.menuButtonSelector
    this.$menu = document.querySelector(this.menuSelector) as HTMLElement
    this.throwErrorIfNotFoundElement(this.$menu, this.menuSelector)
    this.$button = document.querySelector(
      this.menuButtonSelector
    ) as HTMLButtonElement
    this.throwErrorIfNotFoundElement(this.$button, this.menuButtonSelector)
  }

  getMenu(): HTMLElement {
    return this.$menu
  }

  getMenuButton(): HTMLButtonElement {
    return this.$button
  }

  showMenu() {
    const mobileMenu: HTMLElement = this.getMobileMenu()
    //показываем само меню
    mobileMenu.classList.add(this.showMenuClass)
    const bntMenu: HTMLButtonElement = this.getMenuButton()
    //запускаем анимацию кнопки
    bntMenu.classList.add(this.animateButtonClass)
  }

  hideMenu() {
    console.log(`hideMenu`)
    const mobileMenu: HTMLElement = this.getMobileMenu()
    mobileMenu.classList.remove(this.showMenuClass)
    const bntMenu: HTMLButtonElement = this.getMenuButton()
    bntMenu.classList.remove(this.animateButtonClass)
  }

  addMobileMenuIntoDom(mobileMenu: HTMLElement, isOpen: boolean) {
    mobileMenu.classList.add(this.mobileMenuClass)
    if (!isOpen) {
      mobileMenu.classList.add('d-none')
    }
    const res = document.body.insertAdjacentElement('afterbegin', mobileMenu)
    if (res === null) {
      throw Error('не удалось добавить мобильное меню на страницу')
    }
  }

  getMobileMenu(): HTMLElement {
    const menu: HTMLElement = document.querySelector(
      '.' + this.mobileMenuClass
    ) as HTMLElement
    if (menu === null) {
      throw new Error(
        `не удалось получить мобильное меню по селектору: ${this.mobileMenuClass}`
      )
    }
    return menu
  }

  //подписаться на событие кнопки по баттону
  addButtonListeners() {
    this.$button.addEventListener('click', this.onButtonClick.bind(this))
  }
  //подписать на событие клика по меню
  addMenuListeners() {
    this.getMobileMenu().addEventListener('click', this.onMenuClick.bind(this))
  }

  private onButtonClick(event: Event) {
    event.preventDefault()
    const target: HTMLElement = event.target as HTMLElement
    if (target) {
      const bnt = target.closest(this.menuButtonSelector) as HTMLButtonElement
      if (bnt) {
        this.notify(event, 'clickButton')
      }
    } else {
      throw new Error(`target не определен`)
    }
  }

  private onMenuClick(event: Event) {
    event.preventDefault()
    const target: HTMLElement = event.target as HTMLElement
    if (target) {
      const menuItem: HTMLElement = target.closest(
        this.menuItemSelector
      ) as HTMLElement
      if (menuItem) {
        this.notify(event, 'clickMenuItem')
      }
    } else {
      throw new Error(`target не определен`)
    }
  }

  private throwErrorIfNotFoundElement(value: HTMLElement, selector: string) {
    if (!value) {
      throw new Error(`not found: ${selector}`)
    }
  }
  //подписаться на события subject
  attach(observer: Observer): void {
    const isExist = this.observers.includes(observer)
    if (isExist) {
      return console.log('Subject: Observer has attached already')
    }

    console.log('Subject: Attached an observer')
    this.observers.push(observer)
  }
  //отписать от события
  detach(observer: Observer): void {}

  //уведомить подпищиков
  notify(event: Event, typeEvent: SubjectMessage): void {
    console.log('Subject: Notyfing observers...', typeEvent)
    for (const observer of this.observers) {
      observer.update(this, event, typeEvent)
    }
  }
}

export {MenuView}
