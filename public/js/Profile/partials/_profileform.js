import ajaxRequest from '../../assets/ajaxRequest.js';
import FormCard from '../../components/Form.js';

export default class ProfileForm extends FormCard {
    constructor() {
        super({});
        this.setFields();
        this.render();
        this.form.prepend(this.additionalFields());
        this.bindEvents();

        this.user_profile = null;
        this.getProfile();


        return this;

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
						<img src="https://placehold.co/600x400?text=Profile" alt="profile-image">
					</div>
				</div>
			</div>

			<div class="flex p-4 justify-center space-x-2">
				<input id="profile-image" type="file" accept="image/*"
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
    getProfile() {
        ajaxRequest.get({
            url: '/api/profile',
            onSuccess: (response) => {
                this.user_profile = response;
                this.populateForm();
            },
            onError: (response) => {
                console.log(response);
            }

        })
    }

    saveForm() {
        const formData = new FormData(this.form[0]);
        ajaxRequest.put({
            url: '/api/users/' + id,
            data: formData,
            onSuccess: ({ data }) => {
                console.log(data);
            },
            onError: (response) => {
                console.log(response);
            },
        })
    }

    cancelSubmit() { }




}