export default class Pagination {
  constructor(pagination, current_page = 1) {
    this.links = {
      url: pagination.first.split("?")[0].replace("api/", "")
    };

    Object.keys(pagination).forEach(key => {
      let page = null;
      let url = pagination[key] !== null && new URL(pagination[key]);
      if (url) {
        page = parseInt(url.searchParams.get("page"));
      }
      this.links[key] = page;
    });
    this.links.current = current_page ? parseInt(current_page) : 1;
    this.before = parseInt(this.links.current) - 1;
    this.after = parseInt(this.links.current) + 1;

    return this;
  }

  onClick(callback) {
    $(".page-btn").on("click", function (e) {
      e.preventDefault();
      const page = $(this).data("page");
      callback(page);
      // console.log(page);
    });
  }

  render(parent) {
    const HTML = /* HTML */ `
      <div class="join">
        ${this.links.current !== this.links.first
          ? /* HTML */ `
              <button data-page="${this.links.prev}" id="page-prev" class="page-btn join-item btn btn-sm">«</button>
              <button data-page="${this.links.first}" id="page-first" class="page-btn join-item btn btn-sm">${this.links.first}</button>

              ${this.before > this.links.first
                ? /* HTML */ ` <button data-page="${this.before}" id="page-before" class="page-btn join-item btn btn-sm">${this.before}</button> `
                : ""}
            `
          : ""}

        <button data-page="${this.links.current}" id="page-current" class="page-btn join-item btn btn-sm btn-primary btn-disabled">${this.links.current}</button>

        ${this.links.current < this.links.last && this.links.current !== this.after
          ? /* HTML */ `
              ${this.after < this.links.last
                ? `
                <button data-page='${this.after}' id="page-after" class="page-btn join-item btn btn-sm">${this.after}</button>
                `
                : ""}

              <button data-page="${this.links.last}" id="page-last" class="page-btn join-item btn btn-sm">${this.links.last}</button>
              <button data-page="${this.links.next}" id="page-next" class="page-btn join-item btn btn-sm">»</button>
            `
          : ""}
      </div>
    `;
    $(`${parent} `).html(HTML);
    return this;
  }
}
