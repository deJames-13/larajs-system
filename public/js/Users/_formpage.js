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
        const requiredFields = ['first_name', 'last_name', 'username', 'email', 'phone_number', 'address_1', 'address_2', 'city', 'province', 'country', 'zip_code', 'birthdate'];

        const rules = requiredFields.reduce((acc, field) => {
            acc[field] = {
                required: true,
            };

            if (field == 'email') {
                acc[field].email = true;
            }

            if (field == 'username') {
                acc[field].minlength = 3;
                acc[field].maxlength = 25;
                acc[field].pattern = /^[a-zA-Z0-9_]+$/;
            }

            return acc;
        }, {});

        const messages = requiredFields.reduce((acc, field) => {
            acc[field] = {
                required: 'This field is required!',
            };

            if (field == 'email') {
                acc[field].email = 'Email is invalid';
            }

            if (field == 'username') {
                acc[field].minlength = 'Username must be at least 3 characters';
                acc[field].maxlength = 'Username must be at most 25 characters';
                acc[field].pattern = 'Username must contain only letters, numbers, or underscores';
            }

            return acc;
        }, {});
        console.log({
            rules: rules,
            messages: messages,
        })
        this.form.validate({
            rules: rules,
            messages: messages,
            errorElement: 'p',
            errorPlacement: function (error, element) {
                error.addClass('text-error text-xs italic my-1');
                error.insertAfter(element);
            }
        });

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
