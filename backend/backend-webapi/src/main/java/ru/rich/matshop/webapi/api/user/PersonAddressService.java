package ru.rich.matshop.webapi.api.user;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import ru.rich.matshop.webapi.api.user.model.PersonAddress;

import java.util.List;

@Service
public class PersonAddressService {

    private final PersonAddressDao personAddressDao;

    PersonAddressService(PersonAddressDao personAddressDao) {
        this.personAddressDao = personAddressDao;
    }

    @Cacheable(value = "personAddressByPersonId", key = "#personId")
    public PersonAddress getByPersonId(Long personId) {
        List<PersonAddress> addressList = personAddressDao.getByPersonId(personId);
        PersonAddress address = null;

        for (PersonAddress a : addressList) {
            if (address == null || address.getEditDate().before(a.getEditDate())) {
                address = a;
            }
        }
        return address;
    }

    @Caching(evict = {
            @CacheEvict(value = {"personAddressByPersonId"}, key = "#address.personId"),
    })
    public void upsert(PersonAddress address) {
        List<PersonAddress> addressList = personAddressDao.getByPersonId(address.getPersonId());

        int i = addressList.indexOf(address);
        if (i > -1) {
            PersonAddress a = addressList.get(i);
            address.setId(a.getId());
            personAddressDao.update(address); // обновится только EDIT_DATE, чтобы адрес стал последним актуальным
            return;
        }
        address.setId(null);
        personAddressDao.insert(address);
    }
}
