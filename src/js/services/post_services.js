import {domainUrl} from "./../constants/types";
import axios from 'axios'
export const insertPost = (imageID,description) => {
   axios.post('http://localhost:3000/posts', {
    // id: 6,
    author: "typicode2",
    description: description,
    imageID: imageID
}).then(resp => {
    console.log(resp.data);
}).catch(error => {
    console.log(error);
});  
};