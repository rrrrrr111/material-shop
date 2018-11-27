const menuItemStyle = theme => ({

    dropdownIcons: {
        width: "24px",
        height: "24px",
        fontSize: "24px",
        margin: "-4px 14px 0 0",
        opacity: "0.5",
        top: "1px",
        verticalAlign: "middle",
        position: "relative",
        "&.fas, &.fab, &.far, &.fal": { // my
            margin: "-4px 11px 0 3px",
            fontSize: "22px",
        },
    },
    dropdownLink: {
        "&,&:hover,&:focus": {
            color: "inherit",
            textDecoration: "none",
            display: "flex",
            padding: "0.75rem 1.25rem 0.75rem 0.75rem",
            whiteSpace: "normal",
            /* для десктопа */
            [theme.breakpoints.up("md")]: { //my
                minWidth: 200,
                maxWidth: 300,
            },
        }
    },
});

export default menuItemStyle;
