export const STATUS_OPTIONS = [
    { value: 'ordered', label: 'Ordered' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'warehouse', label: 'Warehouse' },
    { value: 'transit', label: 'In Transit' },
    { value: 'received', label: 'Received' }
];

export const inventoryData = [
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