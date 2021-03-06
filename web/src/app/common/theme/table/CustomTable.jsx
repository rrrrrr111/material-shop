import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {MAIN_COLOR_KEYS, PRIMARY_COLOR_KEY} from "app/common/style/styleConsts";
import tableStyle from "app/common/theme/table/tableStyle";
import {classNames} from "app/utils/functionUtil";
import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";

function CustomTable(props) {
    const {
        classes,
        className,
        tableHead,
        tableData,
        tableFooter,
        tableHeaderColor,
        hover,
        colorsColls,
        coloredColls,
        customCellClasses,
        customClassesForCells,
        striped,
        tableShopping,
        customHeadCellClasses,
        customHeadClassesForCells
    } = props;
    return (
        <div className={classNames({
            [classes.tableResponsive]: true,
            [className]: className
        })}>
            <Table className={classes.table}>
                {tableHead !== undefined ? (
                    <TableHead className={classes[tableHeaderColor]}>
                        <TableRow className={classes.tableRow}>
                            {tableHead.map((prop, key) => {
                                const tableCellClasses =
                                    classes.tableHeadCell +
                                    " " +
                                    classes.tableCell +
                                    " " +
                                    cx({
                                        [customHeadCellClasses[
                                            customHeadClassesForCells.indexOf(key)
                                            ]]:
                                        customHeadClassesForCells.indexOf(key) !== -1,
                                        [classes.tableShoppingHead]: tableShopping
                                    });
                                return (
                                    <TableCell className={tableCellClasses} key={key}>
                                        {prop}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                ) : null}
                <TableBody>
                    {tableData.map((prop, key) => {
                        let rowColor = "";
                        let rowColored = false;
                        if (prop.color !== undefined) {
                            rowColor = prop.color;
                            rowColored = true;
                            prop = prop.data;
                        }
                        const tableRowClasses = cx({
                            [classes.tableRowHover]: hover,
                            [classes[rowColor + "Row"]]: rowColored,
                            [classes.tableStripedRow]: striped && key % 2 === 0
                        });
                        if (prop.total) {
                            return (
                                <TableRow key={key} hover={hover} className={tableRowClasses}>
                                    <TableCell
                                        className={classes.tableCell}
                                        colSpan={prop.colspan}
                                    />
                                    <TableCell
                                        className={classes.tableCell + " " + classes.tableCellTotal}
                                    >
                                        Total
                                    </TableCell>
                                    <TableCell
                                        className={
                                            classes.tableCell + " " + classes.tableCellAmount
                                        }
                                    >
                                        {prop.amount}
                                    </TableCell>
                                    {tableHead.length - (prop.colspan - 0 + 2) > 0 ? (
                                        <TableCell
                                            className={classes.tableCell}
                                            colSpan={tableHead.length - (prop.colspan - 0 + 2)}
                                        />
                                    ) : null}
                                </TableRow>
                            );
                        }
                        if (prop.purchase) {
                            return (
                                <TableRow key={key} hover={hover} className={tableRowClasses}>
                                    <TableCell
                                        className={classes.tableCell}
                                        colSpan={prop.colspan}
                                    />
                                    <TableCell
                                        className={classes.tableCell + " " + classes.tableCellTotal}
                                    >
                                        Total
                                    </TableCell>
                                    <TableCell
                                        className={
                                            classes.tableCell + " " + classes.tableCellAmount
                                        }
                                    >
                                        {prop.amount}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tableCell + " " + classes.right}
                                        colSpan={prop.col.colspan}
                                    >
                                        {prop.col.text}
                                    </TableCell>
                                </TableRow>
                            );
                        }
                        return (
                            <TableRow
                                key={key}
                                hover={hover}
                                className={classes.tableRow + " " + tableRowClasses}
                            >
                                {prop.map((prop, key) => {
                                    const tableCellClasses =
                                        classes.tableCell +
                                        " " +
                                        cx({
                                            [classes[colorsColls[coloredColls.indexOf(key)]]]:
                                            coloredColls.indexOf(key) !== -1,
                                            [customCellClasses[customClassesForCells.indexOf(key)]]:
                                            customClassesForCells.indexOf(key) !== -1
                                        });
                                    return (
                                        <TableCell className={tableCellClasses} key={key}>
                                            {prop}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            {!tableFooter ? null : tableFooter}
        </div>
    );
}

CustomTable.defaultProps = {
    tableHeaderColor: PRIMARY_COLOR_KEY,
    hover: false,
    colorsColls: [],
    coloredColls: [],
    striped: false,
    customCellClasses: [],
    customClassesForCells: [],
    customHeadCellClasses: [],
    customHeadClassesForCells: []
};

CustomTable.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    tableHeaderColor: PropTypes.oneOf(MAIN_COLOR_KEYS),
    tableHead: PropTypes.arrayOf(PropTypes.string),
    // Of(PropTypes.arrayOf(PropTypes.node)) || Of(PropTypes.object),
    tableData: PropTypes.array,
    tableFooter: PropTypes.object,
    hover: PropTypes.bool,
    coloredColls: PropTypes.arrayOf(PropTypes.number),
    // Of(["warning","primary","danger","success","info","rose","gray"]) - colorsColls
    colorsColls: PropTypes.array,
    customCellClasses: PropTypes.arrayOf(PropTypes.string),
    customClassesForCells: PropTypes.arrayOf(PropTypes.number),
    customHeadCellClasses: PropTypes.arrayOf(PropTypes.string),
    customHeadClassesForCells: PropTypes.arrayOf(PropTypes.number),
    striped: PropTypes.bool,
    // this will cause some changes in font
    tableShopping: PropTypes.bool
};

export default withStyles(tableStyle)(CustomTable);
