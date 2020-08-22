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
const GetGroupMember = async (groupId) => {
  try {
    const response = await Post('/getAllUserGroupMembers', {
      groupId
    });
    return response;
  } catch (e) {

  }
}
const AddMemberToGroup = (ids, groupID) => {
  let profileList = [];
  ids.forEach(id => {
    profileList.push({
      id
    })
  });
  const request = {
    groupID,
    profileList
  };
  return Post('/addUserGroupMembers', request);
}
export {
  CreateGroup,
  GetAllGroups,
  EditGroup,
  GetGroupMember,
  AddMemberToGroup

}