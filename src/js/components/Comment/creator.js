import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { PrimaryBtn } from "../../containers/buttons";
import emptyAvatar from "./../../../images/empty-avatar.jpeg";
import PropTypes from "prop-types";
import { uploadsUrl } from "./../../constants/types";
import commentActions from "./../../store/comment/action";
import { TextArea } from "./../../containers/form";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { Emoji } from 'emoji-mart
const CommentCreator = ({
  post,
  setData,
  comments,
  user,
  createComment,
  fetchComments,
}) => {
  const [content, setContent] = useState();
  const [commentPage, setCommentPage] = useState(0);

  const postId = post._id;
  const addEmoji = (e) => {
    let emoji = e.native;
    console.log("native", emoji);
    // this.setState({
    //   text: this.state.text + emoji,
    // });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("comment", content, user, postId);
    createComment({ content, user, postId });

    // axios
    //   .post(`${serverUrl}/comment`, {
    //     post: postId,
    //     content: content,
    //   })
    //   .then((resp) => {
    //     setData([...props.comments, ...resp.data.comment]);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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

  return (
    <form onSubmit={handleSubmit} className="comment-creator">
      <Emoji emoji=':thumbsup:' size={64} />"
      <div
        className="comment-creator__avatar"
        style={avatarStyle(user.avatar)}
      ></div>
      <div className="comment-creator__content-wrap">
        <TextArea
          onChange={(e) => setContent(e.target.value)}
          name="content"
          value={content}
          className="comment-creator__content"
          placeholder="Napisz komentarz..."
        />
        <div className="comment-creator__action">
          <div className="comment-creator__action-section">
            {content ? content.length : 0} / 500
          </div>

          <div className="commet-creator__action-section">
            <PrimaryBtn text="Dodaj" type="small" />
          </div>
        </div>
      </div>
      <Picker
        onSelect={addEmoji}
        title="Pic"
        emoji="point_up"
        style={{ position: "absolute", bottom: "20px", right: "20px" }}
        showPreview={false}
        showSkinTones={false}
        i18n={{
          search: "Wyszukaj",
          showPreview:false,
          showSkinTones:false,
          notfound: 'Nie znaleziono',
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
      />
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
