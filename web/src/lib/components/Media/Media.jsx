import React from "react";

import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";



import mediaStyle from "lib/assets/jss/material-kit-pro-react/components/mediaStyle.jsx";

function Media({ ...props }) {
  const {
    classes,
    avatarLink,
    avatar,
    avatarAlt,
    title,
    body,
    footer,
    innerMedias,
    ...rest
  } = props;
  return (
    <div {...rest} className={classes.media}>
      <a href={avatarLink} className={classes.mediaLink}>
        <div className={classes.mediaAvatar}>
          <img src={avatar} alt={avatarAlt} />
        </div>
      </a>
      <div className={classes.mediaBody}>
        {title !== undefined ? (
          <h4 className={classes.mediaHeading}>{title}</h4>
        ) : null}
        {body}
        <div className={classes.mediaFooter}>{footer}</div>
        {innerMedias !== undefined
          ? innerMedias.map((prop, key) => {
              return prop;
            })
          : null}
      </div>
    </div>
  );
}

Media.defaultProps = {
  avatarLink: "#pablo",
  avatarAlt: "..."
};

Media.propTypes = {
  avatarLink: PropTypes.string,
  avatar: PropTypes.string,
  avatarAlt: PropTypes.string,
  title: PropTypes.node,
  body: PropTypes.node,
  footer: PropTypes.node,
  innerMedias: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(mediaStyle)(Media);
