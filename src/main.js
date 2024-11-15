import { renderInventoryTable } from './components/InventoryTable.js';
import { inventoryData } from './data/inventory.js';
import './styles/inventory-panel.css';

function initializeApp() {
    document.getElementById('app').innerHTML = `
        <div class="inventory-panel">
            <div class="header">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOnY7kwT4CodTPciSSowVWoYz-ABG9uZgFxw&s" alt="Diversified Logo" class="logo">
                <h1>Diversified Inventory Test</h1>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Item Description</th>
                        <th>Quantity</th>
                        <th>Location</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody id="inventory-tbody"></tbody>
            </table>
        </div>
    `;

    renderInventoryTable(inventoryData);
}

document.addEventListener('DOMContentLoaded', initializeApp);