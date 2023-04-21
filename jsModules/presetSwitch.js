'use strict'

import { endDateElement } from "/index.js";
import { initialDateElement } from "/index.js";
import { initialDateLimiter } from "/index.js";

const presetSwitcher = {
  weekAddCounter: 1,
  monthAddCounter: 1,
  
  addZero(stringToPad, targetLength = 2, padWithString = `0`) {
    return `${stringToPad}`.padStart(targetLength, padWithString);
  },

  addMonth() {     
    const baseDateObj = endDateElement.value === '' ? new Date(initialDateElement.value) : new Date(endDateElement.value);
    baseDateObj.setMonth(baseDateObj.getMonth() + this.monthAddCounter);
    endDateElement.value = `${baseDateObj.getFullYear()}-${(this.addZero(baseDateObj.getMonth()+1))}-${this.addZero(baseDateObj.getDate())}`;  
    this.monthAddCounter += 1;
    initialDateLimiter();
  },

  substrMonth() {
    const startDateObj = new Date(initialDateElement.value);
    const endDateObj = new Date(endDateElement.value);
    endDateObj.setMonth(endDateObj.getMonth() - 1);
    if (endDateObj >= startDateObj) {
      endDateElement.value = `${endDateObj.getFullYear()}-${(this.addZero(endDateObj.getMonth()+1))}-${this.addZero(endDateObj.getDate())}`;
      initialDateLimiter();
      return
    }
    return
  },

  addWeek() {   
    const baseDateObj = endDateElement.value === '' ? new Date(initialDateElement.value) : new Date(endDateElement.value);
    baseDateObj.setDate(baseDateObj.getDate() + this.weekAddCounter * 7);
    endDateElement.value = `${baseDateObj.getFullYear()}-${(this.addZero(baseDateObj.getMonth()+1))}-${this.addZero(baseDateObj.getDate())}`;
    this.weekAddCounter += 1;
    initialDateLimiter();
  },

  substrWeek() {      
    const startDateObj = new Date(initialDateElement.value);
    const endDateObj = new Date(endDateElement.value);
    endDateObj.setDate(endDateObj.getDate() - 7);
    if (endDateObj >= startDateObj) {
      endDateElement.value = `${endDateObj.getFullYear()}-${(this.addZero(endDateObj.getMonth()+1))}-${this.addZero(endDateObj.getDate())}`;
      initialDateLimiter();
      return
    }
    return
  },

  resetAllCounters() {
    this.monthAddCounter = 1;
    this.weekAddCounter = 1;
  },

  resetMonthAddCounter() {
    this.monthAddCounter = 1;
  },

  resetWeekAddCounter() {
    this.weekAddCounter = 1;
  }
}

export const resetAllCounters = presetSwitcher.resetAllCounters.bind(presetSwitcher);
export const addMonth = presetSwitcher.addMonth.bind(presetSwitcher);
export const substrMonth = presetSwitcher.substrMonth.bind(presetSwitcher);
export const addWeek = presetSwitcher.addWeek.bind(presetSwitcher);
export const substrWeek = presetSwitcher.substrWeek.bind(presetSwitcher);
export const resetWeekAddCounter = presetSwitcher.resetWeekAddCounter.bind(presetSwitcher);
export const resetMonthAddCounter = presetSwitcher.resetMonthAddCounter.bind(presetSwitcher);