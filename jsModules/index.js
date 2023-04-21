'use strict'

import { saveData } from './jsModules/ls.js';
import { loadData } from './jsModules/ls.js';
import { resetAllCounters } from './jsModules/presetSwitch.js';
import { addMonth } from './jsModules/presetSwitch.js';
import { addWeek } from './jsModules/presetSwitch.js';
import { substrMonth } from './jsModules/presetSwitch.js';
import { substrWeek } from './jsModules/presetSwitch.js';
import { resetWeekAddCounter } from './jsModules/presetSwitch.js';
import { resetMonthAddCounter } from './jsModules/presetSwitch.js';

export const initialDateElement = document.querySelector('.startDateInput'); //verified
export const endDateElement = document.querySelector('.endDateInput'); //verified
const calcButtnElement = document.querySelector('#calcButtn'); //verified
const displayElement = document.querySelector('.result__text'); //verified
const unitSelectorElement = document.querySelector('#selectUnit'); //verified
const minusMonthButtnElement = document.querySelector('#minusMonthButtn'); //verified
const plusMonthButtnElement = document.querySelector('#plusMonthButtn'); //verified
const minusWeekButtnElement = document.querySelector('#minusWeekButtn'); //verified
const plusWeekButtnElement = document.querySelector('#plusWeekButtn'); //verified
const selectDayTypeElement = document.querySelector('#selectDayType'); //verified
const tableHeaderElement = document.querySelector('.tableHeader'); //verified
const resetButtnElement = document.querySelector('#resButtn'); //verified
const unitTypeElement = document.querySelector('.unitType'); //verified
const formElement = document.querySelector('form');


const history = loadData('historyRecord');

const unitsMap = {
  '86400000' : 'days',
  '3600000' : 'hours',
  '60000' : 'minutes',
  '1000' : 'seconds'
}

const endDateActivator = () => {
  endDateElement.disabled = false;
  endDateElement.setAttribute('min', initialDateElement.value);
}

export const initialDateLimiter = () => {
  initialDateElement.setAttribute('max', endDateElement.value);
}

const limitersReset = () => {
  endDateElement.setAttribute('min', '');
  initialDateElement.setAttribute('max', '');
}

const resultReset = () => {
  displayElement.innerHTML = 'Result';
}

const unitTypeReset = () => {
  unitTypeElement.innerHTML = '';
}

const endDateDeactivator = () => {
  endDateElement.disabled = true;
}

const termDurationGenerator = () => {
  let start = new Date(initialDateElement.value);
  start.setDate(start.getDate() + 1); 
  const finish = new Date(endDateElement.value);
  const dayMilliseconds = 1000 * 60 * 60 * 24;

  if (selectDayTypeElement.value !== 'all') {
    let weekendDaysCounter = 0;
    let businessDaysCounter = 0;
    while (start <= finish) {
      let day = start.getDay();
      if (day === 0 || day === 6) {
        weekendDaysCounter++;
      } else {
        businessDaysCounter++;
      }
      start = new Date(+start + dayMilliseconds);
    }
    return selectDayTypeElement.value === 'weekend' ? weekendDaysCounter * dayMilliseconds : businessDaysCounter * dayMilliseconds;
  }
  return finish - start + dayMilliseconds;
}

const calculate = () => {
  if ((endDateElement.value === '') || (endDateElement.value < initialDateElement.value)) {
    return;
  }
  displayElement.innerHTML = termDurationGenerator() / Number(unitSelectorElement.value);
}

const unitTypeIndicator = () => {
  unitTypeElement.innerHTML = displayElement.innerHTML == '1' ? unitsMap[unitSelectorElement.value].split('').slice(0, -1).join('') : unitsMap[unitSelectorElement.value];
}

const plusMinusBtnActivator = () => {
  plusMonthButtnElement.disabled = false;
  minusMonthButtnElement.disabled = false;
  plusWeekButtnElement.disabled = false;
  minusWeekButtnElement.disabled = false;
}

const BtnDisabler = () => {
  plusMonthButtnElement.disabled = true;
  minusMonthButtnElement.disabled = true;
  plusWeekButtnElement.disabled = true;
  minusWeekButtnElement.disabled = true;
  calcButtnElement.disabled = true;
}

