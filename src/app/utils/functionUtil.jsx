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



