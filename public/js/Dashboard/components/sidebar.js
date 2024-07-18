import { getUser } from "../../assets/getUser.js";
import SideBar from "../../components/SideBar.js";

export default class DashboardSideBar extends SideBar {
  constructor({ target, onClick = () => {} }) {
    const user = getUser();
    console.log(user);
    const sidebar = [
      {
        text: "Main Page",
        icon: "fas fa-home",
        url: "main",
        isActive: true
      },
      {
        text: "Orders",
        icon: "fas fa-cart-shopping",
        url: "orders"
      },
      {
        text: "Products",
        icon: "fas fa-boxes",
        url: "products"
      },
      {
        text: "Brands",
        icon: "fas fa-tags",
        url: "brands"
      },
      {
        text: "Categories",
        icon: "fas fa-hashtag",
        url: "categories"
      },
      {
        text: "Promos",
        icon: "fas fa-percent",
        url: "promos"
      },
      (user &&
        user.role === "admin" && {
          text: "Users",
          icon: "fas fa-users",
          url: "users"
        }) ||
        {},
      {
        text: "Charts",
        icon: "fas fa-chart-line",
        url: "charts"
      },
      { type: "separator" },
      {
        text: "Settings",
        icon: "fas fa-cogs",
        url: "settings"
      },
      {
        text: "Logout",
        icon: "fas fa-sign-out-alt",
        url: "logout"
      }
    ];
    super({
      target,
      links: sidebar,
      onClick: onClick
    });
    return this;
  }

  static init({ target, callback = () => {} }) {
    const instance = new DashboardSideBar({ target, onClick: callback });
    return instance;
  }
}
