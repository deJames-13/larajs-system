const defaultProps = {
    id: 'my_modal_1',
    top: `<h3 class="font-bold text-lg">Hello!</h3>`,
    content: `<p class="py-4">Press ESC key or click the button below to close</p>`,
    action: ``,
    backDropExit: false,

}

export default class Modal {
    constructor(props = {}) {
        Object.assign(this, defaultProps, props);

        this.modal = null;
        this.render();
        this.init();
        return this.modal;

    }
    init() {
        this.modal = $(`#${this.id}`);

        $(`[data-open-modal="${this.id}"]`).on('click', () => {
            this.open();
        });
        this.modal.find('[data-close-modal]').click('click', () => {
            this.close();
        });
        this.backDropExit && this.modal.find('[data-modal-backdrop]').click('click', () => {
            this.close();
        });
    }

    open() {
        this.modal.show();
    }

    close() {
        this.modal.fadeOut();
    }


    render() {
        const modal = `
        <div id="${this.id}"  style="display: none;" class="z-[100] fixed w-screen h-screen top-0 left-0 flex items-center">

            <div id="modal-backdrop" data-modal-backdrop class="fixed w-screen h-screen bg-black bg-opacity-35"></div>

            <div class="container max-w-sm  mx-auto modal-box border animate__animated animate__bounceInDown ">
                <div class="flex justify-between align-center">
                    ${this.top}
                    <button class="modal-header btn btn-xs rounded-full hover:bg-red-400 hover:text-white btn-ghost" id="close-modal" data-close-modal>&times;</button>
                </div>
                <div class="divider m-0"></div>
                <div class="modal-body">
                    ${this.content}
                </div>
                <div class="modal-action">
                    ${this.action}
                </div>
            </div>
        </div>
        `;

        $('#app').prepend(modal);



    }

}