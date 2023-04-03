import { loadData } from "./storage.js";

export const backgr = document.querySelector('body');
export const dateField = document.querySelector('.dateOutput');
export const btnOnOff = document.querySelector('.btnOnOff');
export const dateOnOff = document.querySelector('.dateOnOff');
export const dateText = document.querySelector('.date');
export const timeText = document.querySelector('.time');
export const textOutputdocument= document.querySelector('.dateOutput');

export const startStateRenderer = () => {
    backgr.style.backgroundColor = 'background-color' in localStorage ? loadData('background-color') : '#FFF';
    dateField.style.color = 'date-color' in localStorage ? loadData('date-color') : '#000';
    btnOnOff.innerHTML = 'btnText' in localStorage ? loadData('btnText') : 'Turn Off';
    dateOnOff.innerHTML = 'dateText' in localStorage ? loadData('dateText') : 'on';
    dateText.innerHTML = 'date' in localStorage ? loadData('date') : '00-00-0000';
    timeText.innerHTML = 'time' in localStorage ? loadData('time') : '00:00:00';
    textOutputdocument.style.visibility = localStorage.length ? 'visible' : 'hidden';

    console.log('inital page rendered');
}