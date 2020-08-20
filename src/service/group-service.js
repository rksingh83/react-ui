import {
  Post,
  Get
} from './service.setup';


const CreateGroup = async (name, des) => {
  try {
    const response = await Post("/createUserGroup", {
      group_name: name,
      group_description: des,

    });
    return response;
  } catch (e) {
    alert("Something went wrong try latter")
  }
}

const GetAllGroups = async () => {
  try {
    const response = await Get('showAllUserGroup');
    return response;
  } catch (e) {

  }
}

const EditGroup = async (data) => {
  try {
    const response = await Post('/editUserGroup', data);
    return response;
  } catch (e) {

  }
}
export {
  CreateGroup,
  GetAllGroups,
  EditGroup
}