const clearComponentTimeout = function (component) {
    if (component.alertTimeout) {
        clearTimeout(component.alertTimeout);
    }
};

const notify = {

    showNotify(component, notifyStateFieldName) {
        const state = [];
        state[notifyStateFieldName] = true;
        component.setState(state);

        clearComponentTimeout(component);
        component.alertTimeout = setTimeout(
            function () {
                state[notifyStateFieldName] = false;
                component.setState(state);
            }.bind(component),
            3000
        );
    },

    closeNotify(component, notifyStateFieldName) {
        clearComponentTimeout(component);
        const state = [];
        state[notifyStateFieldName] = false;
        component.setState(state);
    },
};
export default notify;
