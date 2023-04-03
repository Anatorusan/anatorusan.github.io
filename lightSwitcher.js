import { backgr } from "./initialPageRenderer.js";
import { dateField } from "./initialPageRenderer.js";
import { saveData } from "./storage.js";

export const lightSwitcher = (check) => {
    backgr.style.backgroundColor = check() ? '#282727' : '#FFF';
    saveData('background-color', backgr.style.backgroundColor);
    dateField.style.color = check() ? '#ede5e5' : '#000';
    saveData('date-color', dateField.style.color);
}