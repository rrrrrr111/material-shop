package ru.rich.matshop.webapi.api.common.rest;

/**
 * Ошибка прокидываемая в UI пользователя
 */
public class UserException extends RuntimeException {

    private final String userMessage;

    public UserException(String userMessage, String message) {
        super(message);
        this.userMessage = userMessage;
    }

    public UserException(String userMessage, String message, Throwable cause) {
        super(message, cause);
        this.userMessage = userMessage;
    }

    public String getUserMessage() {
        return userMessage;
    }
}
