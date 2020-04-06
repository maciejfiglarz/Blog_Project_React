import React from "react";

const PostAction = props => {
  const post = props.post;

  return (
    <section className="post-action">
      <div className="post-action__section">
        <div className="post-action__section-item">
          <i className="fas fa-share-square"></i> Udostępnij
        </div>
        <div className="post-action__section-item">
          <i className="fas fa-comment"></i> 23
        </div>
      </div>

      <div className="post-action__section">
        <div className="post-action__section-item">
          <div>
            <i className="fas fa-ellipsis-h"></i>
          </div>
        </div>

        <div className="post-action__section-item">
          <div className="post-action__vote">
            <div className="post-action__vote-item post-action__vote-item--up">
              <i className="fas fa-chevron-up"></i>
            </div>
            <div className="post-action__vote-item post-action__vote-item--separator">
              456346
            </div>
            <div className="post-action__vote-item post-action__vote-item--down">
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostAction;
