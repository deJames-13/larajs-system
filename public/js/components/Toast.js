export default class Toast {
  static show(message, type = "info", delay = 3000) {
    const toast = document.createElement("div");
    toast.id = "toast";
    toast.classList.add("toast", "toast-top", "toast-end", "z-[100]", "animate__animated", "animate__bounceInRight");

    const alert = document.createElement("div");
    alert.classList.add("alert", `alert-${type}`);
    alert.innerHTML = /* HTML */ `<span>${message}</span>`;

    toast.appendChild(alert);
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove("animate__bounceInRight");
      toast.classList.add("animate__bounceOutRight");
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, delay);
  }

  static success(message, delay) {
    this.show(message, "success", delay);
  }

  static error(message, delay) {
    this.show(message, "error", delay);
  }

  static warning(message, delay) {
    this.show(message, "warning", delay);
  }

  static info(message, delay) {
    this.show(message, "info", delay);
  }
}
