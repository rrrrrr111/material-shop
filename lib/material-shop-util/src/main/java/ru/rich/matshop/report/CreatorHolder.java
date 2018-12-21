package ru.rich.matshop.report;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Управление креаторами определенного типа
 */
public abstract class CreatorHolder<C extends Creator> {
    private static final Logger log = LoggerFactory.getLogger(CreatorHolder.class);

    @Autowired(required = false)
    private List<C> creators;
    private Map<String, C> idToCreator = new HashMap<>();

    @PostConstruct
    private void init() {
        if (creators == null) {
            creators = Collections.emptyList();
        }
        for (C creator : creators) {
            idToCreator.put(creator.getId(), creator);
        }
        log.info("Initialisation complete, available creators: {}", idToCreator);
    }

    /**
     * Проверка наличия креатора с указанным ID
     */
    boolean hasCreatorForId(String id) {
        return idToCreator.containsKey(id);
    }

    /**
     * Формирование печатной формы с помощью определенного креатора со сгенерированным именем
     */
    <D> ReportForm create(String reportFormCreatorId, D data) {
        C creator = idToCreator.get(reportFormCreatorId);
        log.trace("Starting report form creator, reportFormCreatorId {}, creator {}, outputFormat {}",
                reportFormCreatorId, creator, creator.getOutputFormat());

        ReportForm reportForm = createReportForm(creator, data);

        log.info("Report form {} created, size {}Kb", reportForm.getFileName(), reportForm.getData().length / 1024);
        return reportForm;
    }

    /**
     * В наследниках реализовать подготовку данных и формирование печатной формы с помощью креатора
     */
    protected abstract <D> ReportForm createReportForm(C creator, D data);

    protected InputStream loadClasspathFile(String filePath) {
        try {
            return new ClassPathResource(filePath, getClass().getClassLoader()).getInputStream();
        } catch (IOException e) {
            throw new RuntimeException("Failed to load template file : " + filePath, e);
        }
    }
}
