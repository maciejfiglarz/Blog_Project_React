import React from "react";
import PropTypes from "prop-types";

const ContentLink = (props) => {
  const { post } = props;
  const { linkPhoto, link, linkSiteName } = post;

  const imageStyle = {
    backgroundImage: `url('${linkPhoto}')`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  return (
    <div className="post-content__link">
      <a href={link} target="_blank">
        <div className="post-content__link-photo" style={imageStyle}>
          {/* {loader} */}
          <div className="post-content__link-sitename">{linkSiteName}</div>
        </div>
      </a>
    </div>
  );
};

ContentLink.propTypes = {
  post: PropTypes.object,
};

export default ContentLink;
