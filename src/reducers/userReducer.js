export const userChange = (user) => {
  return {
    type: 'UPDATE_USER',
    payload: user,
  };
};

export const removeUser = () => {
  return {
    type: 'REMOVE_USER',
    payload: null,
  };
};
const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
const userReducer = (state = JSON.parse(loggedUserJSON), action) => {
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

export default userReducer;
