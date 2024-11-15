import { STATUS_OPTIONS } from '../data/inventory.js';
import { updateJiraStatus } from '../services/JiraService.js';

export function createStatusSelect(item) {
    const select = document.createElement('select');
    select.className = 'status-select';
    select.setAttribute('data-item', item.description);
    
    select.onchange = async (e) => {
        const success = await updateJiraStatus(e.target.value, item.description);
        if (success) {
            item.status = e.target.value;
        }
    };

    STATUS_OPTIONS.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        optionElement.selected = item.status === option.value;
        select.appendChild(optionElement);
    });

    return select;
}