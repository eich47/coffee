import { Slider } from "./Slider";
import { CoffeeCard } from "./CoffeeCard";
import { data } from "./data";

window.onload = function () {
  renderCoffeeSlider();
  renderComboSetSlider();
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
