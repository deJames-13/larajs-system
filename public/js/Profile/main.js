const defaultProps = {
    target: '#profile-content',
};
export default class MainPage {
    constructor(props = {}) {
        Object.assign(this, defaultProps, props);
        return this.render();
    }
    static init() {
        const instance = new MainPage();
        return instance;
    }
    render() {
        const HTML = `
        <div id="user-card" class="h-full p-4 flex flex-col space-y-4">
            <h1 class="text-2xl font-extrabold">Status</h1>
        
        </div>
        `;
        $(this.target).html(HTML);
        return this;
    }
}