import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { PrimaryBtn } from "../../containers/buttons";
import emptyAvatar from "./../../../images/empty-avatar.jpeg";
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
}) => {
  const [content, setContent] = useState("");
  const [commentPage, setCommentPage] = useState(0);
  const [isPicker, setIsPicker] = useState(false);

  const postId = post._id;
  const addEmoji = (e) => {
    console.log(e);
    let sym = e.unified.split("-");
    let codesArray = [];

    sym.forEach((el) => codesArray.push("0x" + el));
    //console.log(codesArray)  // ["0x1f3f3", "0xfe0f"]
    let emojiPic = String.fromCodePoint(...codesArray); //("0x1f3f3", "0xfe0f")
    console.log("....", content, emojiPic);
    setContent(content + emojiPic);
    setIsPicker(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("comment", content, user, postId);
    createComment({ content, user, postId });
  };
  useEffect(() => {
    const fetchCommentsForPost = async () => {
      const result = await fetchComments({ postId, commentPage });
      console.log("commentResult", result);
    };
    fetchCommentsForPost();
  }, [commentPage]);

  const avatarStyle = (photo) => {
    const imageUrl = photo ? `${uploadsUrl}/avatar/${photo}` : emptyAvatar;
    return {
      backgroundImage: `url('${imageUrl}')`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
    };
  };

  // const onChangeContent = (e) => {
  //   console.log("test", e.target.innerText);
  //   setContent(e.target.innerText);
  // };
  const text = useRef("");

  const handleChange = (evt) => {
    setContent(evt.target.value);
  };

  const handleBlur = () => {
    console.log(content);
  };

  const onClickPicker = () => {
    setIsPicker(!isPicker);
  };

  return (
    <form onSubmit={handleSubmit} className="comment-creator">
      {/* <Emoji emoji=':mask:' size={12} /> */}
      <div
        className="comment-creator__avatar"
        style={avatarStyle(user.avatar)}
      ></div>
      <div className="comment-creator__content-wrap">
        {/* <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message here then hit ENTER"
        /> */}

        {/* <div contentEditable={true}>
          Looks good to me
          <span
            contentEditable={true}
            dangerouslySetInnerHTML={{
              __html: Emoji({
                html: true,
                set: "apple",
                emoji: "+1",
                size: 12,
              }),
            }}
          ></span> fesfesfesfsef sefsefsef es
        </div> */}
        {/* <div
          className="comment-creator__content input__text-regular"
          onInput={onChangeContent}
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          {content}
        </div> */}

        {/* <TextArea
          onChange={(e) => setContent(e.target.value)}
          name="content"
          value={content}
          className="comment-creator__content"
          placeholder="Napisz komentarz..."
        /> */}
        <ContentEditable
          html={content}
          onBlur={handleBlur}
          onChange={handleChange}
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
