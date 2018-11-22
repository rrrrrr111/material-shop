package ru.rich.matshop.webapi.util;

import javax.validation.ConstraintValidatorContext;
import javax.validation.ConstraintViolation;
import java.util.Set;

/**
 * Утилитные методы Validation API
 */
public final class ValidationUtil {

    private ValidationUtil() {
    }

    /**
     * Копирует violations в context
     *
     * @param violations ошибки валидации
     * @param context    контекст валидации
     */
    public static <T> void copyToContext(Set<ConstraintViolation<T>> violations, ConstraintValidatorContext context) {
        for (ConstraintViolation<T> violation : violations) {
            addConstraintViolation(context, violation.getPropertyPath().toString(), violation);
        }
    }

    private static <T> void addConstraintViolation(ConstraintValidatorContext context, String propertyPath, ConstraintViolation<T> violation) {
        addConstraintViolation(context, propertyPath, violation.getMessageTemplate());
    }

    /**
     * Добавляет в контекст ConstraintViolation
     *
     * @param context         контекст
     * @param propertyPath    имя поля / геттера
     * @param messageTemplate шаблон сообщения
     */
    public static void addConstraintViolation(ConstraintValidatorContext context, String propertyPath, String messageTemplate) {
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(messageTemplate)
                .addNode(propertyPath)
                .addConstraintViolation();
    }
}
