import Carousel from "../components/Carousel.js";
import FormModal from "../layouts/FormModal.js";
import RatingsCreate from "./create.js";
import RatingsEdit from "./edit.js";

const defaultProps = {
  order_id: null,
  type: "form",
  name: "rating-form",
  id: "rating-form-modal",
  form: null,
  order: {}
};
const ratings = [
  {
    label: "Very Unsatisfied",
    value: 1
  },
  {
    label: "Unsatisfied",
    value: 2
  },
  {
    label: "Neutral",
    value: 3
  },
  {
    label: "Satisfied",
    value: 4
  },
  {
    label: "Very Satisfied",
    value: 5
  }
];
export default class RatingsForm extends FormModal {
  currentRating = 5;

  constructor(props = {}) {
    super({ ...defaultProps, ...props });
    this.currentRating = this.order.rating.rating || 5;
    this.bindEvents();
  }
  bindEvents() {
    this.modal
      .find("#back-button")
      .off()
      .on("click", () => {
        this.close();
      });
    this.modal
      .find("[data-rating-btn]")
      .off()
      .on("click", e => {
        $(this.modal).find("#save-item, #cancel").show();
        this.setRating($(e.currentTarget).data("value"));
      });
    this.modal
      .find("#is_show_user")
      .off()
      .on("change", e => {
        const isChecked = e.currentTarget.checked;
        e.target.value = isChecked;
        $(this.modal)
          .find("#rating-username")
          .text(isChecked ? `@${this.order.customer.username}` : "Anonymous");
      });

    this.setRating(this.currentRating);
  }

  setRating(rating) {
    this.currentRating = rating;
    $("[data-rating-btn]").removeClass("border-primary border-opacity-70");
    this.modal.find(`#rating-${this.currentRating}`).addClass("border-primary border-opacity-70");
    $(".rating-label").text(ratings.filter(r => r.value === this.currentRating)[0].label);
    $("#rating-input").val(this.currentRating);
  }

  handleForm() {
    const config = {
      order: this.order,
      target: "#" + this.id,
      setRating: this.setRating.bind(this),
      exit: () => {
        this.close();
      }
    };

    if (this.type === "edit") {
      $(document).ready(() => {
        new RatingsEdit(config);
      });
    } else if (this.type === "create") {
      $(document).ready(() => {
        new RatingsCreate(config);
      });
    }
  }

  makeRatingBox() {
    let HTML = "";
    ratings.map(rating => {
      HTML += /* HTML */ `
        <button
          id="rating-${rating.value}"
          data-rating-btn
          type="button"
          data-value="${rating.value}"
          data-label="${rating.label}"
          class="flex items-center justify-center btn btn-ghost p-1 rounded hover:z-[5] hover:scale-110 hover:bg-none transition-all ease-in"
        >
          <img class="w-full pointer-events-none h-full aspect-square" src="/images/ratings/${rating.value}.png" alt="${rating.value}" />
        </button>
      `;
    });
    return HTML;
  }

  makeContent() {
    const username = this.order.customer.username || "";
    return /* HTML */ `
      <form data-id="${this.order_id}" id="item-form" enctype="multipart/form-data" class="h-full flex flex-col gap-4">
        <p>How was your experience with us? <span class="px-2 rating-label font-extrabold text-primary uppercase"></span></p>
        <!-- Rating Icons -->
        <div class="shadow-xl rounded border border-primary border-opacity-50 bg-secondary bg-opacity-10 p-4 flex gap-4 items-center justify-center">
          ${this.makeRatingBox()}
          <input type="hidden" id="rating-input" name="rating" value="${this.currentRating}" />
        </div>

        <!-- Rating Icons -->
        <input type="text" id="title" name="title" placeholder="Title (optional)" class="input input-bordered input-sm rounded-none" />
        <textarea
          id="review"
          name="review"
          placeholder="Share your thoughts to help other buyers"
          class="textarea textarea-bordered w-full h-full rounded-none resize-none"
        ></textarea>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Show username on your review</span>
            <input name="is_show_user" id="is_show_user" type="checkbox" class="toggle checkbox-primary hover:checkbox-secondary" checked="checked" />
          </label>
          <span class="text-xs text-gray-400">
            Your username will be shown as
            <span class="font-bold text-primary" id="rating-username">@${username}</span>
          </span>
        </div>
        <div class="divider m-0"></div>
        <div className="flex items-center gap-2 font-bold">
          <i class="fas fa-camera"></i>
          <span class="label-text">Add Photo</span>
        </div>
        <div id="image-container" class="flex flex-col space-y-2 border-opacity-25 left image-container border-secondary ">
          <div class="flex justify-center p-4 space-x-2">
            <input
              id="image-input"
              type="file"
              multiple
              accept="image/*"
              class="max-w-[300px] flex-grow file-input file-input-bordered file-input-primary file-input-xs"
              name="images[]"
            />
          </div>
          <div>
            ${new Carousel({
              id: `${this.name.split(" ")[0]}-${this.type}`
            }).render()}
          </div>
        </div>
      </form>
    `;
  }
}
