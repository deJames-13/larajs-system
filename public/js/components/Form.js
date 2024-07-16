import FloatingInput from "./FloatingInput.js";
export default class FormCard {
  constructor({ fields = {}, className = "" }) {
    this.fields = fields;
    this.form = null;
    this.className = className;

    this.render();
    return this;
  }

  getForm() {
    return this.form;
  }

  getFields() {
    return this.fields;
  }

  makeFloatingInput(item) {
    const input = $(FloatingInput.make(item));
    if (item.value !== null) {
      input.find("input").val(item.value);
    }
    return input.prop("outerHTML");
  }

  makeField(item) {
    return /* HTML */ `
      <div class="form-control">
        <label class="input-group input-group-md">
          <span class="text-sm text-gray-500">${item.label}</span>
          <input type="${item.type}" id="${item.id}" name="${item.id}" class="input input-bordered input-sm ${item.className}" ${item.isEnable ? "" : "disabled"} />
        </label>
      </div>
    `;
  }

  makeForm() {
    const fields = this.getFields();

    const formFields = Object.keys(fields).map(key => {
      const field = fields[key];
      const wrap = $('<div class="grid xl:grid-cols-4 gap-4"></div>');

      return wrap
        .html(
          field.map(item => {
            if (item.type === "text" || item.type === "email") {
              return this.makeFloatingInput(item);
            } else {
              return this.makeField(item);
            }
          })
        )
        .prop("outerHTML");
    });

    return `

		<form action="#" id="form-card" class="h-full px-4 py-8 rounded-lg bg-base-100 border flex flex-col justify-center ">

			<!--USER INFO -->
			<div class="">
				<div class="w-full text-black flex flex-col justify-center space-y-8">
                    ${formFields.join("")}
			    </div>
			</div>

		</form>

        `;
  }

  render() {
    this.form = $(this.makeForm());
    this.form.addClass(this.className);
    return this;
  }
}
