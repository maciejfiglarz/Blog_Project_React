import React, { useEffect,useState,useCallback } from "react";
import Post from "./../Post";
import { connect } from "react-redux";
import Creator from "./../Creator";
import { useFetch,useFetchIndex  } from "./../../hooks/useFetch";
import InfiniteList from "./../../containers/infinity-list";

const Index = props => {
  const [ page, setPage ] = useState(1);
  // const { data, loading } = useFetchIndex(`http://localhost:3000/posts?_page=${page}&_limit=3_sort=id&_order=desc`);
  const [url,setUrl] = useState(`http://localhost:3000/posts?_page=${page}&_limit=3_sort=id&_order=desc`);
  const [state, setState] = useState([]);

  // const handleUserKeyPress = useCallback(event => {
  //   console.log('init');
 
  //   const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
  //   const body = document.body;
  //   const html = document.documentElement;
  //   const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  //   const windowBottom = windowHeight + window.pageYOffset;
  //   // console.log(windowBottom , docHeight);
  //   // if (windowBottom >= docHeight) {
  //     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
  //     console.log('setpage');
  //     setPage(page+1); 
  //   } 
  // });


  // useEffect(() => {
  //   window.addEventListener('scroll', handleUserKeyPress);
  //   return () => {
  //     window.removeEventListener('scroll', handleUserKeyPress);
  //   };
  // }, [handleUserKeyPress]);


  // useEffect(()=>{
  // //  return  window.addEventListener("scroll", handleScroll);
  // setPage(page+3); 
  // window.addEventListener("scroll", ()=>{
  //   const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
  //   const body = document.body;
  //   const html = document.documentElement;
  //   const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  //   const windowBottom = windowHeight + window.pageYOffset;
  //   console.log(windowBottom,docHeight);
  //   // if (windowBottom >= docHeight) {
  //     console.log('bottom');
  //     console.log('page',page);
  //     setPage(page+3); 
   
  //   // } 
  //   });

  // },[]);


  return (

    <div className="container">
         {/* <button
      onClick={() => {
        setPage(page + 1);
      }}
    >
      {page}
    </button>
      <Creator />
      <div>{loading ? "Ładuję..." : ""}</div>
   
      {data &&
        data.map((post) => {
          //  console.log('data',data);
          return  <Post key={post.id} post={post} />;
        })} */}
              <Creator />
      {/* <div>{loading ? "Ładuję..." : ""}</div> */}
   4
            <InfiniteList state={state} setState={setState}/>
    </div>
  );




};

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Index);
