import UserFormPage from './_formpage.js';
export default class UserAdd extends UserFormPage {
    constructor() {
        super();
        this.init();
    }
    makeTop() {
        return `<h1 class="text-2xl font-extrabold">Add New User </h1>`
    }


}
