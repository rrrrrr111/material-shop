package ru.rich.matshop.webapi.api.user.auth.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * Аннотация для проверки доступа пользователя к счетам нижестоящих филиалов
 */
@Target(FIELD)
@Retention(RUNTIME)
@Documented
@Constraint(validatedBy = {CurrentUserIdValidator.class})
public @interface CurrentUserId {

    String message() default "{matshop.webapi.validation.currentUserId}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
