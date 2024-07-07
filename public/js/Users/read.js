import UserFormPage from './_formpage.js';
export default class UserView extends UserFormPage {
    constructor({ userId }) {
        super();
        this.userId = userId;
        this.id = 'user_view_modal';
        this.init();
    }
    makeTop() {
        return `<h1 class="text-2xl font-extrabold">View User #${this.userId}</h1>`
    }
    makeContent() {
        return ``
    }
}
