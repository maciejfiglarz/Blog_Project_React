import React, { useEffect } from "react";
import Post from '../Post';
import { useFetch } from "../../hooks/useFetch";
import { domainUrl } from "../../constants/types";

const Single = props => {
    // let { id } = useParams();
    let id = props.match.params.id;
    console.log('id',id);
    const { data, loading } = useFetch(`${domainUrl}posts/${id}`);
    // console.log('post',data,`${domainUrl}posts/${id}`,loading);
    return (
        <div className="container">
            {data ? <Post key={id} post={data}/>:''}
        </div>
    );

}

export default Single;