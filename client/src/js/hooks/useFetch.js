
import { useEffect, useState } from "react";
import API from "./../helper/api";
export const useFetch = url => {
    const [state, setState] = useState({ data: [], loading: true });
  
    useEffect(() => {
      setState(state => ({ data: state.data, loading: true }));
      API.post(url)
        .then(resp => resp.json())
        .then(resp => {
          setState({ data: resp, loading: false });
        });
    }, [url, setState]);
  
    return state;
  };


  export const useFetchIndex = (url,page) => {
    const [state, setState] = useState({ data: [], loading: true });

    useEffect(() => {
      setState(state => ({ data: state.data, loading: true }));
      fetch(url)
        .then(resp => resp.json())
        .then(resp => {
          const currentData = page >1 ? [...currentData,...resp] : resp;
          setState({ data: currentData, loading: false });
        });
    }, [url, setState]);
  
    return state;
  };
