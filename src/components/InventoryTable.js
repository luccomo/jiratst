import { createStatusSelect } from './StatusSelect.js';

export function renderInventoryTable(inventoryItems) {
    const tbody = document.getElementById('inventory-tbody');
    tbody.innerHTML = '';
    
    inventoryItems.forEach(item => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.description}</td>
            <td>${item.quantity}</td>
            <td>${item.location}</td>
        `;
        
        const statusCell = document.createElement('td');
        statusCell.appendChild(createStatusSelect(item));
        row.appendChild(statusCell);
        
        tbody.appendChild(row);
    });
}