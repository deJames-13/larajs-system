import ajaxRequest from "../assets/ajaxRequest.js";
import Modal from "../components/Modal.js";

export default class SignUp {
  constructor() {
    this.modal = null;
    // if path is /register do not show modal
    this.render();
    this.validate();
    return this.modal;
  }
  render() {
    this.modal = new Modal({
      id: "signup_modal",
      top: `
                <div class="flex items-center space-x-2">
                <h3 class="font-extrabold uppercase text-3xl">Sign Up</h3>
                </div>
            `,
      content: `
            <form id="signup-form" method="POST">
                <div class="form-control">
                    <label for="username" class="label">Username</label>
                    <input type="username" id="username" name="username" placeholder="Username" class="input input-bordered"
                         >


                </div>
                <div class="form-control">
                    <label for="email" class="label">Email</label>
                    <input type="email" id="email" name="email" placeholder="example@email.com" class="input input-bordered"
                     >
                </div>

                <div class="form-control">
                    <label for="password" class="label">Password</label>
                    <input type="password" id="password" name="password" placeholder="Password" class="input input-bordered"
                        >
                </div>

                <div class="form-control">
                    <label for="password_confirmation" class="label">Confirm Password</label>
                    <input type="password" id="password_confirmation" name="password_confirmation"
                        placeholder="Password Confirmation" class="input input-bordered" >
                </div>

                <div class="form-control mt-6">
                    <button type="button" id="form-submit" class="btn btn-primary">Sign Up</button>
                </div>
                <div class="divider"></div>
                <div class="w-full text-center">
                    Already have an account? <a class="auth-btn text-blue-400 cursor-pointer text-center" data-open-modal="login_modal">Log in</a>
                </div>
            </form>
            `,
      destroyOnClose: true,
      isShown: true
    }).modal;

    $("#form-submit").on("click", () => {
      this.isValid() && this.handleOnSubmit();
    });
  }

  validate = () => {
    $("#signup-form").validate({
      rules: {
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          rangelength: [8, 16]
        },
        username: {
          required: true,
          minlength: 4,
          pattern: /^[a-zA-Z0-9_]+$/
        },
        password_confirmation: {
          required: true,
          equalTo: "#password"
        }
      },
      messages: {
        email: {
          required: "Email is required",
          email: "Email is invalid"
        },
        password: {
          required: "Password is required",
          minlength: "Password must be at least 8-16 characters"
        },
        username: {
          required: "Username is required",
          minlength: "Username must be at least 4 characters",
          pattern: "Username must contain only letters, numbers, or underscores"
        },
        password_confirmation: {
          required: "Password Confirmation is required",
          equalTo: "Password Confirmation must match Password"
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

  isValid() {
    return $("#signup-form").valid();
  }

  handleInvalid = errors => {
    Object.keys(errors).forEach(key => {
      $(`#${key}`).addClass("border-red-400");
      $(`#${key}`).after(`<span class="text-red-400 text-sm italic my-1">${errors[key]}</span>`);
    });
  };

  handleOnSubmit = () => {
    // remove all errors
    $(".input-error").removeClass("input-error");
    $(".text-error").remove();
    $(".error-border").removeClass("error-border border-red-400");

    var formData = new FormData($("#signup-form")[0]);
    // console.log(formData);
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
    ajaxRequest.post({
      url: "/register",
      data: formData,
      onSuccess: response => {
        // console.log(response);
        this.modal.remove();
        window.location.href = "/";
      },
      onError: xhr => {
        console.log(xhr);
        this.handleInvalid(xhr.responseJSON.errors || {});
      }
    });
  };
}
