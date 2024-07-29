import { debounce } from "../assets/debounce.js";
export default class SideBar {
  constructor({ target, links = [], onClick = () => {} }) {
    /*
        link = [
            { text: 'Home', url: '/', icon: 'fas fa-home',  isActive: true },
        ]
         */

    this.links = links;
    this.target = target;
    this.onClick = onClick;
    this.currentUrl = (links.length > 0 && links[0].url) || null;
    this.render();
  }

  getLink(url) {
    return $(this.target).find(`.sidebar-link[data-url="${url}"]`) || false;
  }
  getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    let queries = {};
    for (let [key, value] of urlParams) {
      queries[key] = value;
    }
    return queries;
  }

  pushUrlParams({ key, value }) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(key, value);
    window.history.pushState({}, "", "?" + urlParams.toString());
  }

  setActiveLink(url) {
    $(this.target).find(".sidebar-link").removeClass("active-sidebar-link");
    $(this.target).find(`.sidebar-link[data-url="${url}"]`).addClass("active-sidebar-link");
  }

  handleClick() {
    $(this.target)
      .find(".sidebar-link")
      .on("click", e => {
        this.currentUrl = $(e.currentTarget).data("url");

        this.pushUrlParams({ key: "nav", value: this.currentUrl });

        this.setActiveLink(this.currentUrl);
        const goToPage = debounce(() => {
          this.onClick(this.currentUrl);
        }, 100);
        goToPage();
      });
  }

  createLink({ icon, text, url = "#", isActive = false, type = "link" }) {
    if (type == "link" && !text) return /* HTML */ ``;
    if (isActive) this.currentUrl = url;

    const link = /* HTML */ `
      <button class="sidebar-link ${isActive && "active-sidebar-link"}" role="button" data-url="${url}">
        <i class="${icon}"></i>
        <span class="hidden lg:block"> ${text}</span>
      </button>
    `;

    const separator = /* HTML */ ` <div class="divider m-0"></div> `;
    return type === "separator" ? separator : link;
  }

  render() {
    const HTML = /* HTML */ ` <div id="sidebar" class="container px-2 flex flex-col space-y-4 lg:min-w-xl">${this.links.map(this.createLink.bind(this)).join("\n")}</div> `;

    $(this.target).html(HTML);
    this.handleClick();

    const nav = this.getUrlParams()?.nav;
    if (nav && this.links.map(link => link.url).includes(nav)) {
      this.currentUrl = nav;
      // window.history.pushState({}, "", "?" + "nav=" + nav);
    }
    this.setActiveLink(this.currentUrl);
    this.onClick(this.currentUrl); // click the page
  }
}
