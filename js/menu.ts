import {MenuView} from './menu-view'
import {IMenuOptions, Observer, Subject} from './menu-types'

export default class MobileMenu implements Observer {
  // buttonMenu: HTMLButtonElement
  //menu - меню какое будем модифицировать
  // menu: HTMLElement
  // mobileMenuClass: string
  //bntMenu - кнопка которая вызывает показ меню
  // bntMenuClass: string

  //открыто ли меню
  isMenuOpen: boolean = false

  //ссылка на класс для мануляции с дом
  menuView: MenuView
  //меню для десктопной версии (из него делаем мобильное меню, путем клонирования и добавления классов)
  $menu: HTMLElement
  //мобильное меню
  $mobileMenu: HTMLElement | null = null

  constructor(options: IMenuOptions) {
    this.menuView = new MenuView(options)
    this.$menu = this.menuView.getMenu()
    this.init()
  }

  init() {
    //подпишемся на уведомления (шаблон наблюдатель)
    this.menuView.attach(this)

    this.cloneExistMenu()
    //добавляем слушателей
    //у кнопки и меню нету общего родителя, поэтому слушателей вешаем отдельно на кнопку и на меню
    this.menuView.addButtonListeners()
    this.menuView.addMenuListeners()
  }

  //склонируем меню для декстопной версии чтобы затем показать
  //его на мобильной версии
  cloneExistMenu() {
    const navMenuClone = this.$menu.cloneNode(true) as HTMLElement
    this.menuView.addMobileMenuIntoDom(navMenuClone, this.isMenuOpen)
    this.$mobileMenu = this.menuView.getMobileMenu()
  }

  update(subject: Subject, e: Event, typeEvent: string): void {
    console.log(typeEvent)
    if (typeEvent === 'clickButton') {
      if (!this.isMenuOpen) {
        this.showMenu()
      } else {
        this.hideMenu()
      }
    }
    if (typeEvent === 'clickMenuItem') {
      this.hideMenu()
    }
  }

  private showMenu() {
    this.isMenuOpen = true
    this.menuView.showMenu()
  }

  private hideMenu() {
    this.isMenuOpen = false
    this.menuView.hideMenu()
  }
}
