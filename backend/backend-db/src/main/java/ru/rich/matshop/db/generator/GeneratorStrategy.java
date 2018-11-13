package ru.rich.matshop.db.generator;


import org.jooq.codegen.DefaultGeneratorStrategy;
import org.jooq.meta.Definition;
import org.jooq.meta.TableDefinition;

public class GeneratorStrategy extends DefaultGeneratorStrategy {

    @Override
    public String getJavaClassName(Definition definition, Mode mode) {
        String name = super.getJavaClassName(definition, mode);

        if (Mode.DEFAULT.equals(mode) && definition instanceof TableDefinition) { // имена классов-таблиц
            return name + "Table"; // добавим Table чтобы не путалось с Pojo
        }
        return name;
    }
}