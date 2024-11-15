// Define status options
const STATUS_OPTIONS = [
    { value: 'ordered', label: 'Ordered' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'warehouse', label: 'Warehouse' },
    { value: 'transit', label: 'In Transit' },
    { value: 'received', label: 'Received' }
];

// Sample inventory data - Replace with actual data from Jira
const inventoryItems = [
    { description: 'Laptop Dell XPS', quantity: 10, location: 'Warehouse A', status: 'warehouse' },
    { description: 'Monitor 27"', quantity: 15, location: 'Warehouse B', status: 'ordered' },
    { description: 'Wireless Mouse', quantity: 50, location: 'Store 1', status: 'received' }
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
    
    // Example AJAX call to update status in Jira
    AP.request({
        url: `/rest/api/3/issue/${AP.context.getIssueKey()}`,
        type: 'PUT',
        data: JSON.stringify({
            fields: {
                // Replace 'customfield_xxxxx' with your actual custom field ID
                customfield_xxxxx: newStatus
            }
        }),
        contentType: 'application/json'
    }).then(() => {
        // Handle success
        console.log('Status updated successfully');
    }).catch(error => {
        // Handle error
        console.error('Error updating status:', error);
    });
}

// Initialize the table when the script loads
document.addEventListener('DOMContentLoaded', renderInventoryTable);