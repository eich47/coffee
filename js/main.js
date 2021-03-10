import { Slider } from "./Slider";
import { CoffeeCard } from "./CoffeeCard";
import { data } from "./data";
import { Tabs } from "./Tabs";
import { Menu } from "./Menu";
import { MenuButton } from "./MenuButton";
import { CoffeeCardModal } from "./CoffeeCardModal";
import { Cart } from "./Cart";
import { CartModal } from "./CartModal";
import { LocalStorage, COFFEE_KEY } from "./LocalStorage";
import { observer } from "./LocalStorageObserver";
import { Notify } from "./Notify";

window.onload = function () {
  renderCoffeeSlider();
  renderComboSetSlider();
  renderGiftTabs();
  renderMobileMenu();
  onResizeBrowser();
  cartIconClickHandler();
  showCountSelectedItem();
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

  addCoffeeClickHandler();
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

  addComboSetClickHandler();
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

  addGiftSetClickHandler();
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
  const generateMobileMenuDebounce = debounce(generateMobileMenu, 500);
  window.addEventListener("resize", renderCoffeeSliderDebounce);
  window.addEventListener("resize", renderComboSetSliderDebounce);
  window.addEventListener("resize", generateMobileMenuDebounce);
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

//handler for coffee card into a coffee slider

const addCoffeeClickHandler = () => {
  document
    .querySelector(".coffee-block .coffee-block__content")
    .addEventListener("click", (e) => {
      if (e.target.classList.contains("js-buy")) {
        e.preventDefault();
        console.log("buy");
        let clickedCoffeeId = e.target
          .closest(".coffee-card")
          .getAttribute("data-id");
        const storage = getStorage();
        storage.setItem(COFFEE_KEY, clickedCoffeeId);
        showNotification("добавлен в корзину");
      } else if (e.target.classList.contains("js-more")) {
        e.preventDefault();
        let clickedCoffeeId = e.target
          .closest(".coffee-card")
          .getAttribute("data-id");
        let clickedData = getClickedData(clickedCoffeeId, "coffee");
        renderCoffeeModalWindow(clickedData);
      }
    });
};

const getClickedData = (id, keyName) => {
  return data[keyName].find((coffee) => coffee.id === +id);
};

const renderCoffeeModalWindow = (content) => {
  const modal = new CoffeeCardModal("coffee-modal", content);
  modal.renderModal();
};

//handler for combo set card

const addComboSetClickHandler = () => {
  document
    .querySelector(".combo .combo__content")
    .addEventListener("click", (e) => {
      if (e.target.classList.contains("js-buy")) {
        e.preventDefault();
        console.log("buy");
      } else if (e.target.classList.contains("js-more")) {
        e.preventDefault();
        let clickedCoffeeId = e.target
          .closest(".coffee-card")
          .getAttribute("data-id");
        let clickedData = getClickedData(clickedCoffeeId, "combo");
        renderCoffeeModalWindow(clickedData);
      }
    });
};

//handler for gift set card

const addGiftSetClickHandler = () => {
  document
    .querySelector(".gift .gift__content")
    .addEventListener("click", (e) => {
      if (e.target.classList.contains("js-buy")) {
        e.preventDefault();
        console.log("buy");
      } else if (e.target.classList.contains("js-more")) {
        e.preventDefault();
        let clickedCoffeeId = e.target
          .closest(".coffee-card")
          .getAttribute("data-id");
        let clickedData = getClickedData(clickedCoffeeId, "gift");
        renderCoffeeModalWindow(clickedData);
      }
    });
};

const getStorage = () => {
  return new LocalStorage();
};

//handler for cart icon

const cartIconClickHandler = () => {
  document.querySelector(".cart").addEventListener("click", () => {
    const selectedCoffee = getStorage().getItem(COFFEE_KEY) ?? "";
    const dataForCart = [];
    selectedCoffee.split("_").forEach((id) => {
      const item = data.coffee.find((item) => item.id === +id);
      if (item) {
        dataForCart.push(item);
      }
    });

    renderCartModalWithSelectedItem(dataForCart);
  });
};

const renderCartModalWithSelectedItem = (content) => {
  const cart = new Cart();
  const cartTemplate = cart.generateCart(content);
  const cartModal = new CartModal("cart__modal", cartTemplate);
  cartModal.renderCartModal();
};

const showCountSelectedItem = () => {
  const cartBadge = document.querySelector(".cart .cart__badge");
  const storage = getStorage();
  const idsStr = storage.getItem(COFFEE_KEY);

  const getCountOrderedItem = (idsData) => {
    let dataCount = null;

    if (idsData === "" || idsData === null) {
      dataCount = 0;
    } else {
      const count = idsData.split("_").length;
      dataCount = count;
    }
    return dataCount;
  };

  let dataCount = getCountOrderedItem(idsStr);
  cartBadge.innerHTML = dataCount;

  //observer

  observer.subscribe((data) => {
    let dataCount = getCountOrderedItem(data);
    cartBadge.innerHTML = dataCount;
  });
};

const showNotification = (content) => {
  new Notify("").buildNotify(content);
};
