import Banner from "../components/Banner.js";
import NavSideBar from "./partials/_navigation.js";
import ProfileForm from "./partials/_profileform.js";
import UserCard from "./partials/_usercard.js";

import MyCart from "./cart.js";
import ProfileEdit from "./edit.js";
import MainPage from "./main.js";
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
        MainPage.init();
        this.banner = Banner.init({
            title: 'Profile Page',
            link: '/profile',
        });


        this.profile.getProfile().then((profile) => {
            this.UserCard = UserCard.init({ target: this.sidebar, user: profile });
            const nav = NavSideBar.init({
                callback: this.gotoPage.bind(this)
            });

        });

    }

    gotoPage(url) {
        $(this.content).html('');
        this.UserCard.show();

        const pages = {
            'main': () => MainPage.init(),
            'edit-profile': () => {
                ProfileEdit.init({ profile: this.profile });
                this.UserCard.hide();
            },
            'cart': () => MyCart.init(),
            'orders': () => MyOrders.init()
        }

        pages[url] && pages[url]();


    }
}

new ProfilePage();