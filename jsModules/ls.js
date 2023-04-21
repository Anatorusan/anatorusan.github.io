'use strict'

export const saveData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
export const loadData = (key) => {
    const loadedData = JSON.parse(localStorage.getItem(key));
    return loadedData ? loadedData : [];
  };