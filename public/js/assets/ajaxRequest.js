import { hideLoading, showLoading } from "./loading.js";
// LOADING SPINNER
var isShowLoading = false;
// ##########################################################################
// HANDLERS
const defaultError = (response, status, xhr) => {
  Swal.fire({
    icon: "error",
    title: response.statusText ? response.statusText : "An error occurred!",
    text: response.responseJSON.message ? `${response.responseJSON.message}.` : "Oops... Something went wrong!"
  }).then(() => {
    window.history.back();
  });
};
const handleError = callback => (response, status, xhr) => {
  isShowLoading && hideLoading();
  callback(response, status, xhr);
};

const handleSuccess = callback => (response, status, xhr) => {
  isShowLoading && hideLoading();
  callback(response, status, xhr);
};
// ##########################################################################
// HEADER
const getHeaders = (token = null, headers = {}) => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
  token = token || document.querySelector('meta[name="api-token"]').getAttribute("content") || null;

  let defaultHeaders = {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest"
  };
  if (csrfToken) {
    defaultHeaders["X-CSRF-TOKEN"] = csrfToken;
  }
  if (token) {
    defaultHeaders["Authorization"] = "Bearer " + token;
  }
  return { ...defaultHeaders, ...headers };
};
// ##########################################################################
// AJAX CALL
const ajaxCall = ({ url, method, onSuccess = () => {}, onError = defaultError, data = {}, token = null, headers = {}, settings = {}, showLoader = true }) => {
  const isFormData = data instanceof FormData;
  isShowLoading = showLoader;
  isShowLoading && showLoading();

  const defaultSettings = {
    async: true,
    crossDomain: true,
    url: url,
    method: method,
    data: method === "GET" ? undefined : isFormData ? data : JSON.stringify(data),
    contentType: method === "GET" ? undefined : isFormData ? false : "application/json",
    processData: !isFormData,
    dataType: "json",
    headers: getHeaders(token, headers),
    error: handleError(onError),
    success: handleSuccess(onSuccess)
  };
  // console.log({ ...defaultSettings, ...settings });
  $.ajax({ ...defaultSettings, ...settings });
};
// ##########################################################################
// AJAX REQUEST
const ajaxRequest = {
  get: options => {
    ajaxCall({ ...options, method: "GET" });
  },
  post: options => {
    ajaxCall({ ...options, method: "POST" });
  },
  put: options => {
    ajaxCall({ ...options, method: "PUT" });
  },
  delete: options => {
    ajaxCall({ ...options, method: "DELETE" });
  },
  init: () => {
    $(document).ajaxStart(showLoading).ajaxStop(hideLoading);
  }
};
// ##########################################################################

export default ajaxRequest;

// import ajaxRequest from '/js/assets/ajaxRequest.js';

// // "FETCHING" Data
// ajaxRequest.get({
//     url: '/api/users',
//     onSuccess: ({ data }) => {
//         console.log(data);
//     },
//     onError: (response) => {
//         console.log(response);
//     }
// })

// // POSTING DATA
// ajaxRequest.post({
//     url: '/api/users',
//     data: { name: 'John Doe' },
//     token: 'your_api_token',
//     onSuccess: ({ data }) => {
//         console.log(data);
//     },
//     onError: (response) => {
//         console.log(response);
//     }
// });

// // UPDATING DATA
// ajaxRequest.put({
//     url: '/api/users/' + id,
//     data: { name: 'John Doe' },
//     token: 'your_api_token',
//     onSuccess: ({ data }) => {
//         console.log(data);
//     },
//     onError: (response) => {
//         console.log(response);
//     },
// });

// // DELETING DATA
// ajaxRequest.delete({
//     url: '/api/users/' + id,
//     token: 'your_api_token',
//     onSuccess: ({ data }) => {
//         console.log(data);
//     },
//     onError: (response) => {
//         console.log(response);
//     },
// });
