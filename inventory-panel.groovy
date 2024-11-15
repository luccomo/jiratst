import com.onresolve.scriptrunner.runner.customisers.WithPlugin
import com.onresolve.scriptrunner.runner.customisers.PluginModule
import com.atlassian.jira.component.ComponentAccessor
import groovy.xml.MarkupBuilder

@WithPlugin("com.onresolve.jira.groovy.groovyrunner")
def getFragment() {
    def writer = new StringWriter()
    def html = new MarkupBuilder(writer)
    
    html.div(class: 'inventory-panel') {
        div(class: 'header') {
            img(src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOnY7kwT4CodTPciSSowVWoYz-ABG9uZgFxw&s', 
                alt: 'Diversified Logo', 
                class: 'logo')
            h1('Diversified Inventory Test')
        }
        table {
            thead {
                tr {
                    th('Item Description')
                    th('Quantity')
                    th('Location')
                    th('Status')
                }
            }
            tbody(id: 'inventory-tbody')
        }
        script(type: 'text/javascript', '''
            const STATUS_OPTIONS = [
                { value: 'ordered', label: 'Ordered' },
                { value: 'shipped', label: 'Shipped' },
                { value: 'warehouse', label: 'Warehouse' },
                { value: 'transit', label: 'In Transit' },
                { value: 'received', label: 'Received' }
            ];

            const inventoryData = [
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
                
                select.onchange = (e) => {
                    console.log(`Status updated for ${item.description}: ${e.target.value}`);
                    if (window.AP) {
                        AP.request({
                            url: `/rest/api/3/issue/${AP.context.getIssueKey()}`,
                            type: 'PUT',
                            data: JSON.stringify({
                                fields: {
                                    customfield_xxxxx: e.target.value
                                }
                            }),
                            contentType: 'application/json'
                        });
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

            function renderInventoryTable() {
                const tbody = document.getElementById('inventory-tbody');
                tbody.innerHTML = '';
                
                inventoryData.forEach(item => {
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

            renderInventoryTable();
        ''')
        style('''
            .inventory-panel {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
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

            .inventory-panel table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }

            .inventory-panel th, 
            .inventory-panel td {
                border: 1px solid #DFE1E6;
                padding: 12px;
                text-align: left;
            }

            .inventory-panel th {
                background-color: #F4F5F7;
                color: #172B4D;
                font-weight: 500;
                font-size: 14px;
            }

            .inventory-panel td {
                font-size: 14px;
                color: #172B4D;
            }

            .inventory-panel select {
                width: 100%;
                padding: 8px;
                border: 2px solid #DFE1E6;
                border-radius: 3px;
                background-color: white;
                font-size: 14px;
                color: #172B4D;
                transition: border-color 0.2s ease;
            }

            .inventory-panel select:hover {
                border-color: #B3BAC5;
            }

            .inventory-panel select:focus {
                border-color: #4C9AFF;
                outline: none;
            }

            .inventory-panel tr:nth-child(even) {
                background-color: #FAFBFC;
            }

            .inventory-panel tr:hover {
                background-color: #F4F5F7;
            }
        ''')
    }
    
    return writer.toString()
}

return getFragment()