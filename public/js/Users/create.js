import UserForm from './_form.js';
export default class UserAdd extends UserForm {
    constructor() {
        super();
        this.init()
    }
    makeTop() {
        return `<h1 class="text-2xl font-extrabold">Add New User </h1>`
    }
}