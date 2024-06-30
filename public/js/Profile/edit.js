import ProfileForm from './partials/_profileform.js';

export default class ProfileEdit {
    constructor() {
        this.target = '#profile-content';
        this.form = new ProfileForm().getForm();
        return this.render();
    }

    static init() {
        const profileEdit = new ProfileEdit();
        return profileEdit;
    }

    render() {
        const HTML = `
        <div id="profile-edit" class="py-8 rounded-lg border p-8 mb-72 ">
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


        return this;
    }





}