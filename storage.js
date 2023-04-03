export const saveData = (key, value) => {
    localStorage.setItem(key, value);
}

export const loadData = (key) => {
    const loadedData = localStorage.getItem(key);
    return loadedData ? loadedData : false;
}