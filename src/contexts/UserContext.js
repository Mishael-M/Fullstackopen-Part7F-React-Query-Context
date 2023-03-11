import { createContext, useContext, useReducer } from 'react';

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        name: action.name,
        token: action.token,
        username: action.username,
      };
    case 'REMOVE_USER':
      return (state = null);
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const loggedUserJSON = JSON.parse(
    window.localStorage.getItem('loggedBlogappUser')
  );

  const [user, userDispatch] = useReducer(userReducer, loggedUserJSON);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext);
  return userAndDispatch[0];
};

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext);
  return userAndDispatch[1];
};

export default UserContext;
