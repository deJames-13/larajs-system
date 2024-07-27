import logout from "../Auth/logout.js";
import ajaxRequest from "../assets/ajaxRequest.js";
import Onboarding from "./_onboarding.js";

export default class User {
  constructor() {
    this.user = null;
    this.logout = logout;
    // console.log("User class initialized");
  }

  init() {
    return this.fetchUser();
  }

  getUser() {
    return this.user;
  }

  handleResponse(response) {
    this.user = response;
    if (!this.user) return;
    this.checkStatus();
    this.checkInfo();
    window.localStorage.setItem("user", JSON.stringify(this.user));
  }

  fetchUser() {
    return ajaxRequest.get({
      url: "/api/profile",
      onSuccess: response => {
        this.handleResponse(response);
      },
      onError: error => {
        Error("Failed to fetch user data:", error);
      }
    });
  }

  activateAccount() {
    ajaxRequest.put({
      url: "/api/profile/status/" + this.user.id,
      data: { status: "active" },
      onSuccess: response => {
        this.user.status = "active";
        Swal.fire({
          title: "Account Activated",
          text: "Your account is now active.",
          icon: "success",
          confirmButtonText: "OK"
        });
      },
      onError: error => {
        console.error("Failed to activate account:", error);
        Swal.fire({
          title: "Failed to Activate Account",
          text: "Failed to activate account. Please try again.",
          icon: "error",
          confirmButtonText: "OK"
        }).then(() => {
          this.logout();
        });
      }
    });
  }

  checkStatus() {
    if (this.user.status !== "inactive") return;

    Swal.fire({
      title: "Account Inactive",
      text: "This account is deactivated. Do you want to activate it?",
      icon: "warning",
      confirmButtonText: "Activate",
      showCancelButton: true,
      cancelButtonText: "Logout"
    }).then(result => {
      if (result.isConfirmed) {
        this.activateAccount();
      } else {
        this.logout();
      }
    });
  }

  checkInfo() {
    if (!this.user) return;
    if (!this.user.info) {
      const onboarding = new Onboarding({
        userId: this.user.id,
        onUpdate: () => this.init()
      }).init();
    }
  }
}
