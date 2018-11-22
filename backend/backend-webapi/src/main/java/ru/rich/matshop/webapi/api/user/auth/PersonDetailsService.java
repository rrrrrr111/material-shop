package ru.rich.matshop.webapi.api.user.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.rich.matshop.webapi.api.user.PersonDao;

import static java.lang.String.format;

@Service
public class PersonDetailsService implements UserDetailsService {

    private final PersonDao personDao;

    public PersonDetailsService(PersonDao personDao) {
        this.personDao = personDao;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Long personId = personDao.getIdByEmail(username);
        if (personId == null) {
            throw new UsernameNotFoundException(
                    format("User with login %s not found", username));
        }
        return personDao.getById(personId);
    }
}
