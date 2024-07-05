import ajaxRequest from '../assets/ajaxRequest.js';
import Modal from '../components/Modal.js';
export default class UserForm {
    constructor() {
        this.modal = null;
        this.id = null;
    }

    init() {
        this.render();
        this.validate();
        return this.modal;
    }

    makeTop() {
        return ``
    }
    makeContent() {
        return ``
    }
    makeAction() {
        return ``
    }
    validate() {
    }

    render() {
        this.modal = new Modal({
            id: this.id,
            isShown: true,
            width: '6xl',
            top: this.makeTop(),
            content: this.makeContent(),
            action: this.makeAction(),

        });
    }
}