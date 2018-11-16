package ru.rich.matshop.webapi.api.user.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.rich.matshop.db.model.tables.records.PersonRecord;
import ru.rich.matshop.webapi.api.user.model.Role;
import ru.rich.matshop.webapi.api.user.model.Sex;
import ru.rich.matshop.webapi.api.user.model.UserInfo;

import static java.lang.String.format;

@Service
public class PersonDetailsService implements UserDetailsService {

    private final AuthPersonDao authPersonDao;

    public PersonDetailsService(AuthPersonDao authPersonDao) {
        this.authPersonDao = authPersonDao;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        PersonRecord r = authPersonDao.getByEmail(username);
        if (r == null) {
            throw new UsernameNotFoundException(
                    format("User with login %s not found", username));
        }
        UserInfo userInfo = new UserInfo();

        userInfo.setId(r.getId());
        userInfo.setEmail(r.getEmail());
        userInfo.setPassword(r.getPassword());
        userInfo.setPhone(r.getPhone());
        userInfo.setFirstName(r.getFirstName());
        userInfo.setLastName(r.getLastName());
        userInfo.setDateOfBirth(r.getDateOfBirth());
        userInfo.setSex(Sex.valueOf(r.getSex()));
        userInfo.setAgreementChecked(r.getAgreementChecked());
        userInfo.setLocked(r.getLocked());
        userInfo.setRole(Role.valueOf(r.getRole()));
        userInfo.setEditDate(r.getEditDate());

        return userInfo;
    }
}
