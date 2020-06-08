import React, { useReducer, useState } from "react";
import { Redirect } from "react-router";

import { LoaderCover } from "../../containers/loader";
import postMenagerActions from "../../store/post-menager/action";
import { connect } from "react-redux";

import CreatorMenu from "./menu";
import CreatorBase from "./base";
import CreatorPost from "./post";
import CreatorGraphic from "./graphic/index";
import CreatorYoutube from "./youtube";
import CreatorLink from "./link";
import PropTypes from "prop-types";
import logo from "./../../../images/creator_logo.png";

const Creator = (props) => {
  const [postId, setPostId] = useState();

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

  const { alert, isLoading } = props;
 
  return (
    <div className="container">
      <section className="creator">

        {isLoading && <LoaderCover />}
      <div className="creator__logo">
        <img className="creator__logo-img" src={logo}/>
      </div>

        <CreatorMenu setType={setType} />
        <div className="creator-switcher__content-wrap">
          <div
            data-name="post"
            className="creator-switcher__content "
          >
            <CreatorPost />
          </div>
          <div data-name="photo" className="creator-switcher__content creator-switcher__content--active">
            <CreatorGraphic />
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
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { user, alert, postMenager } = state;
  return { user, alert, isLoading: postMenager.isLoading };
};

const actionCreators = {
  loading: postMenagerActions.loading,
};

Creator.propTypes = {
  user: PropTypes.object,
  postMenager: PropTypes.object,
  alert: PropTypes.object,
};

export default connect(mapStateToProps, actionCreators)(Creator);
