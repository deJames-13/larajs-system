import SideBar from "../../components/SideBar.js";

export default class DashboardSideBar extends SideBar {
    constructor({ target, onClick }) {
        const sidebar = [{
            text: 'Main Page',
            icon: 'fas fa-home',
            url: 'main',
            isActive: true
        },
        {
            text: 'Orders',
            icon: 'fas fa-cart-shopping',
            url: 'orders'
        },
        {
            text: 'Products',
            icon: 'fas fa-boxes',
            url: 'products'
        },
        {
            text: 'Brands',
            icon: 'fas fa-tags',
            url: 'brands'
        },
        {
            text: 'Categories',
            icon: 'fas fa-hashtag',
            url: 'categories'
        },
        {
            text: 'Promos',
            icon: 'fas fa-percent',
            url: 'promos'
        },
        {
            text: 'Charts',
            icon: 'fas fa-chart-line',
            url: 'charts'
        },
        { type: 'separator' },
        {
            text: 'Settings',
            icon: 'fas fa-cogs',
            url: 'settings'
        },
        {
            text: 'Logout',
            icon: 'fas fa-sign-out-alt',
            url: 'logout'
        }
        ];
        super({
            target,
            links: sidebar,
            onClick: onClick
        });
    }

    static init({ target, callback = () => { } }) {
        const instance = new DashboardSideBar({ target, onClick: callback });
        return instance;
    }
}
