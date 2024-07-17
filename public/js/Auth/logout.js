import ajaxRequest from "../assets/ajaxRequest.js";

const logout = () => {
  return new Promise((resolve, reject) => {
    const data = new FormData();
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
    data.append("_token", csrfToken);

    ajaxRequest.post({
      url: "/logout",
      data: data,
      onSuccess: response => {
        window.location.href = "/";
        resolve(response);
      },
      onError: xhr => {
        reject(xhr);
      }
    });
  });
};

export default logout;
