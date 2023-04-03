import { saveData } from "./storage.js";
import { loadData } from "./storage.js";

const trigBox = {
    trigger: 'trigger' in localStorage ? loadData('trigger'): 'on',
    trigSwitch() {
        this.trigger = this.trigger === 'on' ? '' : 'on';
        console.log(`Trigger value: ${this.trigger}`);
        saveData('trigger', this.trigger);
    },
    trigStatusCheck() {
        return this.trigger;
    }
}

export const trigCheck = trigBox.trigStatusCheck.bind(trigBox)
export const securedTrigSwitch = trigBox.trigSwitch.bind(trigBox);