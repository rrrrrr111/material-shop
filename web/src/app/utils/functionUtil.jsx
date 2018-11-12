import util from "app/utils/util";

export const action = (type, value) => {
    return {type: type, value: value};
};

export const createReducer = (initialState, mappingObj) => {
    return (state = initialState, action) => {
        const changeStateFunc = mappingObj[action.type];
        if (changeStateFunc !== undefined) {
            return changeStateFunc(state, action.value)
        }
        return state
    };
};

export const fetchBe = (urlTail, request) => {
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
    })
};

export const checkError = (ajaxResultJson) => {
    if (ajaxResultJson.status && ajaxResultJson.status !== '200') {
        console.log(ajaxResultJson);
        throw "Exception on server side";
    }
};


