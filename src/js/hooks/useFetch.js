
import { useEffect, useState } from "react";

export const useFetch = url => {
    const [state, setState] = useState({ data: [], loading: true });
  
    useEffect(() => {
      setState(state => ({ data: state.data, loading: true }));
      fetch(url)
        .then(resp => resp.json())
        .then(resp => {
          setState({ data: resp, loading: false });
        });
    }, [url, setState]);
  
    return state;
  };


  export const useFetchIndex = (url,page) => {
    const [state, setState] = useState({ data: [], loading: true });
  console.log('url',url);
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
