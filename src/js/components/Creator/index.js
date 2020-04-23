import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";

import { PrimaryBtn } from "./../../containers/buttons";
import postActions from "./../../store/post/action";
import { connect } from "react-redux";

import CreatorMenu from "./menu";
import CreatorBase from "./base";
import CreatorPost from "./post";
import CreatorGraphic from "./graphic/index";
import CreatorYoutube from "./youtube";
import CreatorLink from "./link";
import { Message } from "./../../containers/message";

const Creator = (props) => {
  const [postId, setPostId] = useState();

  const [graphicPhoto, setGraphicPhoto] = useState("");
  const [graphicTitle, setGraphicTitle] = useState("");
  const [graphicTitleTop, setGraphicTitleTop] = useState("");
  const [graphicContent, setGraphicContent] = useState("");

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postPhoto, setPostPhoto] = useState("");
  const [isPostPhotoActive, setIsPostPhotoActive] = useState(false);

  const [photo, setPhoto] = useState("");
  const [youtube, setYoutube] = useState("");

  const [link, setLink] = useState("");
  const [linkPhoto, setLinkPhoto] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [linkContent, setLinkContent] = useState("");

  const [type, setType] = useState("post");

  if (postId) {
    // return <Redirect to={"/status/" + postId} />;
    return <Redirect to="/" />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    props.create({
      title,
      content,

      graphicPhoto,
      graphicTitle,
      graphicTitleTop,
      graphicContent,

      postTitle,
      postContent,
      postPhoto,
      isPostPhotoActive,

      type,
      photo,
      youtube,

      link,
      linkPhoto,
      linkTitle,
      linkContent,
    });
  };
  const { alert } = props;

  return (
    <div className="container">
      <section className="creator">
        <h1 className="creator-title">Dodaj {type}</h1>
        <form className="creator-form" onSubmit={handleSubmit}>
          <CreatorMenu setType={setType} />

          <div className="creator-switcher__content-wrap">
            <div data-name="post" className="creator-switcher__content">
              <CreatorPost
                setPostTitle={setPostTitle}
                postTitle={postTitle}
                setPostContent={setPostContent}
                postContent={postContent}
                alert={alert}
                postPhoto={postPhoto}
                setPostPhoto={setPostPhoto}
                setIsPostPhotoActive={setIsPostPhotoActive}
                isPostPhotoActive={isPostPhotoActive}
              />
            </div>

            <div
              data-name="photo"
              className="creator-switcher__content creator-switcher__content--active"
            >
              <CreatorGraphic
                alert={alert}
                setGraphicPhoto={setGraphicPhoto}
                graphicPhoto={graphicPhoto}
                graphicTitle={graphicTitle}
                setGraphicTitle={graphicTitle}
                graphicTitleTop={graphicTitleTop}
                setGraphicContent={setGraphicContent}
                graphicContent={graphicContent}
              />
            </div>

            <div data-name="youtube" className="creator-switcher__content">
              <CreatorYoutube setYoutube={setYoutube} youtube={youtube} />
            </div>

            <div data-name="link" className="creator-switcher__content">
              <CreatorLink
                link={link}
                setLink={setLink}
                linkPhoto={linkPhoto}
                setLinkPhoto={setLinkPhoto}
                linkTitle={linkTitle}
                setLinkTitle={setLinkTitle}
                linkContent={linkContent}
                setLinkContent={setLinkContent}
                alert={alert}
              />
            </div>

            <PrimaryBtn
              extraClass="creator-form__button"
              text="Dodaj"
              handleSubmit={handleSubmit}
            />
          </div>
        </form>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { user, posts, alert } = state;
  return { user, posts, alert };
};

const actionCreators = {
  create: postActions.create,
};

export default connect(mapStateToProps, actionCreators)(Creator);
