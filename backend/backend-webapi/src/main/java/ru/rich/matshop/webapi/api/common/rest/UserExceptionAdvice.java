package ru.rich.matshop.webapi.api.common.rest;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class UserExceptionAdvice extends AbstractRestController {

    @ExceptionHandler(UserException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public UserExceptionResponse handle(UserException ex) {
        log.warn("Exception on request processing: {} user exception: '{}'", ex.toString(), ex.getUserMessage());

        return prepareResponse(new UserExceptionResponse(ex.getUserMessage()));
    }
}
