export class Slider {
  constructor({ numberSlidesPerPage = 2, gap = 30 }) {
    this.content = "";
    this.numberSlidesPerPage = numberSlidesPerPage;
    this.currentSlide = this.numberSlidesPerPage;
    this.shift = 0;
    //distance between items
    this.gap = gap;
  }

  buildSlider(content) {
    this.slider = this.createDomNode("div", "slider");
    this.sliderContent = this.createDomNode(
      "div",
      "wrapper",
      "slider__content"
    );
    //here will be content
    this.sliderColumn = this.createDomNode("div", "slider__column");
    //controls that will control slider
    this.controls = this.createDomNode("div", "slider__controls");
    this.nextControl = this.createDomNode(
      "button",
      "slider__control",
      "slider__control_next"
    );
    this.prevControl = this.createDomNode(
      "button",
      "slider__control",
      "slider__control_prev"
    );

    this.setContent(content);

    //union all parts of slider
    this.appendSliderElements();

    //bind events
    this.bindEvents();

    return this.slider;
  }

  createDomNode(element, ...classes) {
    const node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  }

  setContent(content) {
    const container = content.map((item) => {
      const clone = this.sliderColumn.cloneNode(true);
      if (typeof item === "string") {
        clone.innerHTML = item;
        return clone;
      } else {
        return this.sliderColumn.appendChild(item);
      }
    });
    this.sliderContent.append(...container);
  }

  appendSliderElements() {
    this.slider.appendChild(this.sliderContent);
    this.controls.appendChild(this.prevControl);
    this.controls.appendChild(this.nextControl);
    this.slider.appendChild(this.controls);
  }

  bindEvents() {
    this.prevControl.addEventListener("click", this.switchPrev.bind(this));

    this.nextControl.addEventListener("click", this.switchNext.bind(this));
  }

  switchNext(e) {
    this.unDisableControl(this.prevControl);
    const sliderItemsCount = this.sliderContent.childNodes.length;
    if (this.currentSlide >= sliderItemsCount) {
      e.target.disabled = true;
    } else {
      this.currentSlide++;
      const elWidth = this.getWidthSlide();
      this.shift -= elWidth + this.gap;
      this.setAnimation(this.shift);
    }
  }

  switchPrev(e) {
    this.unDisableControl(this.nextControl);
    if (this.currentSlide <= this.numberSlidesPerPage) {
      e.target.disabled = true;
    } else {
      this.currentSlide--;
      const elWidth = this.getWidthSlide();
      this.shift += elWidth + this.gap;
      this.setAnimation(this.shift);
    }
  }

  setAnimation(shift) {
    if (!isNaN(shift)) {
      this.sliderContent.style.transform = `translateX(${shift}px)`;
    }
  }

  unDisableControl(control) {
    control.disabled = false;
  }

  getWidthSlide() {
    return this.sliderContent.firstChild?.offsetWidth;
  }
}