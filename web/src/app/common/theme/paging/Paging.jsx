import AppIcon from "app/common/icon/AppIcon";
import {MAIN_COLOR_KEYS} from "app/common/style/styleConsts";
import Paginations from "app/common/theme/paging/Paginations";
import PropTypes from "prop-types";
import React from "react";

const Paging = (props) => {
    const {color, paging, onClick, className} = props;
    const {page, hasMore} = paging;

    const pages = new Array(1 + (page > 5 ? 5 : page) + (hasMore ? 2 : 0) + 1);

    for (let i = 0; i < pages.length; i++) {
        const active = i === page,
            text = page === i ? page
                : page + (i - page);
        if (i === 0) {
            pages[i] = {
                text: <AppIcon name="fas fa-angle-double-left"/>, disabled: page === 1
            }
        } else if (i === 1) {
            pages[i] = {
                text: 1, active: active
            }
        } else if (i === 2) {
            const ellipsis = page > 5;
            pages[i] = {
                text: ellipsis ? <AppIcon name="fas fa-ellipsis-h"/> : text, disabled: ellipsis, active: active
            }
        } else if (i === pages.length - 2 && hasMore) {
            pages[i] = {
                text: <AppIcon name="fas fa-ellipsis-h"/>, disabled: true
            }
        } else if (i === pages.length - 1) {
            pages[i] = {
                text: <AppIcon name="fas fa-angle-double-right"/>, disabled: !hasMore
            }
        } else if (2 < i && i < 6) {
            pages[i] = {
                text: text, active: active
            }
        }
    }

    return (
        <Paginations className={className} pages={pages} color={color}/>
    );
};

Paging.defaultProps = {
    color: "primary"
};

Paging.propTypes = {
    color: PropTypes.oneOf(MAIN_COLOR_KEYS).isRequired,
    paging: PropTypes.shape({
        count: PropTypes.number.isRequired,
        page: PropTypes.number.isRequired,
        sorting: PropTypes.string.isRequired,
        hasMore: PropTypes.bool.isRequired
    }).isRequired,
    onClick: PropTypes.shape.isRequired,
};

export default Paging;
