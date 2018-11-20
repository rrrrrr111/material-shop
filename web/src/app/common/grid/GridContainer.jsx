import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import React from "react";


const style = {
    grid: {
        marginRight: "-15px",
        marginLeft: "-15px",
        width: "auto"
    }
};

/**
 * container/item - можно совмещать и вкладывать одно в другое
 *
 * Реугилирование ширины элемента в зависимости от ширины экрана
 *      - за основу принимается общая ширина страницы равная 12 единицам
 *          - тоесть например 12 = 100% ширины, 4 = 30% ширины
 *      - Возможные брэкпоинты xs / sm / md / lg / xl
 *      - Указание атрибута брэкпоинта без указания размера (Auto-layout)
 *          - задает одинаковую ширину для элементов в строке с одинаковыми брэкпоинтами
 *          - работает только начиная с ширины экрана соотв брэкпоинту, если екран уже то элемент не расширяется,
 *            имеет минимальную ширину, потому рекомендуется юзать xs - работает на всех экранах
 *          - если при этом один из элементов указан с размером в брэкпоинте, то соотв он будет шире/уже
 *              - например в строке 3 элемента, у одного стоит xs={6} у остальных просто xs - тогда первый будет
 *                занимать 50% ширины остальные два по 25%
 *      - указание брэкпоинта с размером
 *          - для перестройки содержимого на разных ширинах экрана, на элементах указываются наборы соотв брэкпоинтов
 *
 * Выравнивание дочерних, все 4 настройки работают только для контейнера
 *      - direction - направление элементов, строка либо колонка, также есть реверс
 *          - row (default) / row-reverse / column / column-reverse
 *      - justify - размещение элементов в строке\колонке, к началу, к концу, по центру, равномерно по ширине
 *          - flex-start (default) / center / flex-end / space-between / space-around / space-evenly
 *      - alignContent - размещение содержимого элементов
 *          - flex-start / center / flex-end / space-between / space-around / stretch (default)
 *      - alignItems - выравнивание по горизонт\ вертикали соотв для строки\колонки,
 *          - flex-start / center / flex-end / stretch (default) / baseline
 *
 * Spacing между элементами
 *      - стандартные значения 0 (default) / 8 / 16 / 24 / 32 / 40
 *      - из-за Spacing иногда появл горизонт прокрутка потому рекомендуется добавлять padding на элементы
 *        имеющие Spacing для дочерних
 *
 * wrap - white-space: "nowrap" для содержимого, переносить или нет на новую строку если не вмещается
 *      - nowrap / wrap / wrap-reverse
 *      - zeroMinWidth - делает троеточие для невмещающегося контента
 *
 * @see https://material-ui.com/layout/grid/
 *
 */
function GridContainer(props) {
    const {classes, children, className, ...rest} = props;
    return (
        <Grid container {...rest} className={classes.grid + " " + className}>
            {children}
        </Grid>
    );
}

GridContainer.defaultProps = {
    className: ""
};

GridContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
    className: PropTypes.string
};

export default withStyles(style)(GridContainer);
