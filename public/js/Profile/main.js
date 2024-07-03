const defaultProps = {
    target: '#profile-content',
};
export default class MainPage {
    constructor(props = {}) {
        this.id = "main-profile-page";
        Object.assign(this, defaultProps, props);
        return this.render();
    }
    static init() {
        const instance = new MainPage();
        return instance;
    }
    render() {
        const HTML = `
        <div id="${this.id}" class="h-full p-4 flex flex-col space-y-4">
        </div>
        `;
        $(this.target).html(HTML);
        return this;
    }
}