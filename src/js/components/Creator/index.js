import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";

import { PrimaryBtn } from "./../../containers/buttons";
import postActions from "./../../store/post/action";
import { connect } from "react-redux";

import CreatorMenu from "./menu";
import CreatorBase from "./base";
import CreatorPost from "./post";
import CreatorPhoto from "./photo";
import CreatorYoutube from "./youtube";
import CreatorLink from "./link";
import { Message } from "./../../containers/message";

const Creator = (props) => {
  const [postId, setPostId] = useState();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [titlePost, setTitlePost] = useState("");
  const [contentPost, setContentPost] = useState("");
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

      titlePost,
      contentPost,
      postPhoto,

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
            <div
              data-name="post"
              className="creator-switcher__content creator-switcher__content--active"
            >
              <CreatorPost
                setTitle={setTitlePost}
                title={titlePost}
                setContent={setContentPost}
                content={contentPost}
                alert={alert}
                postPhoto={postPhoto}
                setPostPhoto={setPostPhoto}
                setIsPostPhotoActive={setIsPostPhotoActive}
                isPostPhotoActive={isPostPhotoActive}
              />
            </div>

            <div data-name="photo" className="creator-switcher__content">
              <CreatorPhoto alert={alert} setPhoto={setPhoto} photo={photo} />
              <CreatorBase
                setTitle={setTitle}
                title={title}
                setContent={setContent}
                content={content}
                alert={alert}
              />
            </div>

            <div data-name="youtube" className="creator-switcher__content">
              <CreatorYoutube setYoutube={setYoutube} youtube={youtube} />
              <CreatorBase
                setTitle={setTitle}
                title={title}
                setContent={setContent}
                content={content}
                alert={alert}
              />
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
