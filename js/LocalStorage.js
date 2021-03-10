import { Storage } from "./Storage";

export const COFFEE_KEY = "coffee";

export class LocalStorage extends Storage {
  getItem(key) {
    const res = window.localStorage.getItem(key);
    if (res === null) {
      console.log(`have not found value by key ${key}`);
      return null;
    } else {
      return res;
    }
  }

  setItem(key, value) {
    let valueForSave = "";
    if (this.isExistKey(key)) {
      valueForSave = `${this.getItem(key)}_`;
    }

    valueForSave += value;

    window.localStorage.setItem(key, valueForSave);
  }

  removeItem(key) {
    window.localStorage.removeItem(key);
  }

  removeIdFromList(key, id) {
    const idList = this.getItem(key);
    if (idList === null) {
      console.log(`have not found ${key} key in local storage`);
      return;
    }

    const removeIdFromArray = (idList, id) => {
      const idArray = idList.split("_");
      const index = idArray.indexOf(id);
      if (index !== -1) {
        idArray.splice(index, 1);
      } else {
        console.log(`error: id: ${id} are not found in array: ${idArray}`);
      }
      return idArray;
    };

    const editedIdList = removeIdFromArray(idList, id).join("_");

    this.removeItem(key);
    this.setItem(key, editedIdList);
  }

  isExistKey(key) {
    return this.getItem(key) ? true : false;
  }

  getCountItemsByKey(key) {
    const value = this.getItem(key);
    if (value === null || value === "") {
      return 0;
    } else {
      return value.split("_").length;
    }
  }
}
