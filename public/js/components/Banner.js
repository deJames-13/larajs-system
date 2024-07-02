export default class Banner {
    constructor({ title, subTitle = '', link = '' }) {
        this.title = title;
        this.link = link;
        this.subTitle = subTitle;
        this.render()
        return this;
    }
    static init({ title, subTitle, link }) {
        const banner = new Banner({ title, subTitle, link })
        return banner
    }


    render() {
        const HTML = `
        <div class="w-full py-16 flex items-center justify-center bg-secondary bg-opacity-20 cursor-pointer" onclick="window.location.href = '${this.link}'">
            <h1 class="font-extrabold text-2xl lg:text-5xl">
                 ${this.title}
            </h1>
            <p class="text-gray-500 text-sm lg:text-lg">
                ${this.subTitle}
            </p>
            
        </div>

        `
        $('header').after(HTML);
    }
}