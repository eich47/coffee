export class Notify {
  constructor(classes) {
    this.classes = classes;
    this.notify = null;
    this.notifyContent = null;
  }

  buildNotify(content) {
    this.notify = this.createDomNode("div", "notify");

    this.notifyContent = this.createDomNode("div", "notify__content");

    this.setContent(content);

    this.appendNotifyElements();

    this.openNotify();
  }

  createDomNode(element, ...classes) {
    const node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  }

  setContent(content) {
    this.notifyContent.innerHTML = content;
  }

  appendNotifyElements() {
    this.notify.append(this.notifyContent);
  }

  openNotify() {
    document.body.append(this.notify);
    this.hideNotify();
  }

  hideNotify() {
    setTimeout(() => {
      document.querySelector(".notify").remove();
    }, 1000);
  }
}
