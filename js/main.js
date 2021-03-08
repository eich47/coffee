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
  let slider = new Slider({
    numberSlidesPerPage: 2,
    gap: 30,
    amountElementsIntoColumn: 2,
  });
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
  let slider = new Slider({
    numberSlidesPerPage: 3,
    gap: 30,
    amountElementsIntoColumn: 1,
  });
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
