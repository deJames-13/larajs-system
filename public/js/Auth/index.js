import Login from "./Login.js";
import SignUp from "./SignUp.js";


var modal = null;
$(document).on('click', '.auth-btn', function () {
    const type = $(this).data('open-modal');
    if (modal) modal.remove();
    if (type === 'login_modal') {
        if (window.location.pathname === '/login' || window.location.pathname === '/register') return;
        modal = new Login();
    } else if (type === 'signup_modal') {
        modal = new SignUp();
    }
})

