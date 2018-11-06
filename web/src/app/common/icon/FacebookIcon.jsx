import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';


class FacebookIcon extends React.PureComponent {
    render() {
        return (
            <SvgIcon {...this.props}>
                <path fill={"#FFFFFF"}
                      viewBox={"0 0 24 24"} width={24} height={24}
                      d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z"/>
            </SvgIcon>
        );
    }
}

export default (FacebookIcon);