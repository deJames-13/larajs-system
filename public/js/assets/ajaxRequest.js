
// LOADING SPINNER
const showLoading = () => $('#loading').show();
const hideLoading = () => $('#loading').hide();
// ##########################################################################
// HANDLERS
const handleError = (callback) => (response, status, xhr) => {
    hideLoading();
    callback(response, status, xhr);
    console.error('Error:', response);
};

const handleSuccess = (callback) => (response, status, xhr) => {
    hideLoading();
    callback(response, status, xhr);
}
// ##########################################################################
// HEADER
const getHeaders = (token, headers = {}) => {
    let defaultHeaders = {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    };
    if (token) {
        defaultHeaders['Authorization'] = 'Bearer ' + token;
    }
    return { ...defaultHeaders, ...headers };
};
// ##########################################################################
// AJAX CALL
const ajaxCall = ({ url, method, data = {}, token = null, onSuccess, onError, headers = {}, settings = {} }) => {
    showLoading();

    const defaultSettings = {
        async: true,
        crossDomain: true,
        url: url,
        method: method,
        // data: method === 'GET' ? data : JSON.stringify(data),
        // contentType: method === 'GET' ? undefined : 'application/json',
        data: data,
        contentType: method === 'GET' ? undefined : false,
        processData: false,
        dataType: 'json',
        headers: getHeaders(token, headers),
        error: handleError(onError),
        success: handleSuccess(onSuccess),
    }
    // console.log({ ...defaultSettings, ...settings });
    $.ajax({ ...defaultSettings, ...settings });
};
// ##########################################################################
// AJAX REQUEST
const ajaxRequest = {
    get: (options) => {
        ajaxCall({ ...options, method: 'GET' });
    },
    post: (options) => {
        ajaxCall({ ...options, method: 'POST' });
    },
    put: (options) => {
        ajaxCall({ ...options, method: 'PUT' });
    },
    delete: (options) => {
        ajaxCall({ ...options, method: 'DELETE' });
    },
    init: () => {
        $(document).ajaxStart(showLoading).ajaxStop(hideLoading);
    }
}
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