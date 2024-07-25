import FormModal from "../layouts/FormModal.js";

const defaultProps = {
  name: "view-brand",
  id: "view-brand-modal",
  title: "View Brand",
  destroyOnClose: true,
  isShown: true,
  width: "3xl",
  isShowActions: false,
  data: {}
};

export default class ViewBrand extends FormModal {
  constructor(props = {}) {
    super({ ...defaultProps, ...props });
  }

  makeContent() {
    console.log(this.data);
    const brand = this.data;
    const image = (brand.images.length && brand.images[0].path) || "https://via.placeholder.com/150"; // Use brand.logo instead of images
    return /*HTML*/ `
        <div class="py-4 flex flex-col gap-8 mx-auto">
            <div class="flex p-4 gap-4 border shadow-xl rounded-lg">
                <!-- Logo -->
                <div class="avatar p-4">
                <div class="ring-primary ring-offset-base-100 w-48 rounded-full ring ring-offset-2">
                    <img src="${image}" alt="${brand.name}" />
                </div>
                </div>

                <div class="py-8 flex flex-col flex-grow pr-8 gap-1">
                <!-- Brand ID -->
                <div class="flex justify-between gap-4 items-center">
                    <label class="font-bold">Brand ID:</label>
                    <span>${brand.id}</span>
                </div>

                <!-- Brand Name -->
                <div class="flex justify-between gap-4 items-center">
                    <label class="font-bold">Name:</label>
                    <span>${brand.name}</span>
                </div>

                <!-- Company -->
                <div class="flex justify-between gap-4 items-center">
                    <label class="font-bold">Company:</label>
                    <span>${brand.company}</span>
                </div>

                <!-- Status -->
                <div class="flex justify-between gap-4 items-center">
                    <label class="font-bold">Status:</label>
                    <span>${brand.status}</span>
                </div>
                </div>
            </div>

            <div class="divider m-0"></div>

            <h3 class="text-xl font-bold m-0">Brand Details</h3>
            <div class="flex gap-4 px-8 border p-4 rounded-lg">
                <div class="flex flex-col flex-grow gap-4">
                <!-- Website -->
                <div class="flex flex-col gap-2">
                    <label class="font-bold">Description:</label>
                    <span>${brand.website || "No website available"}</span>
                </div>
                <!-- Description -->
                <div class="flex flex-col gap-2">
                    <label class="font-bold">Description:</label>
                    <span>${brand.description || "No description available"}</span>
                </div>
                <!-- Created At -->
                    <div class="flex flex-col gap-2">
                    <label class="font-bold">Created At:</label>
                    <span>${brand.created_at || "No information available"}</span>
                    </div>

                <!-- Updated At -->
                    <div class="flex flex-col gap-2">
                    <label class="font-bold">Updated At:</label>
                    <span>${brand.updated_at || "No information available"}</span>
                    </div>

                </div>
            </div>
        </div>

        `;
  }
}
