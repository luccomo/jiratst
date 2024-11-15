AP.require(['request'], function(request) {
    const STATUS_OPTIONS = [
        { value: 'ordered', label: 'Ordered' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'warehouse', label: 'Warehouse' },
        { value: 'transit', label: 'In Transit' },
        { value: 'received', label: 'Received' }
    ]

    // Inject CSS
    const style = document.createElement('style')
    style.textContent = `
        .inventory-panel {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 16px;
            background-color: #fff;
        }
        .header {
            display: flex;
            align-items: center;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 2px solid #DFE1E6;
        }
        .logo {
            width: 48px;
            height: 48px;
            margin-right: 16px;
            border-radius: 4px;
        }
        .header h1 {
            color: #172B4D;
            font-size: 24px;
            font-weight: 600;
            margin: 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        th, td {
            border: 1px solid #DFE1E6;
            padding: 12px;
            text-align: left;
        }
        th {
            background-color: #F4F5F7;
            color: #172B4D;
            font-weight: 500;
            font-size: 14px;
        }
        td {
            font-size: 14px;
            color: #172B4D;
        }
        select {
            width: 100%;
            padding: 8px;
            border: 2px solid #DFE1E6;
            border-radius: 3px;
            background-color: white;
            font-size: 14px;
            color: #172B4D;
        }
        tr:nth-child(even) { background-color: #FAFBFC; }
        tr:hover { background-color: #F4F5F7; }
    `
    document.head.appendChild(style)

    // Create container and inject HTML structure
    const container = document.createElement('div')
    container.className = 'inventory-panel'
    container.innerHTML = `
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
    `
    document.body.appendChild(container)

    function createStatusSelect(item) {
        const select = document.createElement('select')
        select.className = 'status-select'
        select.setAttribute('data-item', item.description)
        
        select.onchange = (e) => {
            AP.context.getContext(context => {
                request({
                    url: `/rest/api/3/issue/${context.issueKey}`,
                    type: 'PUT',
                    data: JSON.stringify({
                        fields: {
                            customfield_10370: e.target.value // Replace with your actual custom field ID
                        }
                    }),
                    contentType: 'application/json',
                    success: () => {
                        console.log('Status updated successfully')
                    },
                    error: (xhr, statusText, err) => {
                        console.error('Error updating status:', err)
                    }
                })
            })
        }

        STATUS_OPTIONS.forEach(option => {
            const optionElement = document.createElement('option')
            optionElement.value = option.value
            optionElement.textContent = option.label
            optionElement.selected = item.status === option.value
            select.appendChild(optionElement)
        })

        return select
    }

    function renderInventoryTable() {
        const tbody = document.getElementById('inventory-tbody')
        
        // Fetch inventory data from Jira or use static data
        const inventoryData = [
            { description: 'Dell XPS 15 Laptop', quantity: 25, location: 'Main Warehouse', status: 'warehouse' },
            { description: 'HP 27" 4K Monitor', quantity: 40, location: 'Storage B2', status: 'ordered' },
            // ... other items
        ]
        
        inventoryData.forEach(item => {
            const row = document.createElement('tr')
            row.innerHTML = `
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>${item.location}</td>
            `
            const statusCell = document.createElement('td')
            statusCell.appendChild(createStatusSelect(item))
            row.appendChild(statusCell)
            tbody.appendChild(row)
        })
    }

    // Initialize the table
    renderInventoryTable()
})
