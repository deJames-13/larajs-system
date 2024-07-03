export default class MainPage {
    constructor() {
        this.target = '#dashboard-content';
        this.render();
        return this;
    }

    static init() {
        const instance = new MainPage();
        return instance
    }

    render() {
        const HTML = `
        <div class="rounded-t-lg overflow-clip">
            <div class="custom-circle-border bottom-pattern p-10">

                <h1 class="text-5xl">HATDOG</h1>
                <h1 class="text-5xl">HATDOG</h1>
                <h1 class="text-5xl">HATDOG</h1>
                <h1 class="text-5xl">HATDOG</h1>
                <h1 class="text-5xl">HATDOG</h1>
                <h1 class="text-5xl">HATDOG</h1>
                <h1 class="text-5xl">HATDOG</h1>
                
            </div>
        </div>
        `;
        $(this.target).html(HTML);
    }
}