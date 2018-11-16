package ru.rich.matshop.webapi.api.common.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;

public abstract class AbstractRestController {
    protected final Logger log = LoggerFactory.getLogger(getClass());

    @Value("${matshop.webapi.serverId}")
    private Integer serverId;

    protected <R extends AbstractRestResponse> R prepareResponse(R response) {
        response.setServerId(serverId);
        return response;
    }
}
