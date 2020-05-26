import React, { useEffect, useState } from "react";

const useFacebookComment = ({ postId }) => {
  useEffect(() => {
    const fbSDK = (d, s, id) => {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src =
        "//connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v3.6&appId=xxxxxxxxxx";
      fjs.parentNode.insertBefore(js, fjs);
    };
    fbSDK(document, "script", "facebook-jssdk");
 
  }, []);

  return (
    <div className="comment-facebook">
      <div id="fb-root"></div>
      <div
        className="fb-comments"
        data-href={`http://www.example.com`}
        data-colorscheme="dark"
        data-width="100%"
        data-numposts="2"
        data-order-by="reverse_time"
      ></div>
    </div>
  );
};

export default useFacebookComment;
