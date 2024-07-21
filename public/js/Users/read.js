import UserFormPage from "./_formpage.js";
export default class UserView extends UserFormPage {
  constructor({ userId }) {
    super();
    this.userId = userId;
    this.id = "user_view_modal";
    this.width = "3xl";
    this.fetchUser(this.userId).then(response => {
      this.init();
    });
  }

  makeTop() {
    return /* HTML */ `<h1 class="text-2xl font-extrabold">View User #${this.userId}</h1>`;
  }
  makeContent() {
    if (!this.user) return "";
    const image = this.user.images.length > 0 ? this.user.images[0].path : "https://via.placeholder.com/150";
    const info = this.user.info || {};
    const noinfo = "No information available";
    return `
            <div class="py-4 flex flex-col gap-8 ">
                <div class="flex p-4 gap-4 border shadow-xl rounded-lg">
                   <div class="avatar p-4">
                        <div class="ring-primary ring-offset-base-100 w-48 rounded-full ring ring-offset-2">
                            <img src="${image}" alt="${this.user.username}"/>
                        </div>
                    </div>

                    <div class="py-8 flex flex-col flex-grow pr-8 gap-1">

                        <!-- USERID -->
                        <div class="flex justify-between gap-4 items-center ">
                            <label class="font-bold">User #</label>
                            <span>${this.user.id}</span>
                        </div>

                        <!-- ROLE -->
                        <div class="flex justify-between gap-4 items-center ">
                            <label class="font-bold">Role:</label>
                            <span>${this.user.role}</span>
                        </div>



                        <!-- Full Name -->
                        <div class="flex justify-between gap-4 items-center ">
                            <label class="font-bold">Name:</label>
                            <span>${this.user.fullname}</span>
                        </div>
                        <!-- USERNAME -->
                        <div class="flex justify-between gap-4 items-center ">
                            <label class="font-bold">Username:</label>
                            <span>${this.user.username}</span>
                        </div>
                        <!-- EMAIL-->
                        <div class="flex justify-between gap-4 items-center ">
                            <label class="font-bold">Email Address:</label>
                            <span>${this.user.email}</span>
                        </div>
                        <!-- Phone -->
                        <div class="flex justify-between gap-4 items-center ">
                            <label class="font-bold">Phone Number:</label>
                            <span>${info.phone_number || noinfo}</span>
                        </div>


                    </div>

                </div>
                <div class="divider m-0"></div>
                <h3 class="text-xl font-bold m-0">More Information</h3>
                <div class="flex gap-4 px-8 border p-4 rounded-lg">
                    <div class="flex flex-col flex-grow gap-4">
                        <!-- Address -->
                        <div class="flex flex-col gap-2 ">
                            <label class="font-bold">Address:</label>
                            <span>${info.address || noinfo}</span>
                        </div>
                        <!-- Birthdate -->
                        <div class="flex flex-col gap-2 ">
                            <label class="font-bold">Birthdate:</label>
                            <span>${info.birthdate || noinfo}</span>
                        </div>
                        <!-- Account Status -->
                        <div class="flex flex-col gap-2 ">
                            <label class="font-bold">Account Status:</label>
                            <span>${this.user.status || noinfo}</span>
                        </div>
                        <div class="flex flex-col gap-2 ">
                            <label class="font-bold">Created At:</label>
                            <span>${this.user.created_at || noinfo}</span>
                        </div>
                        <div class="flex flex-col gap-2 ">
                            <label class="font-bold">Modified At:</label>
                            <span>${this.user.updated_at > info.updated_at ? this.user.updated_at : info.updated_at || noinfo}</span>
                        </div>


                    </div>
                </div>



            </div>
        `;
  }
}
