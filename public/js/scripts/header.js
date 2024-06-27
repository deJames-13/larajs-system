import ajaxrequest from '../assets/ajaxRequest.js';

const fetchAutoComplete = (term) => {
    return new Promise((resolve, reject) => {
        ajaxrequest.get({
            url: `/api/autocomplete?term=${term}`,
            onSuccess: (response) => {
                resolve(response);
            },
            onError: (error) => {
                console.log(error);
                reject(error);
            },
            // showLoader: false,
        });
    });
}

const searchSuggestion = async (term) => {
    console.log(term);
    try {
        const data = await fetchAutoComplete(term);
        console.log(data);
        return data || [];
    } catch (error) {
        console.error("Failed to fetch autocomplete data:", error);
        return [];
    }
}


$(document).ready(function () {
    $('#search-input').autocomplete({
        source: function (request, response) {
            searchSuggestion(request.term).then(data => {
                response(data);
            }).catch(error => {
                console.error("Error fetching autocomplete suggestions:", error);
                response([]);
            });
        },
        delay: 500,
        minLength: 3,
    }).data('ui-autocomplete')._renderItem = function (ul, item) {
        item.label = item.label.length > 50 ? item.label.substring(0, 50) + '...' : item.label;

        switch (item.type) {
            case 'category':
                item.url = `/categories/${item.id}`;
                break;
            default:
                item.url = `/${item.type}s/${item.id}`;
                break;
        }

        return $('<li>')
            .addClass('cursor-pointer hover:bg-primary hover:bg-opacity-10 hover:scale-105 transition-all ease-in')
            .append(`
                <a href="${item.url || '#'}" class="autocomplete-item">
                    <div class="autocomplete-label font-bold">${item.label}</div>
                    <div class="type text-xs font-light text-ellipsis uppercase">From: ${item.type}</div>
                </a>
                `)
            .appendTo(ul);
    }

})