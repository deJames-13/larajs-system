import Banner from "../components/Banner.js";
import NavSideBar from "./partials/_navigation.js";
import ProfileForm from "./partials/_profileform.js";
import UserCard from "./partials/_usercard.js";

import MyCart from "./cart.js";
import ProfileEdit from "./edit.js";
import MyOrders from "./orders.js";

export default class ProfilePage {
    constructor() {
        this.banner = null;
        this.UserCard = null;
        this.user_profile = null;
        this.sidebar = '#profile-sidebar'
        this.content = '#profile-content';

        this.profile = new ProfileForm();
        this.init();
    }



    init() {
        this.profile.getProfile().then((profile) => {
            this.banner = Banner.init({ title: 'Profile Page' });
            this.UserCard = UserCard.init({ target: this.sidebar, user: profile });
            const nav = NavSideBar.init({
                callback: this.gotoPage.bind(this)
            });
        });

    }

    gotoPage(url) {
        $(this.content).html('');
        this.UserCard.show();
        url === 'edit-profile' && ProfileEdit.init({ profile: this.profile });
        url === 'edit-profile' && this.UserCard.hide();
        url === 'cart' && MyCart.init();
        url === 'orders' && MyOrders.init();

    }
}

new ProfilePage();