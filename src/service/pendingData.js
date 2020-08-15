import {
  Post,
  Get
} from './service.setup';


const getAllPendingPageList = async () => {
  try {
     const response =  await Get("getAllPendingPageList");

     return response ;

  } catch (e) {
    alert("Something went wrong try latter")
  }
}


const getPendingPageById = async (id) => {
  try {
     if(!id)
       return false
    return await Post("/getPageLookup" ,{id});

  } catch (e) {
    alert("Something went wrong try latter")
  }
}



export {
  getAllPendingPageList ,
  getPendingPageById
}