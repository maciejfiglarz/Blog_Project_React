import React from "react";
import PropTypes from "prop-types";
import { uploadsUrl } from "../../constants/types";

const ContentPhoto = ({ post, type }) => {
  const { graphicId, photo } = post;

  const imageUrl = `${uploadsUrl}/${
    type == "graphic" ? `/graphic/${graphicId}.jpg` : `/post/${photo}`}`;

  return (
    <div className="post-content__image">
      <img src={imageUrl} />
    </div>
  );
};

ContentPhoto.propTypes = {
  photo: PropTypes.object,
  post: PropTypes.object,
};

export default ContentPhoto;
