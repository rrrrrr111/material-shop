import {container, title} from "lib/assets/jss/material-kit-pro-react.jsx";

const style = {
    headerImage: {
        minHeight: "60vh",
        maxHeight: "600px",
        height: "auto",
        overflow: "hidden",
        backgroundPosition: "top center"
    },
    container: {
        ...container,
        zIndex: 2
    },
    title: {
        ...title,
        color: "#FFF"
    },
    brand: {
        color: "#fff",
        textAlign: "center",
        "& h1": {
            fontSize: "4.2rem",
            fontWeight: "600",
            display: "inline-block",
            position: "relative"
        }
    },
    proBadge: {
        position: "relative",
        fontSize: "22px",
        textTransform: "uppercase",
        fontWeight: "700",
        right: "-10px",
        padding: "10px 18px",
        top: "-30px",
        background: "#fff",
        borderRadius: "3px",
        color: "#444",
        lineHeight: "22px",
        boxShadow: "0 5px 5px -2px rgba(31,31,31,.4)"
    }
};

export default style;
