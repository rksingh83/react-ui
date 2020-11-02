import {
    combineReducers
} from 'redux';
import userRecuder from './user/user.reducer';
import fileReducer from './file/file.reducer';
import folderFlagReducer from './shared-folder/folder.reducer';
import notificationReducer from './notifications/notification.reducer';
import notificationCountReducer from './notifications/notification.count.reducer'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {
    persistReducer
} from 'redux-persist'
import contactsReducer from './contacts/contact.reducer'
import currentImageReducer from './file/pageId.reducer';


const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['user'],
    blackList: ['currentFile']
}



const rootReducer = combineReducers({
    user: userRecuder,
    currentFile: fileReducer,
    sharedWithMe: folderFlagReducer,
    contacts: contactsReducer,
    notifications: notificationReducer,
    notificationCount: notificationCountReducer,
    pageId: currentImageReducer
})

export default persistReducer(persistConfig, rootReducer)