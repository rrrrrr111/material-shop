package ru.rich.matshop.webapi.api.user.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.rich.matshop.db.model.tables.records.PersonRecord;
import ru.rich.matshop.webapi.api.user.PersonDao;
import ru.rich.matshop.webapi.api.user.UserService;
import ru.rich.matshop.webapi.api.user.model.Role;
import ru.rich.matshop.webapi.api.user.model.UserInfo;

import static java.lang.String.format;
import static java.util.Collections.emptySet;

@Service
public class PersonDetailsService implements UserDetailsService {

    private final PersonDao personDao;
    private final UserService userService;

    public PersonDetailsService(PersonDao personDao, UserService userService) {
        this.personDao = personDao;
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Long personId = personDao.getIdByEmail(username, emptySet());
        if (personId == null) {
            throw new UsernameNotFoundException(
                    format("User with login %s not found", username));
        }
        PersonRecord record = personDao.getById(personId);
        UserInfo userInfo = new UserInfo();
        userService.fillPerson(record, userInfo);

        userInfo.setLocked(record.getLocked());
        userInfo.setRole(Role.valueOf(record.getRole()));
        return userInfo;
    }
}
