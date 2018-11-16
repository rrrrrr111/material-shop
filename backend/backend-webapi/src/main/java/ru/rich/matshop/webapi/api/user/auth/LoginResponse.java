package ru.rich.matshop.webapi.api.user.auth;

import ru.rich.matshop.webapi.api.common.rest.RestResponse;

public class LoginResponse extends RestResponse {

    private String message;

    public LoginResponse() {
    }

    LoginResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "LoginResponse{" +
                "message='" + message + '\'' +
                '}';
    }
}
