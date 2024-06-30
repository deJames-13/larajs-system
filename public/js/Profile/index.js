import Banner from "../components/Banner.js";
import NavSideBar from "./partials/_navigation.js";
import UserCard from "./partials/_usercard.js";

import MyCart from "./cart.js";
import ProfileEdit from "./edit.js";
import MyOrders from "./orders.js";

export default class ProfilePage {
    constructor() {
        this.banner = null;
        this.UserCard = null;
        this.sidebar = '#profile-sidebar'
        this.content = '#profile-content';

        this.init();

    }

    init() {
        this.banner = Banner.init({ title: 'Profile Page' });
        this.UserCard = UserCard.init({ target: this.sidebar });
        const nav = NavSideBar.init({
            callback: this.gotoPage.bind(this)
        });
    }

    gotoPage(url) {
        $(this.content).html('');
        this.UserCard.show();
        url === 'edit-profile' && ProfileEdit.init();
        url === 'edit-profile' && this.UserCard.hide();
    }

}

new ProfilePage();