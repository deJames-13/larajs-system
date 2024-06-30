
export default class UserCard {
    constructor({ target, user = {} }) {
        this.target = target;
        this.user = user;

        return this.render().show();
    }

    static init({ target, user = {} }) {
        const userCard = new UserCard({ target, user });
        return userCard;
    }

    show() {
        $(this.target).prepend($('#user-card'));
        $('#user-card').fadeIn();
        return this;
    }

    hide() {
        $('#user-card').fadeOut();
        $(this.target).append($('#user-card'));
        return this;
    }



    render() {
        const HTML = `
        <!--USER CARD -->
        <div id="user-card" style="display: none" class="border p-8 rounded-lg shadow-xl flex flex-col space-y-4 ">
            <h2 class="text-2xl font-extrabold">Your Profile</h2>
            <div class="flex space-x-4 items-center">
                <!--USER IMAGE -->
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-24 rounded ring ring-offset-2">
                        <img src="${this.user.profile_image || 'https://placehold.co/600x400?text=Profile'}" alt="profile-image">
                    </div>
                </div>

                <!--USER INFO -->
                <div class="flex flex-col">
                    <span class="font-extrabold text-lg">
                        ${this.user.fullname || this.user.username || 'Full Name'}
                    </span>
                    <span class="font-bold text-gray-400 text-md">
                        ${this.user.email || 'email@example.com'}
                    </span>
                    <a id="view-profile" class="hover:text-primary cursor-pointer font-bold text-gray-600 text-sm">
                        View More
                    </a>
                </div>
            </div>

        </div>
        `
        $(this.target).prepend(HTML);
        return this;
    }
}