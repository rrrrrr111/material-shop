import AppIcon from "app/common/icon/AppIcon";
import {MAIN_COLOR_KEYS, PRIMARY_COLOR_KEY} from "app/common/style/styleConsts";
import Paginations from "app/common/theme/paging/Paginations";
import PropTypes from "prop-types";
import React from "react";

class Paging extends React.PureComponent {

    onPageClick = (num) => {
        this.props.onPageClick(num)
    };

    calculateLength(page, hasMore) {
        return Math.min(
            2 + page + (hasMore ? 2 : 0),
            8
        );
    }

    calculatePageNum(index, length, page, hasMore) {
        const activePagePosition = length - (hasMore ? 4 : 2);
        return page - (activePagePosition - index);
    }

    render() {
        const {color, paging, className, disabled} = this.props,
            {page, hasMore} = paging,
            length = this.calculateLength(page, hasMore);

        const pages = new Array(length);

        for (let i = 0; i < pages.length; i++) {
            const num = this.calculatePageNum(i, length, page, hasMore),
                active = page === num;

            if (i === 0) {
                pages[i] = {
                    text: <AppIcon name="fas fa-angle-double-left"/>,
                    onClick: this.onPageClick.bind(this, page - 1),
                    disabled: page === 1 || disabled,
                }
            } else if (i === 1) {
                pages[i] = {
                    text: 1,
                    disabled: disabled,
                    onClick: this.onPageClick.bind(this, 1),
                    active: active,
                }
            } else if (i === pages.length - 1) {
                pages[i] = {
                    text: <AppIcon name="fas fa-angle-double-right"/>,
                    disabled: !hasMore || disabled,
                    onClick: this.onPageClick.bind(this, page + 1)
                }
            } else if ((i === 2 && i !== num)
                || (i === pages.length - 2 && hasMore)) {
                pages[i] = {
                    text: <AppIcon name="fas fa-ellipsis-h"/>,
                    disabled: true,
                }
            } else {
                pages[i] = {
                    text: num,
                    disabled: disabled,
                    onClick: this.onPageClick.bind(this, num),
                    active: active,
                }
            }
        }
        return (
            <Paginations className={className} pages={pages} color={color}/>
        );
    };

    static defaultProps = {
        color: PRIMARY_COLOR_KEY
    };

    static propTypes = {
        color: PropTypes.oneOf(MAIN_COLOR_KEYS).isRequired,
        paging: PropTypes.shape({
            count: PropTypes.number.isRequired,
            page: PropTypes.number.isRequired,
            sorting: PropTypes.string.isRequired,
            hasMore: PropTypes.bool.isRequired
        }).isRequired,
        onPageClick: PropTypes.func.isRequired,
        disabled: PropTypes.bool,
    };
}

export default Paging;
