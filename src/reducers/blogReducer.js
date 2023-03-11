export const blogChange = (blog) => {
  return {
    type: 'UPDATE_BLOGS',
    payload: blog,
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_BLOGS':
      return action.payload;
    default:
      return state;
  }
};

export default blogReducer;
