import React, { useState, useRef, useEffect } from "react";
import { domainUrl } from "./../../../constants/types";
import useComponentVisible from "./../../../hooks/useComponentVisible";
import { CopyToClipboard } from "react-copy-to-clipboard";

const PostShare = ({ postId, title }) => {
  //   const [isShareVisible, setIsShareVisible] = useState(false);
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);
  const getUrl = () => {
    return `${domainUrl}/post/${postId}`;
  };
  const onClickShareFb = () => {
    const href = `https://www.facebook.com/sharer/sharer.php?u=${getUrl()}&t=${title}&app_id=2074756775960224`;
    window.open(
      href,
      "",
      "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600"
    );
  };

  return (
    <div className="post-action__share-wrap">
      <div
        onClick={() => setIsComponentVisible(!isComponentVisible)}
        ref={ref}
        className="post-action__share-init"
      >
        <i className="fas fa-share-square"></i> Udostępnij
      </div>

      {isComponentVisible && (
        <ul className="post-action__share">
          <li onClick={onClickShareFb} className="post-action__share-item">
            <i class="fab fa-facebook-square"></i> Wrzuć na fejsa
          </li>
          <CopyToClipboard text={getUrl()}>
            <li className="post-action__share-item">
              <i class="fas fa-link"></i> Kopiuj link
            </li>
          </CopyToClipboard>
        </ul>
      )}
    </div>
  );
};

export default PostShare;
