const defaultProps = {
    id: '',
    label: '',
    className: '',
    value: null,
    isEnabled: true,
};

export default class FloatingInput {
    constructor(props = {}) {
        Object.assign(this, defaultProps, props);


    }

    static make(props = {}) {
        const floatingInput = new FloatingInput(props);
        return floatingInput.render();
    }

    render() {
        const HTML = `
        <div name="floating-input" class="relative z-0">
            <input ${this.type && `text="${this.type}"`} id="${this.id}" name="${this.id}"
                class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                placeholder=" " ${this.value ? `value="${this.value}"` : ''}/>

            <label for="${this.id}"
                class="absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                ${this.label}
            </label>
        <p name="input-error" data-error-id="${this.id}" class="text-red-400 text-xs italic"></p>
        </div>
        `
        const input = $(HTML);
        input.addClass(this.className);
        !this.isEnabled && input.find('input').attr('disabled', 'disabled');


        return input.prop('outerHTML');

    }
}