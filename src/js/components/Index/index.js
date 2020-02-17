import React, { useEffect } from "react";
import Post from "./../Post";
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
        data.map((post) => {
          return  <Post key={post.id} post={post} />;
        })}
    </div>
  );
};

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Index);
