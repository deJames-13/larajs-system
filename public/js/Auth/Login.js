import ajaxRequest from "../assets/ajaxRequest.js";
import Modal from "../components/Modal.js";

export default class Login {
  constructor() {
    this.modal = null;
    this.render();
    this.validate();
    return this.modal;
  }

  render() {
    this.modal = new Modal({
      id: "login_modal",
      top: `
                <div class="flex items-center space-x-2">
                <h3 class="font-extrabold uppercase text-3xl">Log In</h3>
                </div>
            `,
      content: `
            <form id="login-form" method="POST">
                <div class="form-control">
                    <label for="email" class="label">Email</label>
                    <input type="email" id="email" name="email" placeholder="example@email.com" class="input input-bordered"
                        required>
                </div>
                <div class="form-control">
                    <label for="password" class="label">Password</label>
                    <input type="password" id="password" name="password" placeholder="Password" class="input input-bordered"
                        required>
                </div>

                <div class="form-control mt-6">
                    <button type="button" id="form-submit" class="btn btn-primary">Log in</button>
                </div>

                <div class="divider"></div>
                <div class="w-full text-center">
                    Doesn't have an account? <a class="auth-btn text-blue-400 cursor-pointer text-center" data-open-modal="signup_modal">Sign up</a>
                </div>
            </form>
            `,
      destroyOnClose: true,
      isShown: true
    }).modal;

    this.modal.find("#form-submit").on("click", () => {
      this.isValid() && this.handleOnSubmit();
    });
  }

  isValid() {
    return $("#login-form").valid();
  }

  validate = () => {
    $("#login-form").validate({
      rules: {
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          rangelength: [8, 16]
        }
      },
      messages: {
        email: {
          required: "Email is required",
          email: "Email is invalid"
        },
        password: {
          required: "Password is required"
        }
      },
      errorElement: "span",
      errorPlacement: function (error, element) {
        error.addClass("input-error text-error text-red-400 text-sm italic my-1");
        element.addClass("error-border border-red-400");
        error.insertAfter(element);
      }
    });
  };

  handleError = errors => {
    // invalid credentials error message before the form
    $("#login-form").prepend(`
            <div class="text-error text-sm italic my-1">${errors}</div>
        `);
  };

  handleOnSubmit = () => {
    // remove all errors
    $(".text-error").remove();

    var formData = new FormData($("#login-form")[0]);
    ajaxRequest.post({
      url: "/login",
      data: formData,
      onSuccess: response => {
        const user = response.user ?? null;
        const csrfToken = response.csrfToken || null ;
        const apiToken = response.apiToken || null;

        console.log(csrfToken, apiToken);

        if (csrfToken) window.localStorage.setItem('csrfToken', csrfToken);
        if (apiToken) window.localStorage.setItem('apiToken', apiToken);
        this.modal.remove();
        if (user.role === "admin") {
          window.location.href = "/dashboard";
          return;
        }
        window.location.href = "/";
      },
      onError: xhr => {
        // console.log(xhr);2
        if (xhr.status === 422) {
          this.handleError(xhr.responseJSON.message);
        }
      }
    });
  };
}
