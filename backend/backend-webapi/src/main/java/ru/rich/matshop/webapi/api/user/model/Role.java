package ru.rich.matshop.webapi.api.user.model;

import java.util.List;
import java.util.Set;

import static ru.rich.matshop.webapi.api.user.model.Role.Ability.AUTHENTICATE;
import static ru.rich.matshop.webapi.api.user.model.Role.Ability.SEE_OWN_ORDER_LIST;

public enum Role {

    /**
     * Анонимный пользоватль, создавал заказ, но не регистрировался в системе
     */
    ANONYMOUS(),
    /**
     * Зарегистрированный пользоватль
     */
    USER(AUTHENTICATE, SEE_OWN_ORDER_LIST);

    public static final List<Role> LIST = List.of(values());
    private final Set<UserAbility> abilities;

    Role(UserAbility... abilities) {
        this.abilities = Set.of(abilities);
    }

    public boolean contains(UserAbility ability) {
        return abilities.contains(ability);
    }

    public Set<UserAbility> getAbilities() {
        return abilities;
    }

    /**
     * Возможности клиентских пользователей на основе их ролей
     */
    public enum Ability implements UserAbility {
        /**
         * Может логиниться в системе
         */
        AUTHENTICATE,
        /**
         * Может видеть собственный список заказов
         */
        SEE_OWN_ORDER_LIST;

        @Override
        public boolean test(Role role) {
            return role.contains(this);
        }

        @Override
        public String getAuthority() {
            return name();
        }
    }
}
