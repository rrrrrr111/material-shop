package ru.rich.matshop.webapi.api.user.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.rich.matshop.webapi.api.user.PersonService;
import ru.rich.matshop.webapi.api.user.model.Person;

import static java.lang.String.format;
import static ru.rich.matshop.webapi.api.user.model.Role.Ability.AUTHENTICATE;

@Service
public class PersonDetailsService implements UserDetailsService {

    private final PersonService personService;

    public PersonDetailsService(PersonService personService) {
        this.personService = personService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Person person = personService.getByEmail(username);
        if (person == null) {
            throw new UsernameNotFoundException(
                    format("User with login %s not found", username));
        }
        if (!person.ableTo(AUTHENTICATE)) {
            throw new UsernameNotFoundException(
                    format("User with role %s and login %s not able to auth", person.getRole(), username));
        }
        return (UserDetails) person;
    }
}
