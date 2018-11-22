package ru.rich.matshop.webapi.api.user.auth.validation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.rich.matshop.webapi.api.common.security.AuthContext;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;


public class CurrentUserIdValidator implements ConstraintValidator<CurrentUserId, Long> {
    private static final Logger log = LoggerFactory.getLogger(CurrentUserIdValidator.class);

    @Override
    public void initialize(CurrentUserId constraintAnnotation) {
    }

    @Override
    public boolean isValid(Long userId, ConstraintValidatorContext context) {
        return checkUserId(userId);
    }

    private static boolean checkUserId(Long userId) {
        if (userId == null) {
            return false;
        }
        Long currentUserId = AuthContext.getCurrentUserId();
        boolean valid = currentUserId.equals(userId);
        if (!valid) {
            log.warn("Access attempt to userId: {} from userId: {}", userId, currentUserId);
        }
        return valid;
    }
}