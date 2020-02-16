import React, { useEffect } from "react";
import Posts from "./../../containers/posts";
import { connect } from "react-redux";
import Creator from "./../Creator";


const Index  = (props) => {
 

  useEffect( ()=>{

  })
  
    return (
      <div className={'container'}>
         <Creator />
      </div>
    );
  };

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Index);
