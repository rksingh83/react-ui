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

export {
  getNotifications,
  getAlertNotifications
}