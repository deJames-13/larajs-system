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
        this.render();
    }

    setActiveLink(url) {
        $(this.target).find('.sidebar-link').removeClass('active-sidebar-link');
        $(this.target).find(`.sidebar-link[data-url="${url}"]`).addClass('active-sidebar-link');
    }

    handleClick() {
        $(this.target).find('.sidebar-link').on('click', (e) => {
            const url = $(e.currentTarget).data('url');

            if (!(url === ''))
                window.history.pushState({}, '', `?page=${url}`);


            this.setActiveLink(url);
            this.onClick(url);
        });
    }


    createLink({ icon, text, url = '#', isActive = false, type = 'link' }) {


        const link = `
            <button class="sidebar-link ${isActive && 'active-sidebar-link'}" role="button" data-url="${url}" >
                <i class="${icon}"></i>
                <span> ${text}</span>
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
                ${this.links.map(this.createLink).join('\n')}
			</div>
        `;

        $(this.target).html(HTML);
        this.handleClick();

        const page = new URLSearchParams(window.location.search).get('page');
        if (page && this.links.map(link => link.url).includes(page)) {
            this.setActiveLink(page);
            this.onClick(page); // click the page
        }



    }


}

