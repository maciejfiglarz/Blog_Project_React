import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { PrimaryBtn } from "../../containers/buttons";
import emptyAvatar from "./../../../images/empty_avatar.jpeg";
import PropTypes from "prop-types";
import { uploadsUrl } from "./../../constants/types";
import commentActions from "./../../store/comment/action";
import { TextArea } from "./../../containers/form";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { Emoji } from "emoji-mart";
import ContentEditable from "react-contenteditable";

const CommentCreator = ({
  post,
  setData,
  comments,
  user,
  createComment,
  fetchComments,
  extraClass,
  parentCommentId = null,
}) => {
  const [content, setContent] = useState("");
  // const [commentPage, setCommentPage] = useState(0);
  const [isPicker, setIsPicker] = useState(false);
  const isLogged = user.isLogged;
  const postId = post._id;

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emojiPic = String.fromCodePoint(...codesArray); //("0x1f3f3", "0xfe0f")

    setContent(`${content}${emojiPic}`);
    setIsPicker(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createComment({ content, user, postId, parentCommentId });
    setContent("");
  };

  // useEffect(() => {
  //   const fetchCommentsForPost = async () => {
  //     const result = await fetchComments({ postId, commentPage });
  //     console.log("commentResult", result);
  //   };
  //   fetchCommentsForPost();
  // }, [commentPage]);

  const avatarStyle = (photo) => {
    const imageUrl = photo ? `${uploadsUrl}/avatar/${photo}` : emptyAvatar;
    return {
      backgroundImage: `url('${imageUrl}')`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
    };
  };

  const handleChange = (e) => {
    let string = e.target.value;
    string = string.replace(/<\/?[^>]+(>|$)/g, "");
    string = string.replace("&nbsp;", " ");
    setContent(string);
  };

  const handleBlur = () => {
    console.log(content);
  };

  const onClickPicker = () => {
    setIsPicker(!isPicker);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`comment-creator ${
        parentCommentId ? "comment-creator--response" : ""
      } `}
    >
      <div
        className="comment-creator__avatar"
        style={avatarStyle(isLogged ? user.avatar : "")}
      ></div>
      <div className="comment-creator__content-wrap">
        <ContentEditable
          html={content}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={"Napisz komentarz"}
          className="comment-creator__content input__text-regular"
        />
        <div className="comment-creator__action">
          <div className="comment-creator__action-section">
            {content ? content.length : 0} / 500 &nbsp;
            <i onClick={onClickPicker} className="far fa-smile-beam"></i>
          </div>

          <div className="commet-creator__action-section">
            <PrimaryBtn text="Dodaj" type="small" />
          </div>
        </div>
      </div>
      {isPicker && (
        <Picker
          onSelect={addEmoji}
          title="Pic"
          emoji="point_up"
          style={{ position: "absolute", bottom: "20px", right: "20px" }}
          showPreview={false}
          showSkinTones={false}
          i18n={{
            search: "Wyszukaj",
            showPreview: false,
            showSkinTones: false,
            notfound: "Nie znaleziono",
            categories: {
              recent: "Aktualne",
              search: "Wyniki",
              recent: "Najczęściej używane",
              people: "Buźki",
              nature: "Zwierzęta i natura",
              foods: "Jedzenie i napoje",
              activity: "Aktywność",
              places: "Podróże i miejsca",
              objects: "Obiekty",
              symbols: "Symbole",
              flags: "Flagi",
              custom: "Domyślne",
            },
          }}
        />
      )}
    </form>
  );
};

CommentCreator.propTypes = {
  user: PropTypes.object,
  comments: PropTypes.object,
  createComment: PropTypes.func,
  fetchComments: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { user, comments } = state;
  return { user, comments };
};

const actionCreators = {
  createComment: commentActions.createComment,
  fetchComments: commentActions.fetchComments,
};

export default connect(mapStateToProps, actionCreators)(CommentCreator);
