

import React from 'react';
import axios from 'axios' ;
import Cookies from 'js-cookie'

const BASE_URL =  'http://3.7.41.59:9082' ;

const Post = (endPoint ,data)=>{
    const AUTH_TOKEN  = Cookies.get('token') ;
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
   return  axios.post(`${BASE_URL}/${endPoint}`,data);
}
const Get = (endPoint)=>{
    const AUTH_TOKEN  = Cookies.get('token') ;
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
     return  axios.get(`${BASE_URL}/${endPoint}`);
}
   
      
export {Post ,Get};
