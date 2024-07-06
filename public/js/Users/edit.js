import UserFormPage from './_formpage.js';
export default class UserEdit extends UserFormPage {
    constructor({ userId }) {
        super();
        this.userId = userId;
        this.id = 'user_edit_modal';
        this.init();
        this.fetchUser(userId).then((response) => {
            this.populateForm(response)
        });
        this.bindAction();

    }
    makeTop() {
        return `<h1 class="text-2xl font-extrabold">Edit User #${this.userId}</h1>`
    }

    makeAction() {
        return `
        <div id="form-actions" style="display: none;" class="absolute bottom-0 left-0  py-4 flex gap-4 px-8 justify-end w-full">
            <button type="button" class="btn btn-primary" id="btn_edit_user">Save</button>
            <button type="button" class="btn btn-ghost hover:bg-red-400" id="btn_edit_user">Cancel</button>
        </div>
    `
    }

    bindAction() {
        $(this.form).change(() => {
            $('#form-actions').show();
        });
    }


    populateForm(data) {
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
