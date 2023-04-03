import { timeText } from "./initialPageRenderer.js";
import { dateText } from "./initialPageRenderer.js";
import { saveData } from "./storage.js";
import { loadData } from "./storage.js";

export const renderDate = () => {
    const dt = new Date();
    const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
    
    const date = `${padL(dt.getDate())}-${
        padL(dt.getMonth()+1)}-${
        dt.getFullYear()}`
    saveData('date', date);

    const time = `${
        padL(dt.getHours())}:${
        padL(dt.getMinutes())}:${
        padL(dt.getSeconds())}`
    saveData('time', time);

    dateText.innerHTML = loadData('date');
    timeText.innerHTML = loadData('time');
}