export default class MainPage {
  constructor() {
    this.target = "#dashboard-content";
    this.render();
    return this;
  }

  static init() {
    const instance = new MainPage();
    return instance;
  }

  render() {
    const HTML = /* HTML */ `
      <div class="rounded-t-lg overflow-clip">
        <div class="custom-circle-border bottom-pattern p-10 relative">
          <div class="textcontainer relative z-10">
            <h1>Welcome to</h1>
            <h2>GlitzVogue!</h2>
            <p>Where we cater to individuals regardless of gender to suffice your needs and wants in terms of cosmetic products</p>
          </div>
        </div>
      </div>
    `;
    $(this.target).html(HTML);
  }
}
