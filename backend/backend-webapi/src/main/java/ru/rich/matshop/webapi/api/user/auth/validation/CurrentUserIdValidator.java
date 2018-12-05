package ru.rich.matshop.webapi.api.user.auth.validation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.rich.matshop.webapi.api.common.security.AuthContext;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;


public class CurrentUserIdValidator implements ConstraintValidator<CurrentUserId, Long> {
    private static final Logger log = LoggerFactory.getLogger(CurrentUserIdValidator.class);

    private CurrentUserId constraint;

    @Override
    public void initialize(CurrentUserId constraint) {
        this.constraint = constraint;
    }

    @Override
    public boolean isValid(Long userId, ConstraintValidatorContext context) {
        if (userId == null) {
            return true;
        }
        if (constraint.forAuthenticatedOnly() && !AuthContext.isAuthenticated()) {
            return true;
        }
        return checkUserId(userId);
    }

    private boolean checkUserId(Long userId) {
        Long currentUserId = AuthContext.getCurrentUserId();
        boolean valid = currentUserId.equals(userId);
        if (!valid) {
            log.warn("Access attempt to userId: {} from userId: {}", userId, currentUserId);
        }
        return valid;
    }
}