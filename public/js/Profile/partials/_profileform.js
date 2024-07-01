import ajaxRequest from '../../assets/ajaxRequest.js';
import FormCard from '../../components/Form.js';

export default class ProfileForm extends FormCard {
    constructor() {
        super({});
        this.user_profile = null;
        this.setFields();
        this.render();
        this.form.prepend(this.additionalFields());
        this.bindEvents();
        this.handleImageUpload();
        this.getProfile()

        return this;

    }

    async getProfile() {
        this.user_profile = await this.fetchProfile();
        return this.user_profile;
    }
    setFields() {
        const fields = {
            fullname: [
                { id: 'first_name', label: 'First Name', className: 'col-span-2', type: 'text' },
                { id: 'last_name', label: 'Last Name', className: 'col-span-2', type: 'text' }
            ],
            credentials: [
                { id: 'username', label: 'Username', className: 'col-span-1', type: 'text' },
                { id: 'email', label: 'Email Address', className: 'xl:col-span-2', type: 'email' },
                { id: 'phone_number', label: 'Phone Number', className: 'col-span-1', type: 'text' },
            ],
            address: [
                { id: 'address_1', label: 'House Number, Building, Street Address*', className: 'col-span-4', type: 'text' },
                { id: 'address_2', label: 'Village / Subdivision, Barangay *', className: 'col-span-4', type: 'text' },
            ],
            address3: [
                { id: 'city', label: 'City / Municipality*', className: 'col-span-1', type: 'text' },
                { id: 'province', label: 'Province*', className: 'col-span-1', type: 'text' },
                { id: 'country', label: 'Country*', className: 'col-span-1', type: 'text' },
                { id: 'zip_code', label: 'Zip Code*', className: 'col-span-1', type: 'text' },
            ],
            account: [
                { id: 'birthdate', label: 'Birthday', className: 'text-gray-600', type: 'date' },
                { id: 'age', label: 'Age', className: 'text-gray-600', type: 'text', isEnabled: false },
            ]
        }
        this.fields = fields;
    }

    additionalFields() {
        return `
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
					class="max-w-sm file-input file-input-bordered file-input-primary" name="image">
			</div>


        `
    }


    populateForm() {

        if (!this.user_profile) return console.log('No user profile found');

        Object.keys(this.user_profile).map((key) => {

            this.form.find(`#${key}`).val(this.user_profile[key]);
        });

        if (!this.user_profile.info) return;
        if (this.user_profile.images.length > 0) {
            this.form.find('#profile-image').attr('src', this.user_profile.images[0].path);
        }

        Object.keys(this.user_profile.info).map((key) => {
            // so fxking dumb
            if (key === 'address') {
                const arrAddr = this.user_profile.info[key].split(',');
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
                this.form.find(`#${key}`).val(this.user_profile[key].split('T')[0]);
            else
                this.form.find(`#${key}`).val(this.user_profile.info[key]);


        });



    }

    bindEvents() {
        // On Save
        this.form.submit((e) => {
            e.preventDefault();
            this.saveForm();
        });
    }
    async fetchProfile() {
        return new Promise((resolve, reject) => {
            ajaxRequest.get({
                url: '/api/profile',
                onSuccess: (response) => {
                    this.user_profile = response;
                    this.populateForm();
                    resolve(this.user_profile); // Resolve the promise with the profile data
                },
                onError: (response) => {
                    console.log(response);
                    reject(response); // Reject the promise on error
                }
            });
        });
    }

    confirmWithPassword() {
        Swal.fire({
            title: 'Enter your password',
            input: 'password',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: (password) => {
                return new Promise((resolve, reject) => {
                    ajaxRequest.post({
                        url: '/api/confirm-password',
                        data: { password },
                        onSuccess: (response) => {
                            console.log(response);
                            resolve();
                        },
                        onError: (response) => {
                            console.log(response);
                            Swal.showValidationMessage("Error: Password confirmation failed");
                            reject();
                        }
                    })
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                this.submitForm();
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

    onSubmit() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to update your profile",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#009485',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, update it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.confirmWithPassword();
            }
        });
    }

    submitForm() {
        const payload = {
            username: this.form.find('#username').val(),
            email: this.form.find('#email').val(),
            info: {
                first_name: this.form.find('#first_name').val(),
                last_name: this.form.find('#last_name').val(),
                phone_number: this.form.find('#phone_number').val(),
                address: `${this.form.find('#address_1').val()},${this.form.find('#address_2').val()},${this.form.find('#city').val()},${this.form.find('#province').val()},${this.form.find('#country').val()}`,
                birthdate: this.form.find('#birthdate').val(),
                zip_code: this.form.find('#zip_code').val(),
            }
        }
        // add image
        const images = this.form.find('#input-image')[0].files;

        const formData = new FormData();
        Object.keys(payload).map((key) => {
            if (key === 'info') {
                Object.keys(payload.info).map((info) => {
                    formData.append(`info[${info}]`, payload.info[info]);
                });
            } else {
                formData.append(key, payload[key]);
            }
        });
        if (images && images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                formData.append(`images[${i}]`, images[i]);
            }
        }
        console.log(formData);




        ajaxRequest.post({
            url: '/api/profile/update/' + this.user_profile.id,
            data: formData,
            onSuccess: (response) => {
                this.user_profile = response;
                this.populateForm();
                Swal.fire(
                    'Updated!',
                    'Your profile has been updated.',
                    'success'
                )
            },
            onError: (response) => {
                console.log(response);
                Swal.fire(
                    'Error!',
                    'An error occured while updating your profile.',
                    'error'
                )
            },
        })
        $('#form-actions').hide();
    }

    cancelSubmit() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#009485',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Cancelled!',
                    'Your changes has been cancelled.',
                    'success'
                )
                this.populateForm();
            }
        })
        $('#form-actions').hide();
    }




}