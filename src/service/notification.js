import {
  Post,
  Get
} from './service.setup';



const getNotifications = async () => {
  try {
    return await Get("markAllNotificationsRead");
  } catch (e) {

  }

}

const getAlertNotifications = async () => {
  try {
    return await Get("getAlertNotification");
  } catch (e) {

  }

}
const getUserId = async () => {
  try {
    return await Get("getUserProfileByToken");
  } catch (e) {

  }

}




export {
  getNotifications,
  getAlertNotifications ,
  getUserId
}