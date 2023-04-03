import { btnOnOff } from "./initialPageRenderer.js";
import { dateOnOff } from "./initialPageRenderer.js";
import { textOutputdocument } from "./initialPageRenderer.js";
import { saveData } from "./storage.js";

export const textSwitcher = (check) => {
    btnOnOff.innerHTML = check() ? 'Turn On' : 'Turn Off';
    saveData('btnText', btnOnOff.innerHTML);
    dateOnOff.innerHTML = !check() ? 'on' : 'off';
    saveData('dateText', dateOnOff.innerHTML);
    textOutputdocument.style.visibility = localStorage.length ? 'visible' : 'hidden'; 
}