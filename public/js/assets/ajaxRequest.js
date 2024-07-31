import { hideLoading, showLoading } from "./loading.js";
// LOADING SPINNER
var isShowLoading = false;
// ##########################################################################
// HANDLERS
const defaultError = (response, status, xhr) => {
  let message = "";
  switch (response.status) {
    case 500:
      message = "Something went wrong! Please contact the administrator.";
      break;
    case 403:
      message = "Forbidden! You don't have permission to access the requested resource.";
      break;
    case 200:
      return;

    default:
      message = response.responseJSON && response.responseJSON.message ? `${response.responseJSON.message}.` : "Oops... Something went wrong!";
      break;
  }
  Swal.fire({
    icon: "error",
    title: response.statusText ? response.statusText : "An error occurred!",
    text: message
  }).then(() => {
    Error(response);
  });
};
const handleError = callback => (response, status, xhr) => {
  isShowLoading && hideLoading();
  if (response.status == 500) return defaultError(response, status, xhr);
  callback(response, status, xhr);
};

const handleSuccess = callback => (response, status, xhr) => {
  isShowLoading && hideLoading();
  callback(response, status, xhr);
};
// ##########################################################################
// HEADER
const getHeaders = (token = null, headers = {}) => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content") || window.localStorage.getItem('csrfToken') || null;
  token = token || document.querySelector('meta[name="api-token"]').getAttribute("content")  || window.localStorage.getItem('apiToken') || null;

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
  return $.ajax({ ...defaultSettings, ...settings });
};
// ##########################################################################
// AJAX REQUEST
const ajaxRequest = {
  get: options => {
    return ajaxCall({ ...options, method: "GET" });
  },
  post: options => {
    return ajaxCall({ ...options, method: "POST" });
  },
  put: options => {
    return ajaxCall({ ...options, method: "PUT" });
  },
  delete: options => {
    return ajaxCall({ ...options, method: "DELETE" });
  },
  init: () => {
    return $(document).ajaxStart(showLoading).ajaxStop(hideLoading);
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
