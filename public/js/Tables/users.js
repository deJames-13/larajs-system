import UserAdd from "../Users/create.js";
import UserEdit from "../Users/edit.js";
import UserView from "../Users/read.js";
import TablePage from "./table.js";

export default class UsersPage extends TablePage {
  constructor({ target }) {
    super({
      target: target,
      tableName: "users"
    });
  }
  makeTable(data) {
    return data.map(user => {
      const image = (user.images && user.images.length > 0 && user.images[0].path) || "https://placehold.it/100x100";
      const info = user.info || {};
      const isThrashed = user.deleted_at !== null;
      return {
        ID: `${user.id}`,
        User: `
                <div class="flex items-center gap-3 w-72 text-wrap overflow-x-auto">
                    <div class="avatar">
                    <div class="mask mask-squircle h-12 w-12">
                        <img
                        src="${image}"
                        alt="user-image" />
                    </div>
                    </div>
                    <div>
                    <div class="font-bold">${user.fullname}</div>
                    <div class="text-sm opacity-70 font-bold">
                        @${user.username}
                    </div>
                    <div class="text-sm opacity-50">
                        ${user.email}
                    </div>

                     <div class="text-xs opacity-70 text-wrap">
                        <span>${info.address || "N/A"}</span>
                      </div>
                    </div>
                </div>
                `,
        "Phone Number": `${info.phone_number || "N/A"}`,
        Role: `${user.role}`,
        "Account Status": `
                <div class="badge ${this.statusColors[user.status]} gap-2">
                    ${user.status}
                </div>
                `,
        "": `
                <div name="actions" class=" ${isThrashed ? "hidden" : "flex"} actions print:hidden w-full items-center justify-end gap-3">
                      <button id="row-view__${user.id}" data-id="${user.id}" class="row-view btn btn-xs btn-primary">View</button>
                    <button id="row-edit__${user.id}" data-id="${user.id}" class="row-edit btn btn-xs bg-secondary text-white">Edit</button>
                    <button id="row-delete__${user.id}" data-id="${user.id}" class="row-delete btn btn-xs bg-red-400">Delete</button>
                </div>
                <div name="alt-action" class=" ${!isThrashed ? "hidden" : "flex"} alt-action print:hidden w-full items-center justify-end gap-3">
                    <button id="row-restore__${user.id}" data-id="${user.id}" class="row-restore btn btn-xs text-white bg-green-400">Restore</button>
                </div>
                `
      };
    });
  }

  bindEvents() {
    super.bindEvents();
    $(document)
      .off()
      .on("click", ".row-view", e => {
        const id = e.target.dataset.id;
        new UserView({ userId: id });
      })
      .on("click", ".row-edit", e => {
        const id = e.target.dataset.id;
        new UserEdit({
          userId: id,
          onUpdate: () => {
            this.init();
          }
        }).init();
      })
      .on("click", "#btn-add-" + this.tableName, () => {
        new UserAdd({
          onUpdate: () => {
            this.init();
          }
        });
      });
  }
}
