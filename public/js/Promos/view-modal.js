import FormModal from "../layouts/FormModal.js";
const defaultProps = {
  name: "view-promo",
  id: "view-promo-modal",
  title: "View Product",
  destroyOnClose: true,
  isShown: true,
  width: "3xl",
  isShowActions: false,
  data: {}
};
export default class ViewPromo extends FormModal {
  constructor(props = {}) {
    super({ ...defaultProps, ...props });
  }
  makeContent() {
    console.log(this.data);
    const promo = this.data;
    const image = (promo.images.length && promo.images[0].path) || "https://via.placeholder.com/150"; // Use a placeholder if no image is provided

    return /*HTML*/ `
    <div class="py-4 flex flex-col gap-8 max-w-6xl mx-auto">
        <div class="flex p-4 gap-4 border shadow-xl rounded-lg">
            <!-- Promo Image -->
            <div class="avatar p-4">
            <div class="flex justify-center items-center p-4">
                <img src="${image}" alt="${promo.name}" class="w-48 h-48 object-cover rounded-lg border border-gray-300" />
            </div>
            </div>

            <div class="py-8 flex flex-col flex-grow pr-8 gap-1">
                <!-- Promo ID -->
                <div class="flex justify-between gap-4 items-center">
                    <label class="font-bold">Promo #:</label>
                    <span>${promo.id}</span>
                </div>

                <!-- Promo Name -->
                <div class="flex justify-between gap-4 items-center">
                    <label class="font-bold">Name:</label>
                    <span>${promo.name}</span>
                </div>

                <!-- Promo Slug -->
                <div class="flex justify-between gap-4 items-center">
                    <label class="font-bold">Slug:</label>
                    <span>${promo.slug}</span>
                </div>

                <!-- Discount -->
                <div class="flex justify-between gap-4 items-center">
                    <label class="font-bold">Discount:</label>
                    <span>${promo.discount}</span>
                </div>

                <!-- Status -->
                <div class="flex justify-between gap-4 items-center">
                    <label class="font-bold">Status:</label>
                    <span>${promo.status}</span>
                </div>
            </div>
        </div>

        <div class="divider m-0"></div>

        <h3 class="text-xl font-bold m-0">Promo Details</h3>
        <div class="flex gap-4 px-8 border p-4 rounded-lg">
            <div class="flex flex-col flex-grow gap-4">
                <!-- Description -->
                <div class="flex flex-col gap-2">
                    <label class="font-bold">Description:</label>
                    <span>${promo.description || "No description available"}</span>
                </div>

                <!-- Start Date -->
                <div class="flex flex-col gap-2">
                    <label class="font-bold">Start Date:</label>
                    <span>${promo.start_date || "No start date available"}</span>
                </div>

                <!-- End Date -->
                <div class="flex flex-col gap-2">
                    <label class="font-bold">End Date:</label>
                    <span>${promo.end_date || "No end date available"}</span>
                </div>

                <!-- Created At -->
                <div class="flex flex-col gap-2">
                    <label class="font-bold">Created At:</label>
                    <span>${promo.created_at || "No information available"}</span>
                </div>

                <!-- Updated At -->
                <div class="flex flex-col gap-2">
                    <label class="font-bold">Updated At:</label>
                    <span>${promo.updated_at || "No information available"}</span>
                </div>
                
                </div>
            </div>
        </div>
    </div>
    `;
  }
}
