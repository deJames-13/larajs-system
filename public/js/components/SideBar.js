export default class SideBar {
    constructor({ target, links = [], onClick = () => { } }) {
        /* 
        link = [
            { text: 'Home', url: '/', icon: 'fas fa-home',  isActive: true },
        ]
         */
        this.links = links;
        this.target = target;
        this.onClick = onClick;
        this.currentUrl = links.length > 0 && links[0].url || null;
        this.render();
    }

    getLink(url) {
        return $(this.target).find(`.sidebar-link[data-url="${url}"]`) || false;
    }

    setActiveLink(url) {
        $(this.target).find('.sidebar-link').removeClass('active-sidebar-link');
        $(this.target).find(`.sidebar-link[data-url="${url}"]`).addClass('active-sidebar-link');
    }

    handleClick() {
        $(this.target).find('.sidebar-link').on('click', (e) => {
            this.currentUrl = $(e.currentTarget).data('url');

            if (!(this.currentUrl === ''))
                window.history.pushState({}, '', `?page=${this.currentUrl}`);


            this.setActiveLink(this.currentUrl);
            this.onClick(this.currentUrl);
        });
    }


    createLink({ icon, text, url = '#', isActive = false, type = 'link' }) {

        if (isActive) this.currentUrl = url;


        const link = `
            <button class="sidebar-link ${isActive && 'active-sidebar-link'}" role="button" data-url="${url}" >
                <i class="${icon}"></i>
                <span class="hidden lg:block"> ${text}</span>
            </button>
        `

        const separator = `
            <div class="divider m-0"></div>
        `
        return type === 'separator' ? separator : link;

    }

    render() {
        const HTML = `
            <div id="sidebar" class="px-2 flex flex-col space-y-4">
                ${this.links.map(this.createLink.bind(this)).join('\n')}
			</div>
        `;

        $(this.target).html(HTML);
        this.handleClick();




        const page = new URLSearchParams(window.location.search).get('page') || this.currentUrl;
        if (page && this.links.map(link => link.url).includes(page)) {
            this.setActiveLink(page);
            this.onClick(page); // click the page
        }



    }


}

