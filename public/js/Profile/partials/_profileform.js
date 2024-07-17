import ajaxRequest from "../../assets/ajaxRequest.js";
import logout from "../../Auth/logout.js";
import FormCard from "../../components/Form.js";

export default class ProfileForm extends FormCard {
  constructor({ onUpdate = () => {} }) {
    super({});
    this.user_profile = null;
    this.onUpdate = onUpdate;
    this.setFields();
    this.render();
    this.handleImageUpload();
    this.additionalFields();
    this.bindEvents();
    return this;
  }

  async fetchProfile() {
    return new Promise((resolve, reject) => {
      ajaxRequest.get({
        url: "/api/profile",
        onSuccess: response => {
          this.user_profile = response;
          this.populateForm();
          resolve(this.user_profile); // Resolve the promise with the profile data
        },
        onError: response => {
          // console.log(response);
          reject(response); // Reject the promise on error
        }
      });
    });
  }

  async getProfile() {
    this.user_profile = await this.fetchProfile();
    return this.user_profile;
  }

  setFields() {
    const fields = {
      fullname: [
        {
          id: "first_name",
          label: "First Name",
          className: "col-span-2",
          type: "text"
        },
        {
          id: "last_name",
          label: "Last Name",
          className: "col-span-2",
          type: "text"
        }
      ],
      credentials: [
        {
          id: "username",
          label: "Username",
          className: "col-span-1",
          type: "text"
        },
        {
          id: "email",
          label: "Email Address",
          className: "xl:col-span-2",
          type: "email"
        },
        {
          id: "phone_number",
          label: "Phone Number",
          className: "col-span-1",
          type: "text"
        }
      ],
      address: [
        {
          id: "address_1",
          label: "House Number, Building, Street Address*",
          className: "col-span-4",
          type: "text"
        },
        {
          id: "address_2",
          label: "Village / Subdivision, Barangay *",
          className: "col-span-4",
          type: "text"
        }
      ],
      address3: [
        {
          id: "city",
          label: "City / Municipality*",
          className: "col-span-1",
          type: "text"
        },
        {
          id: "province",
          label: "Province*",
          className: "col-span-1",
          type: "text"
        },
        {
          id: "country",
          label: "Country*",
          className: "col-span-1",
          type: "text"
        },
        {
          id: "zip_code",
          label: "Zip Code*",
          className: "col-span-1",
          type: "text"
        }
      ],
      account: [
        {
          id: "birthdate",
          label: "Birthday",
          className: "text-gray-600",
          type: "date"
        },
        {
          id: "age",
          label: "Age",
          className: "text-gray-600 border-none decoration-none",
          type: "number",
          isDisabled: true
        }
      ]
    };
    this.fields = fields;
  }

  additionalFields() {
    const user_image = `
        	<!--USER IMAGE -->
			<div class="flex justify-center">
				<div class="avatar">
					<div class="ring-primary ring-offset-base-100 w-48 rounded ring ring-offset-2">
						<img id="profile-image" src="https://placehold.co/600x400?text=Profile" alt="profile-image">
					</div>
				</div>
			</div>

			<div class="flex p-4 justify-center space-x-2">
				<input id="input-image" type="file" accept="image/*"
					class="max-w-sm file-input file-input-bordered file-input-primary" name="images[]">
			</div>
        `;

    const deactivateAccount = `
        <div class="flex justify-end items-center gap-4 my-4">
            <button type="button" id="deactivate-account" class="btn btn-secondary border border-red-400 btn-outline">Deactivate Account</button>
            <button type="button" id="delete-account" class="btn bg-red-400">Delete</button>
        </div>
        `;
    this.form.prepend(user_image);
    this.form.append(deactivateAccount);
  }

  populateForm() {
    if (!this.user_profile) return console.log("No user profile found");

    Object.keys(this.user_profile).map(key => {
      this.form.find(`#${key}`).val(this.user_profile[key]);
    });

    if (!this.user_profile.info) return;
    if (this.user_profile.images.length > 0) {
      this.form.find("#profile-image").attr("src", this.user_profile.images[0].path);
    }

    Object.keys(this.user_profile.info).map(key => {
      // so fxking dumb
      if (key === "address") {
        const arrAddr = this.user_profile.info[key].split(",");
        const address = {
          address_1: arrAddr[0],
          address_2: arrAddr[1],
          city: arrAddr[2],
          province: arrAddr[3],
          country: arrAddr[4]
        };
        Object.keys(address).map(addr => {
          this.form.find(`#${addr}`).val(address[addr]);
        });
      }

      if (key === "birthdate") {
        this.form.find(`#${key}`).val(this.user_profile.info[key] ? this.user_profile.info[key].split("T")[0] : "");
      } else {
        this.form.find(`#${key}`).val(this.user_profile.info[key]);
      }
    });
  }

