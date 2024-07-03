import ajaxRequest from '../assets/ajaxRequest.js';
var user = null;
const showLoader = () => { $('.search-loader').show(); }
const hideLoader = () => { $('.search-loader').hide(); }


const fetchProfile = () => {
    ajaxRequest.get({
        url: '/api/profile',
        onSuccess: (response) => {
            user = response;
            $('#profile-image').attr('src', response.images && response.images.length > 0 && response.images[0].path);
        },
        onError: (error) => {
            console.log(error);
        }
    });
}

const fetchAutoComplete = (term) => {
    showLoader();
    return new Promise((resolve, reject) => {
        ajaxRequest.get({
            url: `/api/autocomplete?term=${term}`,
            onSuccess: (response) => {
                resolve(response);
                hideLoader();
            },
            onError: (error) => {
                console.log(error);
                reject(error);
                hideLoader();
            },
            showLoader: false,
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

const handleAutoComplete = () => {

    if (!$('#search-input').length) return;
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
            case 'promos':
                item.url = `/promos/${item.id}`;
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

}

$(document).ready(function () {
    if (window.location.pathname === '/login' || window.location.pathname === '/register') $('.auth-dropdown').hide();

    $("#search-button").on('click', () => {
        const search = $("#search-input").val();
        if (search) window.location.href = `/search?q=${search}`;
    });

    hideLoader();
    handleAutoComplete();
})