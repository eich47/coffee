import { Slider } from "./Slider";
import { CoffeeCard } from "./CoffeeCard";
import { data } from "./data";
import { Tabs } from "./Tabs";
import { Menu } from "./Menu";
import { MenuButton } from "./MenuButton";
window.onload = function () {
  renderCoffeeSlider();
  renderComboSetSlider();
  renderGiftTabs();
  renderMobileMenu();
  onResizeBrowser();
};

//coffee slider
const renderCoffeeSlider = () => {
  const container = document.querySelector(".coffee-block__content");
  container.innerHTML = "";
  const contentObj = data.coffee.map((obj) => {
    return new CoffeeCard(obj);
  });
  const content = contentObj.map((cardObj) => {
    return cardObj.generateCard();
  });
  const slider = generateCoffeeSlide(content);
  container.appendChild(slider);
};

const generateCoffeeSlide = (content) => {
  let slider = null;
  if (isTablet()) {
    slider = new Slider({
      numberSlidesPerPage: 1,
      gap: 30,
      amountElementsIntoColumn: 2,
    });
  } else {
    slider = new Slider({
      numberSlidesPerPage: 2,
      gap: 30,
      amountElementsIntoColumn: 2,
    });
  }

  return slider.buildSlider(content);
};

//comboset slider

const renderComboSetSlider = () => {
  const container = document.querySelector(".combo__content");
  container.innerHTML = "";
  const contentObj = data.combo.map((obj) => {
    return new CoffeeCard(obj);
  });
  const content = contentObj.map((cardObj) => {
    return cardObj.generateCard();
  });
  const slider = generateComboSetSlide(content);
  container.appendChild(slider);
};

const generateComboSetSlide = (content) => {
  let slider = null;
  if (isMobile()) {
    slider = new Slider({
      numberSlidesPerPage: 1,
      gap: 0,
      amountElementsIntoColumn: 1,
    });
  } else if (isTablet()) {
    slider = new Slider({
      numberSlidesPerPage: 2,
      gap: 30,
      amountElementsIntoColumn: 1,
    });
  } else {
    slider = new Slider({
      numberSlidesPerPage: 3,
      gap: 30,
      amountElementsIntoColumn: 1,
    });
  }

  return slider.buildSlider(content);
};

const renderGiftTabs = () => {
  const tabs = new Tabs();
  const contentForTabs = data.gift;

  const wrapper = document.querySelector(".gift__content");
  wrapper.innerHTML = "";
  const contentForTabsObj = contentForTabs.map((item) => {
    return new CoffeeCard(item);
  });
  wrapper.append(tabs.buildTabs(contentForTabsObj));
};

//mobile navigation menu

const renderMobileMenu = () => {
  const widthTablet = 768;
  const mediaQueryTablet = window.matchMedia(`(max-width:${widthTablet}px)`);
  if (!mediaQueryTablet.matches) {
    return;
  }

  generateMobileMenu();
};

const generateMobileMenu = () => {
  const menuObj = new Menu();
  const menu = menuObj.generateMenu();
  document.querySelector(".header__block-2").append(menu);

  bindButtonAndMenu(menu);
};

const bindButtonAndMenu = (menu) => {
  const menuButton = new MenuButton(menu);
  menuButton.bindEvent();
};

const onResizeBrowser = () => {
  const renderCoffeeSliderDebounce = debounce(renderCoffeeSlider, 1000);
  const renderComboSetSliderDebounce = debounce(renderComboSetSlider, 1000);
  window.addEventListener("resize", renderCoffeeSliderDebounce);
  window.addEventListener("resize", renderComboSetSliderDebounce);
};

const isTablet = () => {
  const width = 768;
  return mediaQuery(width);
};

const isMobile = () => {
  const width = 320;
  return mediaQuery(width);
};

const mediaQuery = (width) => {
  const mediaQueryTablet = window.matchMedia(`(max-width:${width}px)`);
  return mediaQueryTablet.matches;
};

//delay to run a function in time ms
const debounce = (fn, time) => {
  let timerId = null;

  return () => {
    const later = () => {
      timerId = null;
      fn.apply(this);
    };

    clearTimeout(timerId);

    timerId = setTimeout(later, time);
  };
};
