import React, { useEffect, useState, useCallback } from "react";
import Post from "./../Post";
import { connect } from "react-redux";
import Creator from "./../Creator";
import { useFetch, useFetchIndex } from "./../../hooks/useFetch";
import InfinityList from "./../InfinityList";
import {Link} from "react-router-dom";

const Index = props => {
  const [page, setPage] = useState(1);
  // const { data, loading } = useFetchIndex(`http://localhost:3000/posts?_page=${page}&_limit=3_sort=id&_order=desc`);
  const [url, setUrl] = useState(
    `http://localhost:3000/posts?_page=${page}&_limit=3_sort=id&_order=desc`
  );
  const [state, setState] = useState([]);

  
  return (
    <div className="container">
      <div className="creator-redirect">
        <Link to="/dodaj">Creator</Link>
      </div>
      {/* <Creator /> */}
      <InfinityList />
    </div>
  );
};



const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Index);
