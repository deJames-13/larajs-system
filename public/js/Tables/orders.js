import TablePage from './table.js';

export default class OrdersPage extends TablePage {
    constructor({ target }) {
        super({
            target: target,
            table: 'promos',
            withActions: false,
        });
    }
    static init({ target }) {
        const instance = new OrdersPage({ target });
        return instance;
    }


}