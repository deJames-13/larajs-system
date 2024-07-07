import UserEdit from '../Users/edit.js';
import UserFormPage from './_formpage.js';
export default class UserAdd extends UserFormPage {
    constructor({ onUpdate = () => { } }) {
        super();
        this.init();
        this.handleUpdate = onUpdate;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.bindAction();
    }
    makeTop() {
        return `<h1 class="text-2xl font-extrabold">Add New User </h1>`
    }


    bindAction() {
        $(this.form).change(() => {
            $('#form-actions').show();
        });
        $('#form-actions button').click((e) => {
            const action = $(e.target).data('action');
            if (action === 'save') {
                this.onSubmit();
            } else {
                this.onCancel();
            }
        });
    }

    addPassword(pws, pwd_confirm) {
        const password = $('<input>', {
            type: 'password',
            id: 'password',
            name: 'password',
            class: 'hidden',
            value: pws
        });
        const password_confirmation = $('<input>', {
            type: 'password',
            id: 'password_confirmation',
            name: 'password_confirmation',
            class: 'hidden',
            value: pwd_confirm

        });

        $(this.form).append(password);
        $(this.form).append(password_confirmation);
    }

    confirmWithPassword() {
        Swal.fire({
            title: 'Enter New User Password',
            html: `
            <div className="flex flex-col items-center justify-center">
                <div class="flex flex-col gap-1">
                    <label for="password" class="label text-xs">Add Password</label>
                    <input type="password" id="password" class="input input-bordered rounded-none w-full" placeholder="Password">
                </div>
                <div class="flex flex-col gap-1">
                    <label for="password_confirmation" class="label text-xs">Confirm Password</label>
                    <input type="password" id="password_confirmation" class="input input-bordered rounded-none w-full" placeholder="Confirm Password">
                </div>
            </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const password = $('#password').val();
                const password_confirmation = $('#password_confirmation').val();
                if (password !== password_confirmation) {
                    Swal.showValidationMessage('Password does not match.');
                    return false;
                }
                return { password, password_confirmation };
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                this.addPassword(result.value.password, result.value.password_confirmation);
                this.handleSubmit();
            }
        });

    }


    handleSubmit() {
        this.submitForm().then((response) => {
            Swal.fire(
                'Saved!',
                'User information has been saved.',
                'success'
            );
            $('#form-actions').hide();
            this.modal.close();
            this.handleUpdate();
            new UserEdit({ userId: response.id });
        });
    }

    onSubmit() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to create this user's information.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save'
        }).then((result) => {
            if (result.isConfirmed) {
                this.confirmWithPassword();
            };
        });
    }

    onCancel() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to discard creating user.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Discard'
        }).then((result) => {
            if (result.isConfirmed) {
                this.modal.close();
            }
        });
    }


}
