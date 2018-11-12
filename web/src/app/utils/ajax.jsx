import util from "app/utils/util";

const checkError = (ajaxResponse) => {
    if (ajaxResponse.status && ajaxResponse.status !== '200') {
        console.log(ajaxResponse);
        throw "Exception on server side";
    }
};

const fetchBe = (urlTail, request) => {
    return fetch(util.link.beApi(urlTail), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-csrf-token': 0
        },
        method: "POST",
        body: JSON.stringify(request)
    }).then(function (response) {
        return response.json();
    }).then(function (json) {
        checkError(json);
        return json;
    })
};
const ajax = {
    fetchBe: fetchBe,
};
export default ajax;
