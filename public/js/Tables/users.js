import UserAdd from "../Users/create.js";
import UserEdit from "../Users/edit.js";
import UserView from "../Users/read.js";
import TablePage from "./table.js";

export default class UsersPage extends TablePage {
  constructor({ target }) {
    super({
      target: target,
      table: "users"
    });
  }
  makeTable(data) {
    return data.map(user => {
      const image = (user.images && user.images.length > 0 && user.images[0].path) || "https://placehold.it/100x100";
      const info = user.info || {};
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
                <div class="print:hidden w-full flex items-center justify-end gap-3">
                    <button data-action="view" data-id="${user.id}"  id="action-btn" class="btn btn-xs btn-primary">View</button>
                    <button data-action="edit" data-id="${user.id}"  id="action-btn" class="btn btn-xs btn-secondary">Edit</>
                    <button id="row-delete__${user.id}" data-id="${user.id}" class="row-delete btn btn-xs bg-red-400">Delete</button>
                </div>
                `
      };
    });
  }

  bindEvents() {
    $(document).on("click", "#action-btn", e => {
      const action = $(e.target).data("action");
      const userId = $(e.target).data("id");
      if (action === "view") {
        new UserView({ userId });
      } else if (action === "edit") {
        new UserEdit({
          userId: userId,
          onUpdate: () => {
            this.dataTable.updateTable();
          }
        }).init();
      }
    });

    $("#btn-add-" + this.table)
      .off("click")
      .on("click", () => {
        new UserAdd({
          onUpdate: () => {
            this.dataTable.updateTable();
          }
        });
      });

    $("#btn-restore-" + this.table)
      .off("click")
      .on("click", () => {});
  }
}
