package ru.rich.matshop.db.generator;


import org.jooq.codegen.DefaultGeneratorStrategy;
import org.jooq.meta.Definition;
import org.jooq.meta.SchemaDefinition;
import org.jooq.meta.TableDefinition;
import org.jooq.meta.UniqueKeyDefinition;

public class GeneratorStrategy extends DefaultGeneratorStrategy {

    @Override
    public String getJavaClassName(Definition definition, Mode mode) {
        if (definition instanceof SchemaDefinition) {
            return "DbofiSchema";
        } else if (Mode.DEFAULT.equals(mode) && definition instanceof TableDefinition) {
            return super.getJavaClassName(definition, mode) + "Table";
        } else {
            return super.getJavaClassName(definition, mode);
        }
    }

    @Override
    public String getJavaIdentifier(Definition definition) {
        if (definition instanceof SchemaDefinition) {
            return "DBOFI";
        } else if (definition instanceof UniqueKeyDefinition) {

            // проверка на генерируемые имена UK. Их быть не должно.
            if (definition.getOutputName().startsWith("SYS_")) {
                UniqueKeyDefinition def = (UniqueKeyDefinition) definition;
                String tableName = def.getTable().getName();
                String key = def.getKeyColumns().get(0).getOutputName();
                String name = def.getOutputName();
                throw new RuntimeException("Invalid name: " + name + " in " + tableName + " for " + key + " column");
            } else {
                return super.getJavaIdentifier(definition);
            }

        } else {
            return super.getJavaIdentifier(definition);
        }
    }
}
