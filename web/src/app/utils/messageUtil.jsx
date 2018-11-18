export const SERVER_SIDE_ERROR = "Ошибка при обращении к серверу, попробуйте позже";

export const determineUserMessage = (message) => {
    switch (message) {
        case null:
            return null;
        case "Unknown error":
            return SERVER_SIDE_ERROR;
        default:
            return message;
    }
};