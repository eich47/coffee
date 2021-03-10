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

  isExistKey(key) {
    return this.getItem(key) ? true : false;
  }
}
