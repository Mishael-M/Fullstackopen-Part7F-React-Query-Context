/* eslint-disable react/react-in-jsx-scope */
import { createContext, useContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESS_MESSAGE':
      return { ...state, message: action.notification, errorState: false };
    case 'ERROR_MESSAGE':
      return { ...state, message: action.notification, errorState: true };
    case 'CLEAR_MESSAGE':
      return { ...state, message: '', errorState: false };
    default:
      return state;
  }
};
const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: '',
    errorState: false,
  });

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export default NotificationContext;
