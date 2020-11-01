import {
  Post,
  Get
} from './service.setup';


const getAllPendingPageList = async (ROLE) => {
  try {
    const URL = ROLE != 'labeller'?'getAllPendingPageList':'getAllUserImages' ;
     const response =  await Get(URL);

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
const updateByAdmin = async (flag) => {
  try {
    
    return await Post("/admin_updated" ,{admin_updated:flag});

  } catch (e) {
    //alert("Something went wrong try latter")
  }
}


export {
  getAllPendingPageList ,
  getPendingPageById ,
  updateByAdmin
}