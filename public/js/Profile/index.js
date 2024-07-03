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
        this.url = 'main';

        this.profile = new ProfileForm();
        this.init();
    }



    init() {
        MainPage.init();
        // this.banner = Banner.init({
        //     title: 'Profile Page',
        //     link: '/profile',
        // });


        this.profile.getProfile().then((profile) => {
            this.UserCard = UserCard.init({ target: this.sidebar, user: profile });
            const nav = NavSideBar.init({
                callback: this.gotoPage.bind(this)
            });

            this.gotoPage(this.url);
        });

    }

    loadMainPage() {
        const main = MainPage.init();
        this.UserCard.moveTo(main.id);
        this.UserCard.setViewMore(true);
    }

    gotoPage(url) {
        $(this.content).html('');
        this.UserCard.show().setViewMore(false);

        this.url = url;

        const pages = {
            'main': () => { this.loadMainPage(); },
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