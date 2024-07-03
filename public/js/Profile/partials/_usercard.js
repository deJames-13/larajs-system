import ajaxRequest from "../../assets/ajaxRequest.js";

export default class UserCard {
  constructor({ target, user }) {
    this.target = target;
    this.user = user;
    this.card = null;
    this.viewMore = false;

    this.render();
  }

  static init({ target, user = {} }) {
    const userCard = new UserCard({ target, user });
    return userCard;
  }

  moveTo(target) {
    $('#' + target).prepend(this.card);
    $('#user-card').fadeIn();
    return this;
  }

  show() {
    $(this.target).prepend(this.card);
    $('#user-card').fadeIn();
    return this;
  }

  hide() {
    $('#user-card').fadeOut();
    $(this.target).append(this.card);
    return this;
  }

  setViewMore(isView) {
    this.viewMore = isView;
    if (this.viewMore) {
      $("#view-profile").hide()
      $("#view-more").show()
    }
    else {
      $("#view-profile").show()
      $("#view-more").hide()
    }
  }

  render() {
    const image = this.user.images && this.user.images.length > 0 && this.user.images[0].path;
    const HTML = `
      <div id="user-card" style="display: none" class="sm:hidden sm:w-0 md:w-full md:flex flex-col space-y-4 ">
        <h2 class="text-2xl font-extrabold">${this.user.fullname || 'Your Profile'}</h2>
        <div class="flex space-x-4 items-center">
          <div class="avatar">
            <div class="ring-primary ring-offset-base-100 w-24 rounded ring ring-offset-2">
              <img id="profile-image" src="${image || 'https://placehold.co/600x400?text=Profile'}" alt="profile-image">
            </div>
          </div>

          <div class="flex flex-col">
            <span id="profile-name" class="font-extrabold text-lg">
              @${this.user.username || '_'}
            </span>
            <span id="profile-email" class="font-bold text-gray-400 text-md">
              ${this.user.email || 'email@example.com'}
            </span>

            <div id="view-more"> 
              <span id="profile-address" class="text-gray-700 text-xs">
                ${this.user.info.address + ' ' + this.user.info.zip_code || ''}
              </span>
              <br />    
              <span id="profile-phone" class="text-gray-700 text-xs">
                ${this.user.info.phone_number || ''}
              </span>
            </div>

            <a href="/profile" id="view-profile" class="hover:text-primary cursor-pointer font-bold text-gray-600 text-sm">
                  View More
            </a>
          </div>
        </div>
        <div class="divider"></div>
      </div>
    `;

    this.card = $(HTML);
    $(this.target).prepend(this.card);
    this.setViewMore(false);

    return this;
  }
}
