import FormModal from "../layouts/FormModal.js";
const defaultProps = {
  name: "view-category",
  id: "view-category-modal",
  title: "View Category",
  destroyOnClose: true,
  isShown: true,
  width: "3xl",
  isShowActions: false,
  data: {}
};
export default class ViewCategory extends FormModal {
  constructor(props = {}) {
    super({ ...defaultProps, ...props });
  }
  makeContent() {
    console.log(this.data);
    const category = this.data;
    const logo = (category.images.length && category.images[0].path) || "https://via.placeholder.com/150"; // Default placeholder for logo
    return /*HTML*/ `
        <div class="py-4 flex flex-col gap-8 max-w-5xl mx-auto">
            <div class="flex p-4 gap-4 border shadow-xl rounded-lg">
                <!-- Logo -->
                <div class="avatar p-4">
                    <div class="ring-primary ring-offset-base-100 w-48 rounded-full ring ring-offset-2">
                        <img src="${logo}" alt="${category.name} logo" class="w-full h-full object-cover" />
                    </div>
                </div>

                <div class="py-8 flex flex-col flex-grow pr-8 gap-1">
                    <!-- Category ID -->
                    <div class="flex justify-between gap-4 items-center">
                        <label class="font-bold">Category ID:</label>
                        <span>${category.id}</span>
                    </div>

                    <!-- Category Name -->
                    <div class="flex justify-between gap-4 items-center">
                        <label class="font-bold">Name:</label>
                        <span>${category.name}</span>
                    </div>

                    <!-- Slug -->
                    <div class="flex justify-between gap-4 items-center">
                        <label class="font-bold">Slug:</label>
                        <span>${category.slug}</span>
                    </div>

                    <!-- Status -->
                    <div class="flex justify-between gap-4 items-center">
                        <label class="font-bold">Status:</label>
                        <span>${category.status}</span>
                    </div>
                </div>
            </div>

            <div class="divider m-0"></div>

            <h3 class="text-xl font-bold m-0">Category Details</h3>
            <div class="flex gap-4 px-8 border p-4 rounded-lg">
                <div class="flex flex-col flex-grow gap-4">
                    <!-- Description -->
                    <div class="flex flex-col gap-2">
                        <label class="font-bold">Description:</label>
                        <span>${category.description || "No description available"}</span>
                    </div>

                    <!-- Created At -->
                    <div class="flex flex-col gap-2">
                        <label class="font-bold">Created At:</label>
                        <span>${category.created_at || "No information available"}</span>
                    </div>

                    <!-- Updated At -->
                    <div class="flex flex-col gap-2">
                        <label class="font-bold">Updated At:</label>
                        <span>${category.updated_at || "No information available"}</span>
                    </div>
                    
                    </div>
                </div>
            </div>
        </div>
        `;
  }
}
