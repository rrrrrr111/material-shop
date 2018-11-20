import {createReducer} from "app/utils/functionUtil";


export const SHOW_NOTIFY = 'SHOW_NOTIFY';
export const CLOSE_NOTIFY = 'CLOSE_NOTIFY';

export const notifyReducer = createReducer(
    {
        text: "",
        show: false,
    }, {
        [SHOW_NOTIFY]: (state, value) => {
            return {text: value, show: true};
        },
        [CLOSE_NOTIFY]: () => {
            return {text: "", show: false};
        }
    });