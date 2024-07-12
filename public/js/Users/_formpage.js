import ajaxRequest from "../assets/ajaxRequest.js";
import Modal from "../components/Modal.js";
import UserForm from "./_userform.js";

export default class UserFormPage {
    constructor() {
        this.modal = null;
        this.id = null;
        this.width = "6xl";
        this.user = null;
        this.userId = null;
        this.fetchUrl = `/api/users/`;
        this.userForm = new UserForm();
        this.handleUpdate = null;
        this.disableClosing = false;
        this.form = this.userForm.getForm();
    }

    init() {
        this.render();
        this.form = $("#form-wrapper form");
        this.handleImageUpload();
    }

    makeTop() {
        return ``;
    }
    makeContent() {
        return `
        <div id="form-wrapper" class="py-8">
            ${this.form.prop("outerHTML")}
        </div>
        `;
    }
    makeAction() {
        return `
        <div id="form-actions" style="display: none;" class="absolute bottom-0 left-0  py-4 flex gap-4 px-8 justify-end w-full">
            <button data-action="save" type="button" class="btn btn-primary" id="btn_save_user">Save</button>
            <button data-action="cancel" type="button" class="btn btn-ghost hover:bg-red-400" id="btn_cancel_user">Cancel</button>
        </div>
    `;
    }

    fetchUser(id) {
        return new Promise((resolve, reject) => {
            ajaxRequest.get({
                url: this.fetchUrl + id,
                onSuccess: (response) => {
                    this.user = response;
                    resolve(response);
                },
                onError: (error) => {
                    console.log(error);
                    reject(error);
                },
            });
        });
    }

    submitForm() {
        $(".text-error").text("");
        return new Promise((resolve, reject) => {
            this.validate();
            if (!this.form.valid()) {
                Swal.fire({
                    title: "Input Error",
                    text: "Form Invalid! Please fill in all required fields",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
                reject();
                return;
            }
            const formData = new FormData(this.form[0]);
            console.log(formData);
            let address = [
                formData.get("address_1"),
                formData.get("address_2"),
                formData.get("city"),
                formData.get("province"),
                formData.get("country"),
            ].join(",");
            formData.set("address", address);

            ajaxRequest.post({
                url: `${this.fetchUrl}${this.userId ? this.userId : ""}`,
                data: formData,
                onSuccess: (response) => {
                    $("#form-actions").hide();
                    this.user = response;
                    try {
                        this.populateForm();
                    } catch (e) {}
                    resolve(response);
                },
                onError: (response) => {
                    // if 422
                    if (response.status == 422) {
                        Swal.fire({
                            title: "Input Error",
                            text: response.responseJSON.message,
                            icon: "error",
                            confirmButtonText: "Ok",
                        });
                    }
                    this.handleInvalidInput(response.responseJSON.errors);
                    reject(response);
                },
            });
        });
    }

    handleImageUpload() {
        // if an image is inputted in the input-image, preview it in profile-image
        const inputImage = this.form.find("#input-image");
        const profileImage = this.form.find("#profile-image");
        inputImage.change(() => {
            const file = inputImage[0].files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImage.attr("src", e.target.result);
            };
            reader.readAsDataURL(file);
        });
    }

    handleInvalidInput(errors) {
        if (!errors) return;

        Object.keys(errors).map((e) => {
            const errorId = this.form.find(`[data-error-id="${e}"]`);
            errorId.text(errors[e]);
        });
    }
    validate() {
        const requiredFields = [
            "first_name",
            "last_name",
            "username",
            "email",
            "phone_number",
            "address_1",
            "address_2",
            "city",
            "province",
            "country",
            "zip_code",
            "birthdate",
        ];

        const rules = requiredFields.reduce((acc, field) => {
            acc[field] = {
                required: true,
            };

            if (field == "email") {
                acc[field].email = true;
            }

            if (field == "username") {
                acc[field].minlength = 3;
                acc[field].maxlength = 25;
                acc[field].pattern = /^[a-zA-Z0-9_]+$/;
            }

            return acc;
        }, {});

        const messages = requiredFields.reduce((acc, field) => {
            acc[field] = {
                required: "This field is required!",
            };

            if (field == "email") {
                acc[field].email = "Email is invalid";
            }

            if (field == "username") {
                acc[field].minlength = "Username must be at least 3 characters";
                acc[field].maxlength = "Username must be at most 25 characters";
                acc[field].pattern =
                    "Username must contain only letters, numbers, or underscores";
            }

            return acc;
        }, {});
        console.log({
            rules: rules,
            messages: messages,
        });
        this.form.validate({
            rules: rules,
            messages: messages,
            errorElement: "p",
            errorPlacement: function (error, element) {
                error.addClass("text-error text-xs italic my-1");
                error.insertAfter(element);
            },
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
            destroyOnClose: true,
            disableClosing: this.disableClosing,
        });
    }
}
