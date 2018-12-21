package ru.rich.matshop.report;

import com.google.common.base.Preconditions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Реализация сервиса формирования отчетных форм
 */
@Service("printFormService")
class ReportFormServiceImpl implements ReportFormService {

    @Autowired
    private List<CreatorHolder> creatorHolders;

    @Override
    public <D> ReportForm create(String printFormCreatorId, D data) {
        Preconditions.checkNotNull(printFormCreatorId, "Document type parameter cannot be null");
        Preconditions.checkNotNull(data, "Print form data object cannot be null");

        CreatorHolder creatorHolder = findCreatorHolder(printFormCreatorId);
        return creatorHolder.create(printFormCreatorId, data);
    }

    private CreatorHolder findCreatorHolder(String printFormCreatorId) {
        CreatorHolder creatorHolder = null;
        for (CreatorHolder holder : creatorHolders) {
            if (holder.hasCreatorForId(printFormCreatorId)) {
                if (creatorHolder == null) {
                    creatorHolder = holder;
                } else {
                    throw new IllegalStateException(String.format("Two creators found with the same ID : %s", printFormCreatorId));
                }
            }
        }
        return Preconditions.checkNotNull(creatorHolder, "Creator not found for ID : %s", printFormCreatorId);
    }
}
