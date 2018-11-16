package ru.rich.matshop.webapi.api.user.model;

import java.util.List;
import java.util.Set;

import static ru.rich.matshop.webapi.api.user.model.Role.Ability.SEE_ORDER_LIST;

public enum Role {

    USER(SEE_ORDER_LIST);

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
        SEE_ORDER_LIST;

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
