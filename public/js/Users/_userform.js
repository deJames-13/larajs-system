import FormCard from '../components/Form.js';
export default class UserForm extends FormCard {
    constructor() {
        super({});
        this.setFields();
        this.render();
        this.form.prepend(this.additionalFields());

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
					class="max-w-sm file-input file-input-bordered file-input-primary" name="images[]">
			</div>
        `
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

}
