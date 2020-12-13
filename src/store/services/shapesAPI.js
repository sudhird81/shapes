import axios from 'axios';

export const fetchShapesApi = () => {
    return axios.get(`${window.location.origin}/json/shapes.json`)
    .then((response)=>{
      return response;
    })
    .catch((error)=>{
      return error;
    });
}