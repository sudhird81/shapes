import axios from 'axios';

export const fetchShapesApi = () => {
    return axios.get('http://localhost:3000/json/shapes.json')
    .then((response)=>{
      return response;
    })
    .catch((error)=>{
      return error;
    });
}