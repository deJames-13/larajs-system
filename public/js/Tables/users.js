import TablePage from './table.js';

export default class UsersPage extends TablePage {
    constructor({ target }) {
        super({
            target: target,
            table: 'users',
        });
    }
    static init({ target }) {
        const instance = new UsersPage({ target });
        return instance;
    }

    makeTable(data) {
        return data.map(user => {
            const image = user.images && user.images.length > 0 && user.images[0].path || 'https://placehold.it/100x100';
            const info = user.info || {};
            return {
                "ID": `${user.id}`,
                "Name": `  
                <div class="flex items-center gap-3">
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
                    </div>
                </div>
                `,
                "Phone Number": `${info.phone_number || 'N/A'}`,
                "Address": `${info.address || 'N/A'}`,
                "Role": `${user.role}`,
                "Account Status": `
                <div class="badge ${this.statusColors[user.status]} gap-2">
                    ${user.status}
                </div>
                `,
                "": `
                <div class="print:hidden w-full flex items-center justify-end gap-3">
                    <a href="/users/${user.id}" class="btn btn-xs btn-primary">View</a>
                    <a href="/admin/users/edit/${user.id}/" class="btn btn-xs btn-secondary">Edit</a>
                    <button id="row-delete__${user.id}" data-id="${user.id}" class="row-delete btn btn-xs bg-red-400">Delete</button>
                </div>
                `,
            }
        });
    }








}
