package ru.rich.matshop.webapi.api.user;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.rich.matshop.webapi.api.feed.model.FeedProduct;

import java.util.List;

@Service
class UserService {

    private final PersonDao personDao;

    UserService(PersonDao personDao) {
        this.personDao = personDao;
    }

    @Transactional
    public List<FeedProduct> getFeedList() {

        return null;
    }
}
