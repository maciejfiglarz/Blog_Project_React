import React from "react";
import {
    useParams
  } from "react-router";

const Single = props => {
    let { id } = useParams();
    console.log(id);
    return (
        <div>

        </div>
    );

}

export default Single;