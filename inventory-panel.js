// Define status options
const STATUS_OPTIONS = [
    { value: 'ordered', label: 'Ordered', colors: 'status-badge status-ordered' },
    { value: 'shipped', label: 'Shipped', colors: 'status-badge status-shipped' },
    { value: 'warehouse', label: 'Warehouse', colors: 'status-badge status-warehouse' },
    { value: 'transit', label: 'In Transit', colors: 'status-badge status-transit' },
    { value: 'received', label: 'Received', colors: 'status-badge status-received' }
];

// IT Equipment inventory data
const inventoryItems = [
    { description: 'Dell XPS 15 Laptop', quantity: 25, location: 'Main Warehouse', status: 'warehouse' },
    { description: 'HP 27" 4K Monitor', quantity: 40, location: 'Storage B2', status: 'ordered' },
    { description: 'Logitech MX Master 3 Mouse', quantity: 100, location: 'Storage A1', status: 'received' },
    { description: 'Apple MacBook Pro M1', quantity: 15, location: 'Secure Storage', status: 'transit' },
    { description: 'Lenovo ThinkPad Dock', quantity: 30, location: 'Main Warehouse', status: 'received' },
    { description: 'Microsoft Surface Pro 8', quantity: 20, location: 'Storage B1', status: 'ordered' },
    { description: 'Keychron K2 Keyboard', quantity: 50, location: 'Storage A2', status: 'warehouse' },
    { description: 'Cisco IP Phone 8841', quantity: 75, location: 'Storage C1', status: 'shipped' },
    { description: 'APC UPS 1500VA', quantity: 25, location: 'Main Warehouse', status: 'received' },
    { description: 'Dell OptiPlex Desktop', quantity: 35, location: 'Storage B3', status: 'warehouse' }
];

function createStatusSelect(item) {
    const select = document.createElement('select');
    select.className = 'status-select';
    select.setAttribute('data-item', item.description);
    select.onchange = (e) => updateStatus(e.target.value, item.description);

    STATUS_OPTIONS.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        optionElement.selected = item.status === option.value;
        select.appendChild(optionElement);
    });

    return select;
}

function renderInventoryTable() {
    const tbody = document.getElementById('inventory-tbody');
    tbody.innerHTML = ''; // Clear existing content
    
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

function updateStatus(newStatus, itemDescription) {
    console.log(`Updating status for ${itemDescription} to ${newStatus}`);
    
    AP.request({
        url: `/rest/api/3/issue/${AP.context.getIssueKey()}`,
        type: 'PUT',
        data: JSON.stringify({
            fields: {
                customfield_xxxxx: newStatus
            }
        }),
        contentType: 'application/json'
    }).then(() => {
        console.log('Status updated successfully');
    }).catch(error => {
        console.error('Error updating status:', error);
    });
}

document.addEventListener('DOMContentLoaded', renderInventoryTable);