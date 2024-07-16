import SideBar from "../../components/SideBar.js";

export default class NavSideBar extends SideBar {
  constructor({ target, onClick = () => {} }) {
    const sidebar = [
      {
        text: "Profile",
        icon: "fas fa-user",
        url: "main",
        isActive: true
      },
      {
        text: "Edit Profile",
        icon: "fas fa-pen",
        url: "edit-profile"
      },
      {
        text: "Your Cart",
        icon: "fas fa-cart-shopping",
        url: "cart"
      },
      {
        text: "Your Orders",
        icon: "fas fa-boxes",
        url: "orders"
      },
      { type: "separator" },
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

  static init({ callback = () => {} }) {
    const card = `
        <div class="flex flex-col space-y-4 ">
            <h2 class="sm:hidden md:block text-2xl font-extrabold">Navigation</h2>
            <div id="navigation"></div>
        </div>
        `;
    $("#profile-sidebar").append(card);
    const instance = new NavSideBar({ target: "#navigation", onClick: callback });
    return instance;
  }
}
