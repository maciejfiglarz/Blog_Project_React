import React, { useEffect } from "react";
import Posts from "./../../containers/posts";
import { connect } from "react-redux";
import Creator from "./../Creator";
import { useFetch } from "./../../hooks/useFetch";

const Index = props => {
  const { data, loading } = useFetch("http://localhost:3000/posts");

  return (
    <div className={"container"}>
      <Creator />
      <div>{loading ? "Ładuję..." : ""}</div>
      {data &&
        data.map((post, i) => {
          console.log(post);
          return  <article className={"post"} key={post.id}>
            <div className={"post__image"}></div>
            <h1 className={"post__title"}>{post.title}</h1>
            </article>;
        })}
    </div>
  );
};

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Index);
