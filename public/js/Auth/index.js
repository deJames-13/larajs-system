import Login from "./Login.js";
import SignUp from "./SignUp.js";



$(document).on('click', '.auth-btn', function () {
    const type = $(this).data('open-modal');
    if (type === 'login_modal') {
        new Login();
    } else if (type === 'signup_modal') {
        new SignUp();
    }
})