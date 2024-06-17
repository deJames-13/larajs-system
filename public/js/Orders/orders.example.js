let order = {
    id: 1,
    created_at: '2022-01-01',
    status: 'pending',
    statusIcon: '',
    statusMessage: 'Order is pending',
    total: 300.00,
    items: [{
        id: 1,
        image_path: 'https://placehold.co/400x600?text=item',
        name: 'Item 1',
        price: 100.00,
        quantity: 1,
        sku_code: 'SKU1',
        brand: 'Brand 1',
        unit_price: 100.00,
    },


    {
        id: 2,
        image_path: 'https://placehold.co/400x600?text=item',
        name: 'Item 2',
        price: 200.00,
        quantity: 1,
        sku_code: 'SKU2',
        brand: 'Brand 2',
        unit_price: 200.00,
    },

    ],
};

let orderCard = new Order(order);
$('#tab-content').append(orderCard.render());
// manual buttons
$('#order-actions').append(
    `
    <button class="btn btn-sm btn-primary ">Rate</button>
    <button class="btn btn-sm btn-primary btn-outline">View Details</button>
    <button class="btn btn-sm btn-primary btn-outline">Buy Again</button>
    `
)

let order2 = {
    id: 2,
    created_at: '2022-01-01',
    status: 'processing',
    statusIcon: '',
    statusMessage: 'Order is processing',
    total: 300.00,
    items: [{
        id: 1,
        image_path: 'https://placehold.co/400x600?text=item',
        name: 'Item 1',
        price: 100.00,
        quantity: 1,
        sku_code: 'SKU1',
        brand: 'Brand 1',
        unit_price: 100.00,
    },


    {
        id: 2,
        image_path: 'https://placehold.co/400x600?text=item',
        name: 'Item 2',
        price: 200.00,
        quantity: 1,
        sku_code: 'SKU2',
        brand: 'Brand 2',
        unit_price: 200.00,
    },

    ],
};

let orderCard2 = new Order(order2);
$('#tab-content').append(orderCard2.render());
// manual buttons
$('#order-actions').append(
    `
    <button class="btn btn-sm btn-primary ">Rate</button>
    <button class="btn btn-sm btn-primary btn-outline">View Details</button>
    <button class="btn btn-sm btn-primary btn-outline">Buy Again</button>
    `
)
