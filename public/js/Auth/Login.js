import ajaxRequest from '../assets/ajaxRequest.js';
import Modal from '../components/Modal.js';

export default class Login {
    constructor() {
        this.modal = null;
        this.render();
        this.validate();
    }

    render() {
        this.modal = new Modal({
            id: 'login_modal',
            top: `
                <div class="flex items-center space-x-2">
                <h3 class="font-extrabold uppercase text-3xl">Log In</h3>
                </div>
            `,
            content: `
            <form id="login-form" method="POST">
                <div class="form-control">
                    <label for="email" class="label">Email</label>
                    <input type="email" id="email" name="email" placeholder="example@email.com" class="input input-bordered"
                        required>
                </div>
                <div class="form-control">
                    <label for="password" class="label">Password</label>
                    <input type="password" id="password" name="password" placeholder="Password" class="input input-bordered"
                        required>
                </div>
        
                <div class="form-control mt-6">
                    <button type="button" id="form-submit" class="btn btn-primary">Log in</button>
                </div>
            </form>
            `,
            destroyOnClose: true,
            isShown: true,
        });

        this.modal.find('#form-submit').on('click', () => {
            this.isValid() && this.handleOnSubmit();
        });


    }

    isValid() {
        return $('#login-form').valid();
    }

    validate = () => {
        $('#login-form').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    rangelength: [8, 16]
                }
            },
            messages: {
                email: {
                    required: 'Email is required',
                    email: 'Email is invalid'
                },
                password: {
                    required: 'Password is required',
                    minlength: 'Password must be at least 8-16 characters'
                }
            },
            errorElement: 'span',
            errorPlacement: function (error, element) {
                error.addClass('text-red-400 text-sm italic my-1');
                element.addClass('border-red-400');
                error.insertAfter(element);
            },

        });

    }

    handleOnSubmit = () => {

        var formData = new FormData($('#login-form')[0]);
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        ajaxRequest.post({
            url: '/login',
            data: formData,
            headers: {
                'X-CSRF-TOKEN': token,
            },
            onSuccess: (response) => {
                console.log(response);
                this.modal.remove();
                window.location.href = '/'
            },
            onError: (error) => {
                console.log(error);
            }
        })
    }
}





