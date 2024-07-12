import UserEdit from "../Users/edit.js";

let defaultProps = {
    userId: null,
    onUpdate: () => {},
};

export default class OnBoarding extends UserEdit {
    constructor(props = {}) {
        super(props);
        Object.assign(this, defaultProps, props);
    }

    init() {
        this.fetchUrl = `/api/profile/`;
        super.init();
        $("#priviliges").remove();
    }

    makeTop() {
        return `
        <div class="">
            <h1 class="text-2xl font-extrabold">Set up your account!</h1>
            <p class="text-gray-500">We need some information to get you started.</p>
        </div>

        `;
    }
    onSubmit() {
        Swal.fire({
            title: "Confirm Information",
            text: "You are about to save changes on your profile information.",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Save",
        }).then((result) => {
            if (result.isConfirmed) this.handleSubmit();
        });
    }
    handleSubmit() {
        this.submitForm().then((response) => {
            this.handleUpdate();
            this.populateForm();
            Swal.fire(
                "Account Saved!",
                "Your profile information has been updated.",
                "success",
            );
            $("#form-actions").hide();
        });
    }
    onCancel() {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to discard changes on your account. Please be reminded that you may need to provide the necessary information to continue using our service.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Discard",
        }).then((result) => {
            if (result.isConfirmed) {
                this.populateForm();
                $("#form-actions").hide();
            }
        });
    }
}
