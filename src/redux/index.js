import { combineReducers } from "redux";
import {
  currentUserReducer,
  usersListReducer, userReducer,
  uploadsReducer, uploadReducer,
  chatsReducer, chatReducer
} from './reducers';

const reducers = combineReducers({
  currentUser: currentUserReducer,
  usersList: usersListReducer,
  userEdit: userReducer,
  uploads: uploadsReducer,
  uploadDetails: uploadReducer,
  chats: chatsReducer,
  chat: chatReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    return reducers(undefined, action)
  }

  return reducers(state, action)
}

export default rootReducer;
