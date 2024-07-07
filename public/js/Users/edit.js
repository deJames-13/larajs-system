import ajaxRequest from '../assets/ajaxRequest.js';
import UserFormPage from './_formpage.js';
export default class UserEdit extends UserFormPage {

    constructor({ userId, onUpdate = () => { } }) {
        super();
        this.userId = userId;
        this.id = 'user_edit_modal';
        this.init();
        this.fetchUser(userId).then((response) => {
            this.populateForm()
        });
        this.bindAction();
        this.onUpdate = onUpdate;

        this.handleImageUpload();

    }

    makeTop() {
        return `<h1 class="text-2xl font-extrabold">Edit User #${this.userId}</h1>`
    }

    makeAction() {
        return `
        <div id="form-actions" style="display: none;" class="absolute bottom-0 left-0  py-4 flex gap-4 px-8 justify-end w-full">
            <button data-action="save" type="button" class="btn btn-primary" id="btn_edit_user">Save</button>
            <button data-action="cancel" type="button" class="btn btn-ghost hover:bg-red-400" id="btn_edit_user">Cancel</button>
        </div>
    `
    }

    bindAction() {
        $(this.form).change(() => {
            $('#form-actions').show();
        });
        $('#form-actions button').click((e) => {
            const action = $(e.target).data('action');
            if (action === 'save') {
                this.onSave();
            } else {
                this.onCancel();
            }
        });
    }

    onSave() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to save changes on this user's information.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save'
        }).then((result) => {
            if (result.isConfirmed) {
                this.submitForm().then((response) => {
                    this.onUpdate();
                    Swal.fire(
                        'Saved!',
                        'User information has been updated.',
                        'success'
                    );
                    $('#form-actions').hide();
                });
            }
        });
    }


    onCancel() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to discard changes on this user's information.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Discard'
        }).then((result) => {
            if (result.isConfirmed) {
                this.populateForm();
                $('#form-actions').hide();
            }
        });
    }


    handleImageUpload() {
        // if an image is inputted in the input-image, preview it in profile-image
        const inputImage = this.form.find('#input-image');
        const profileImage = this.form.find('#profile-image');
        inputImage.change(() => {
            const file = inputImage[0].files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImage.attr('src', e.target.result);
            }
            reader.readAsDataURL(file);
        });
    }


    handleInvalidInput(errors) {
        Object.keys(errors).map(e => {
            const errorId = this.form.find(`[data-error-id="${e}"]`);
            errorId.text(errors[e]);
        });
    }


    populateForm(data) {
        // console.log(this.user);
        if (!this.user) return console.log('No user profile found');

        Object.keys(this.user).map((key) => {

            this.form.find(`#${key}`).val(this.user[key]);
        });

        if (!this.user.info) return;
        if (this.user.images.length > 0) {
            this.form.find('#profile-image').attr('src', this.usur_profile.images[0].path);
        }

        Object.keys(this.user.info).map((key) => {
            // so fxking dumb
            if (key === 'address') {
                const arrAddr = this.user.info[key].split(',');
                const address = {
                    address_1: arrAddr[0],
                    address_2: arrAddr[1],
                    city: arrAddr[2],
                    province: arrAddr[3],
                    country: arrAddr[4],
                }
                Object.keys(address).map((addr) => {
                    this.form.find(`#${addr}`).val(address[addr]);
                });
            }

            if (key === 'birthdate')
                this.form.find(`#${key}`).val(this.user[key].split('T')[0]);
            else
                this.form.find(`#${key}`).val(this.user.info[key]);


        });


    }

}
