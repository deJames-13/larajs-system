// import ajaxRequest from "../assets/ajaxRequest.js";
import UserFormPage from "./_formpage.js";
export default class UserEdit extends UserFormPage {
  constructor({ userId, onUpdate = () => {} }) {
    super();
    this.userId = userId;
    this.id = "user_edit_modal";
    this.onUpdate = onUpdate;
  }

  init() {
    super.init();
    this.fetchUser(this.userId).then(response => {
      this.populateForm(response);
    });
    this.handleUpdate = this.onUpdate;
    this.bindAction();
  }

  makeTop() {
    return /* HTML */ `<h1 class="text-2xl font-extrabold">Edit User #${this.userId}</h1>`;
  }
  bindAction() {
    $(this.form).change(() => {
      $("#form-actions").show();
    });
    $("#form-actions button").click(e => {
      const action = $(e.target).data("action");
      if (action === "save") {
        this.onSubmit();
      } else {
        this.onCancel();
      }
    });
  }

  onSubmit() {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to save changes on this user's information.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save"
    }).then(result => {
      if (result.isConfirmed) this.handleSubmit();
    });
  }

  handleSubmit() {
    this.submitForm().then(response => {
      this.handleUpdate();
      this.populateForm();
      Swal.fire("Saved!", "User information has been updated.", "success");
      $("#form-actions").hide();
    });
  }

  onCancel() {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to discard changes on this user's information.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Discard"
    }).then(result => {
      if (result.isConfirmed) {
        this.populateForm();
        $("#form-actions").hide();
      }
    });
  }

  populateForm(data) {
    // console.log(this.user);
    if (!this.user) return console.log("No user profile found");

    Object.keys(this.user).map(key => {
      this.form.find(`#${key}`).val(this.user[key]);
    });

    if (!this.user.info) return;
    if (this.user.images.length > 0) {
      this.form.find("#profile-image").attr("src", this.user.images[0].path);
    }

    Object.keys(this.user.info).map(key => {
      // so fxking dumb
      if (key === "address") {
        const arrAddr = this.user.info[key].split(",");
        const address = {
          address_1: arrAddr[0],
          address_2: arrAddr[1],
          city: arrAddr[2],
          province: arrAddr[3],
          country: arrAddr[4]
        };
        Object.keys(address).map(addr => {
          this.form.find(`#${addr}`).val(address[addr]);
        });
      }

      if (key === "birthdate") this.form.find(`#${key}`).val(this.user.info[key].split("T")[0]);
      else this.form.find(`#${key}`).val(this.user.info[key]);
    });
  }
}
