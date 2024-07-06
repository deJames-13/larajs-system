import ajaxRequest from '../assets/ajaxRequest.js';
import Modal from '../components/Modal.js';
import UserForm from './_userform.js';

export default class UserFormPage {
    constructor() {
        this.modal = null;
        this.id = null;
        this.width = '6xl';
        this.user = null;
        this.userId = null;
        this.userForm = new UserForm();
        this.form = this.userForm.getForm();
    }

    init() {
        this.render();
        this.validate();
        this.form = $('#form-wrapper form');
        return this.modal;
    }

    makeTop() {
        return ``
    }
    makeContent() {
        return `
        <div id="form-wrapper" class="py-8">
            ${this.form.prop('outerHTML')}
        </div>
        `;
    }
    makeAction() {
        return ``
    }


    fetchUser(id) {
        return new Promise((resolve, reject) => {
            ajaxRequest.get({
                url: `/api/users/${id}`,
                onSuccess: (response) => {
                    this.user = response;
                    resolve(response);
                },
                onError: (error) => {
                    console.log(error);
                    reject(error);
                }
            })
        });
    }



    validate() {
    }

    render() {
        this.modal = new Modal({
            id: this.id,
            isShown: true,
            width: this.width,
            top: this.makeTop(),
            content: this.makeContent(),
            action: this.makeAction(),
            destroyOnClose: true

        });
    }
}
