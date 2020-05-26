import React from "react";
import { FacebookProvider, EmbeddedPost, EmbeddedVideo } from "react-facebook";
import { TwitterTweetEmbed } from "react-twitter-embed";

const prepareNodeList = (content) => {
  let preparedContent = [];
  if (content.length > 0) {
    let contentHTML = document.createElement("div");
    contentHTML.innerHTML = content;
    // preparedContent = prepareEmbed(contentHTML);
    preparedContent = contentHTML.querySelectorAll(":scope > *");
  }
  return preparedContent;
};

const prepareImage = (figure) => {
  const img = figure.querySelector("img");
  const url = img.getAttribute("src");
  return `<div class="post-content__image"><img src="${url}"/></div>`;
};

const prepareEmbed = (figure) => {
  const embed = figure.querySelector("oembed");

  const url = embed.getAttribute("url");
  const type = getType(url);
  let preparedEmbed = "";

  if (type == "youtube") {
    preparedEmbed = prepareYoutubeEmbed(url);
  } else if (type == "twitter") {
    preparedEmbed = prepareTwitterEmbed(url);
  } else if (type == "facebookVideo") {
    preparedEmbed = prepareFacebookEmbedVideo(url);
  } else if (type == "facebookPost") {
    preparedEmbed = prepareFacebookEmbedPost(url);
  }

  return preparedEmbed;
};

const prepareFacebookEmbedVideo = (url) => (
  <div className="post-content__embed post-content__embed--background">
    <FacebookProvider appId="547365419500037">
      <EmbeddedVideo
        href={url}
        // width="100%"
        // height="auto"
        // allow="encrypted-media"
        // allowtransparency="false"
      />
    </FacebookProvider>
  </div>
);

const prepareFacebookEmbedPost = (url) => {
  console.log("url", url);
  return (
    <div className="post-content__embed post-content__embed--background">
      <FacebookProvider appId="547365419500037">
        <EmbeddedPost
          href={url}
          // width="500"
          // height="300"
          // allow="encrypted-media"
          // allowtransparency="false"
        />
      </FacebookProvider>
    </div>
  );
};
const isYoutube = (figure) => {
  let type = "";
  const embed = figure.querySelector("oembed");
  if (embed) {
    const url = embed.getAttribute("url");
    type = getType(url);
  }

  return type == "youtube" ? true : false;
};
const prepareTwitterEmbed = (url) => {
  const urlParams = url.split("/");
  const id = urlParams[urlParams.indexOf("status") + 1];
  return (
    <div className="post-content__embed">
      <TwitterTweetEmbed tweetId={id} />
    </div>
  );
};

const prepareYoutubeEmbed = (url) => {
  const youtubeID = getYoutubeIDFromUrl(url);
  console.log("ytID", youtubeID);
  let el = document.createElement("div");
  el.innerHTML = `<div class="post-content__embed"><iframe width="100%" height="350" src="https://www.youtube.com/embed/${youtubeID}" frameborder="0" allow="accelerometer; autoplay; 
      encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
  return el;
};

const getYoutubeIDFromUrl = (url) => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
};

const getType = (embed) => {
  if (embed.toString().includes("you")) {
    return "youtube";
  } else if (embed.toString().includes("twitter")) {
    return "twitter";
  } else if (
    embed.toString().includes("facebook") &&
    embed.toString().includes("videos")
  ) {
    return "facebookVideo";
  } else if (embed.toString().includes("facebook")) {
    return "facebookPost";
  }
};

export { prepareNodeList, prepareEmbed, isYoutube, prepareImage };
