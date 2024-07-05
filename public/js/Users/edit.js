import UserForm from './_form.js';
export default class UserEdit extends UserForm {
    constructor({ userId }) {
        super();
        this.userId = userId;
        this.id = 'user_edit_modal';
        this.init();

    }
    makeTop() {
        return `<h1 class="text-2xl font-extrabold">Edit User #${this.userId}</h1>`
    }
}