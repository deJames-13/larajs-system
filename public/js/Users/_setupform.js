import UserEdit from "./edit.js";
const defaultProps = {};

export default class SetupForm extends UserEdit {
    constructor(props = {}) {
        super(props);
        Object.assign(this, defaultProps, props);
        this.init();
    }

    init() {}
    render() {}
}
