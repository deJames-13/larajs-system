import ProfileForm from './partials/_profileform.js';
export default class ProfileEdit {
    constructor({ profile = null }) {
        this.target = '#profile-content';
        this.profile = profile || new ProfileForm();
        this.form = this.profile.getForm();
        this.user_profile = this.profile.getProfile();
        return this.render();
    }

    static init({ profile = null }) {
        const profileEdit = new ProfileEdit({ profile: profile });
        return profileEdit;
    }

    handleActionButtons(button) {
        const btn = button.data('button');
        btn === 'save' && this.profile.onSubmit();
        btn === 'cancel' && this.profile.cancelSubmit();
    }

    render() {
        const HTML = `
        <div id="profile-edit" class="p-4">
            <div  class="flex items-center justify-between">
                <h2 class="text-2xl font-extrabold">Edit Profile</h2>
                <div id="form-actions">
                    <button data-button="save" class="btn btn-sm text-white btn-success hover:btn-primary">
                        Save
                    </button>
                    <button data-button="cancel" class="btn btn-sm btn-secondary btn-outline hover:bg-error">
                        Cancel
                    </button>
                </div>
            </div>

            <div class="divider"></div>
        </div>
        `;

        $(this.target).html(HTML);
        $(`${this.target} #profile-edit`).append(this.form);
        $(this.target).find('#form-actions').hide();

        // show form actions if form is changed
        $(this.form).change(() => {
            $(this.target).find('#form-actions').show();
        });

        $(this.target).find('#form-actions button').click((e) => { this.handleActionButtons($(e.target)) });




        return this;
    }





}