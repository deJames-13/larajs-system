import ajaxRequest from "../assets/ajaxRequest.js";

const logout = () => {
  const data = new FormData();
  let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
  data.append("_token", csrfToken);

  return ajaxRequest.post({
    url: "/logout",
    data: data,
    onSuccess: () => window.location.replace("/")
  });
};

export default logout;
