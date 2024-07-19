import { debounce } from "../assets/debounce.js";
import logout from "../Auth/logout.js";
import MyCart from "./cart.js";
import ProfileEdit from "./edit.js";
import MainPage from "./main.js";
import MyOrders from "./orders.js";
import NavSideBar from "./partials/_navigation.js";
import ProfileForm from "./partials/_profileform.js";
import UserCard from "./partials/_usercard.js";

export default class ProfilePage {
  banner = null;
  userCard = null;
  user_profile = null;
  sidebar = "#profile-sidebar";
  content = "#profile-content";
  url = "main";
  profile = new ProfileForm({ onUpdate: this.updateProfile.bind(this) });

  constructor() {
    this.init();
  }

  async init() {
    try {
      this.user_profile = await this.profile.getProfile();
      this.userCard = UserCard.init({ target: this.sidebar, user: this.user_profile });
      NavSideBar.init({ callback: this.gotoPage.bind(this) });
      this.gotoPage(this.url);
    } catch (error) {
      console.error("Failed to initialize profile page:", error);
    }
  }

  loadMainPage() {
    const main = MainPage.init();
    this.userCard.moveTo(main.id);
    this.userCard.setViewMore(true);
  }

  updateProfile(user) {
    this.user_profile = user;
    this.userCard.setUser(user);
  }

  _gotoPage(url) {
    // prevent duplicate loading
    $(this.content).empty();
    this.userCard.show().setViewMore(false);
    this.url = url;

    const pages = {
      main: this.loadMainPage.bind(this),
      "edit-profile": () => {
        ProfileEdit.init({ profile: this.profile });
        this.userCard.hide();
      },
      cart: MyCart.init,
      orders: MyOrders.init,
      logout: logout
    };

    if (pages[url]) {
      pages[url]();
    } else {
      console.error(`No page found for URL: ${url}`);
    }
  }

  gotoPage(url) {
    const go = debounce(() => {
      this._gotoPage(url);
    }, 100);
    go();
  }
}

new ProfilePage();
