import Login from "./Login.js";
import SignUp from "./SignUp.js";
import logout from "./logout.js";

$(document).on("click", ".auth-btn", function () {
  if (window.location.pathname === "/login" || window.location.pathname === "/register") return;

  const type = $(this).data("open-modal");
  if (type === "login_modal") {
    $("#signup_modal").remove();
    new Login();
  } else if (type === "signup_modal") {
    $("#login_modal").remove();
    new SignUp();
  } else if (type === "logout") {
    logout();
  }
});
