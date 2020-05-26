import React from "react";
import PropTypes from "prop-types";
import { uploadsUrl } from "../../constants/types";

const ContentGraphic = ({ post }) => {
  const { graphicId } = post;
  
  const imageUrl = `${uploadsUrl}/graphic/${graphicId}.jpg`;

  return (
    <div className="post-content__photo">
      <img src={imageUrl} />
    </div>
  );
};

ContentGraphic.propTypes = {
  photo: PropTypes.object,
  post: PropTypes.object,
};

export default ContentGraphic;