const calcButtonCheck = () => {
  if (endDateElement.value !== '' && initialDateElement.value !== '') {
    calcButtnElement.disabled = false;
  } else {
    calcButtnElement.disabled = true;
  }
}

const historyGenerator = () => {
  if (displayElement.innerHTML === 'Result') {
    return
  }
  history.unshift({'startDate' : initialDateElement.value.split('-').reverse().join('-'),
  'endDate' : endDateElement.value.split('-').reverse().join('-'),
  'number' : displayElement.innerHTML,
  'units' : unitsMap[unitSelectorElement.value],
  'includeDays' : selectDayTypeElement.value})
  if(history.length > 10) {
    history.pop();
  }
  console.log(history);
  saveData('historyRecord', history);
}

const historyRenderer = () => {
  if (displayElement.innerHTML === 'Result') {
    return
  }
  const loadedHistory = loadData('historyRecord');
  if (loadedHistory){
      const historyRecordElement = document.createElement('tr');
      historyRecordElement.innerHTML = `
      <td class="tableCell">${loadedHistory[0]['startDate']}</td>
      <td class="tableCell">${loadedHistory[0]['endDate']}</td>
      <td class="tableCell">${loadedHistory[0]['number']}</td>
      <td class="tableCell">${loadedHistory[0]['units']}</td>
      <td class="tableCell">${loadedHistory[0]['includeDays']}</td>`;
      tableHeaderElement.after(historyRecordElement);
      if (loadedHistory.length >= 10) {
        const lastRow = document.querySelector('tr:last-child');
        lastRow.remove();
      }
  } else {
    return;
  }
}

const startHistoryRenderer = () => {
  const loadedStartHistory = loadData('historyRecord').reverse();
  console.log(loadedStartHistory);
  if (loadedStartHistory){
    loadedStartHistory.forEach((record) => {
      const historyRecordElement = document.createElement('tr');
      historyRecordElement.innerHTML = `
      <td class="tableCell">${record['startDate']}</td>
      <td class="tableCell">${record['endDate']}</td>
      <td class="tableCell">${record['number']}</td>
      <td class="tableCell">${record['units']}</td>
      <td class="tableCell">${record['includeDays']}</td>`;
      tableHeaderElement.after(historyRecordElement);
    })
  } else {
    return;
  }
}

const listeners = () => {
  formElement.addEventListener('click', calcButtonCheck);
  initialDateElement.addEventListener('input', endDateActivator);
  initialDateElement.addEventListener('input', plusMinusBtnActivator);
  initialDateElement.addEventListener('change', calcButtonCheck); 
  endDateElement.addEventListener('change', initialDateLimiter);
  endDateElement.addEventListener('change', calcButtonCheck); 
  resetButtnElement.addEventListener('click', limitersReset);
  resetButtnElement.addEventListener('click', resultReset);
  resetButtnElement.addEventListener('click', endDateDeactivator);
  resetButtnElement.addEventListener('click', unitTypeReset);
  resetButtnElement.addEventListener('click', BtnDisabler);
  calcButtnElement.addEventListener('click', calculate);
  calcButtnElement.addEventListener('click', unitTypeIndicator);
  calcButtnElement.addEventListener('click', historyGenerator);
  calcButtnElement.addEventListener('click', historyRenderer);
  plusMonthButtnElement.addEventListener('click', addMonth);
  plusMonthButtnElement.addEventListener('click', resetWeekAddCounter);
  plusWeekButtnElement.addEventListener('click', addWeek);
  plusWeekButtnElement.addEventListener('click', resetMonthAddCounter);
  minusMonthButtnElement.addEventListener('click', substrMonth);
  minusMonthButtnElement.addEventListener('click', resetAllCounters);
  minusWeekButtnElement.addEventListener('click', substrWeek);
  minusWeekButtnElement.addEventListener('click', resetAllCounters);
}

const startApp = () => {
  console.log ('App started');
  listeners();
  startHistoryRenderer();
}

document.addEventListener('DOMContentLoaded', startApp); 