  bindEvents() {
    // On Save
    this.form.submit(e => {
      e.preventDefault();
      this.saveForm();
    });

    // onDeactivate
    $(document).on("click", "#deactivate-account", this.onDeactivate.bind(this));
    $(document).on("click", "#delete-account", this.onDelete.bind(this));
  }

  onDeactivate() {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to deactivate your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009485",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, deactivate it!"
    }).then(result => {
      if (result.isConfirmed) {
        this.handleDeactivate();
      }
    });
  }
  onDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009485",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.isConfirmed) {
        this.handleDelete();
      }
    });
  }

  handleDelete() {
    ajaxRequest.post({
      url: "/api/profile/delete/" + this.user_profile.id,
      onSuccess: response => {
        console.log(response);
        Swal.fire({
          title: "Account deleted!",
          text: "Returning to homepage...",
          icon: "info"
        }).then(() => {
          logout().then(() => {
            window.location.href = "/";
          });
        });
      },
      onError: response => {
        console.log(response);
      }
    });
  }
  handleDeactivate() {
    ajaxRequest.post({
      url: "/api/profile/status/" + this.user_profile.id,
      data: { status: "inactive" },
      onSuccess: response => {
        console.log(response);
        Swal.fire({
          title: "Account deactivated!",
          text: "Returning to homepage...",
          icon: "info"
        }).then(() => {
          logout().then(() => {
            window.location.href = "/";
          });
        });
      },
      onError: response => {
        console.log(response);
      }
    });
  }

  confirmWithPassword() {
    Swal.fire({
      title: "Enter your password",
      input: "password",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      preConfirm: password => {
        return new Promise((resolve, reject) => {
          ajaxRequest.post({
            url: "/api/confirm-password",
            data: { password },
            onSuccess: response => {
              console.log(response);
              resolve(response);
            },
            onError: response => {
              console.log(response);
              Swal.showValidationMessage("Error: Password confirmation failed");
              reject();
            }
          });
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      if (result.isConfirmed) {
        this.submitForm();
      }
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

  onSubmit() {
    this.validate();
    // console.log(this.form.valid());
    if (!this.form.valid()) return;
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to update your profile",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009485",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, update it!"
    }).then(result => {
      if (result.isConfirmed) {
        this.confirmWithPassword();
      }
    });
  }

  validate() {
    const requiredFields = ["first_name", "last_name", "username", "email", "phone_number", "address_1", "address_2", "city", "province", "country", "zip_code", "birthdate"];

    const rules = requiredFields.reduce((acc, field) => {
      acc[field] = {
        required: true
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
        required: "This field is required!"
      };

      if (field == "email") {
        acc[field].email = "Email is invalid";
      }

      if (field == "username") {
        acc[field].minlength = "Username must be at least 3 characters";
        acc[field].maxlength = "Username must be at most 25 characters";
        acc[field].pattern = "Username must contain only letters, numbers, or underscores";
      }

      return acc;
    }, {});

    this.form.validate({
      rules: rules,
      messages: messages,
      errorElement: "p",
      errorPlacement: function (error, element) {
        error.addClass("text-error text-xs italic my-1");
        error.insertAfter(element);
      }
    });
  }

  handleInvalidInput(errors) {
    Object.keys(errors).map(e => {
      const errorId = this.form.find(`[data-error-id="${e}"]`);
      errorId.text(errors[e]);
    });
  }

  submitForm() {
    $("name[input-error]").text("");

    const formData = new FormData(this.form[0]);
    ajaxRequest.post({
      url: "/api/profile/" + this.user_profile.id,
      data: formData,
      onSuccess: response => {
        this.user_profile = response;
        this.populateForm();
        Swal.fire("Updated!", "Your profile has been updated.", "success");
        this.onUpdate(this.user_profile);
      },
      onError: response => {
        console.log(response);
        // if 422
        if (response.status === 422) {
          this.handleInvalidInput(response.responseJSON.errors);
          return;
        }

        Swal.fire("Error!", "An error occured while updating your profile.", "error");
      }
    });
    $("#form-actions").hide();
  }

  cancelSubmit() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009485",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!"
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire("Cancelled!", "Your changes has been cancelled.", "success");
        this.populateForm();
      }
    });
    $("#form-actions").hide();
  }
}
