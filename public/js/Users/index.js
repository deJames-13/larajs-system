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
        this.fetchUser().then(() => {
            console.log(this.user);
            if (!this.user) return;
            this.checkStatus();
            this.checkInfo();
            return this.getUser();
        });
    }

    getUser() {
        return this.user;
    }

    handleResponse(response) {
        this.user = response;
        const imgSrc =
            (this.user.images &&
                this.user.images.length > 0 &&
                this.user.images[0].path) ||
            "https://via.placeholder.com/150";
        $("#profile-image").attr("src", imgSrc);
    }

    hanndleError(error) {
        // 401
        if (error.status === 401) return reject(error);
        console.error("Failed to fetch user data:", error);
        return reject(error);
    }

    fetchUser() {
        return new Promise((resolve, reject) => {
            ajaxRequest.get({
                url: "/api/profile",
                onSuccess: (response) =>
                    this.handleResponse(response) && resolve(response),
                onError: (error) => this.hanndleError(error) && reject(error),
            });
        });
    }

    activateAccount() {
        ajaxRequest.put({
            url: "/api/profile/status/" + this.user.id,
            data: { status: "active" },
            onSuccess: (response) => {
                this.user.status = "active";
                Swal.fire({
                    title: "Account Activated",
                    text: "Your account is now active.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            },
            onError: (error) => {
                console.error("Failed to activate account:", error);
                Swal.fire({
                    title: "Failed to Activate Account",
                    text: "Failed to activate account. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK",
                }).then(() => {
                    this.logout();
                });
            },
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
            cancelButtonText: "Logout",
        }).then((result) => {
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
            console.log(this.user.id);
            const onboarding = new Onboarding({
                userId: this.user.id,
                onUpdate: () => this.init(),
            }).init();
        }
    }
}
