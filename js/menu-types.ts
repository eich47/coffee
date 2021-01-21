export interface IMenuOptions {
  menuSelector: string
  menuButtonSelector: string
}

export interface Observer {
  //получает обновления от субъекта
  update(subject: Subject, e: Event, typeEvent: SubjectMessage): void
}

export interface Subject {
  //присоединяет наблюдателя к издателю
  attach(observer: Observer): void
  //отсоединяет наблюдателя от издателя
  detach(observer: Observer): void
  //уведомляет всех наблюдателей о событии
  notify(event: Event, typeEvent: SubjectMessage): void
}

//название событий которые будут отправлены подписчикам
export type SubjectMessage = 'clickButton' | 'clickMenuItem'
