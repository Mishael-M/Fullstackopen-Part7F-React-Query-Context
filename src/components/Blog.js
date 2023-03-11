import { useState } from 'react';
import { useNotificationDispatch } from '../contexts/NotificationContext';

//TODO Update notifications
const Blog = ({ blog, user, deleteBlogMutation, updateLikes }) => {
  const [visible, setVisible] = useState(false);

  const notificationDispatch = useNotificationDispatch();

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 5,
  };

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog: ${blog.title} by ${blog.author}`)) {
      // const response = await blogService.deleteBlog(blog.id);
      deleteBlogMutation.mutate(blog.id);

      notificationDispatch({
        type: 'ERROR_MESSAGE',
        notification: `The blog ${blog.title} by ${blog.author} has been deleted!`,
      });
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_MESSAGE' });
      }, 5000);

      // dispatch(blogChange(blogs.filter((blog) => blog.id !== response.id)));
    }
  };

  const showBlog = () => (
    <>
      <p>{blog.url}</p>
      <p>
        Likes {blog.likes}{' '}
        <button onClick={updateLikes} className='likeButton'>
          Like
        </button>
      </p>
      <p>{blog.user.name}</p>
      {blog.user.username === user.username ? (
        <button onClick={deleteBlog} id='deleteButton'>
          Delete
        </button>
      ) : null}
    </>
  );

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}{' '}
      {visible ? (
        <>
          <button onClick={toggleVisibility} className='togglableContent'>
            Hide
          </button>
          {showBlog()}
        </>
      ) : (
        <button onClick={toggleVisibility} id='viewButton'>
          View
        </button>
      )}
    </div>
  );
};

export default Blog;
