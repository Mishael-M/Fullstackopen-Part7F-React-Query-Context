import { useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
// import { useQuery } from 'react-query';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNotificationDispatch } from './contexts/NotificationContext';
import { useUserDispatch, useUserValue } from './contexts/UserContext';

const App = () => {
  const user = useUserValue();
  const queryClient = useQueryClient();

  const notificationDispatch = useNotificationDispatch();

  const userDispatch = useUserDispatch();

  const result = useQuery(
    'blogs',
    () => {
      if (user !== null) {
        blogService.setToken(user.token);
        return blogService.getAll();
      }
    },
    { refetchOnWindowFocus: false }
  );
  let blogs = [];
  if (result.data) {
    blogs = result.data.sort((a, b) => b.likes - a.likes);
  }

  const getBlogMutation = useMutation(blogService.getAll, {
    onSuccess: (blogs) => {
      queryClient.setQueryData('blogs', blogs);
    },
  });

  const newBlogMutation = useMutation(blogService.createBlog, {
    onSuccess: () => {
      // Fix for getting delete button
      getBlogMutation.mutate();
    },
  });

  const updateBlogMutation = useMutation(blogService.updateBlog, {
    onSuccess: () => {
      // Fix for getting delete button
      getBlogMutation.mutate();
    },
  });

  const deleteBlogMutation = useMutation(blogService.deleteBlog, {
    onMutate: (data) => {
      const blogs = queryClient.getQueryData('blogs');
      queryClient.setQueryData(
        'blogs',
        blogs.filter((blog) => blog.id !== data)
      );
    },
  });

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    userDispatch({ type: 'REMOVE_USER' });
    // dispatch(removeUser());
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();

    newBlogMutation.mutate({
      ...blogObject,
    });
    notificationDispatch({
      type: 'SUCCESS_MESSAGE',
      notification: `A New Blog: ${blogObject.title} by ${blogObject.author} has been added!`,
    });
    setTimeout(() => {
      notificationDispatch({
        type: 'CLEAR_MESSAGE',
      });
    }, 5000);
  };

  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} user={user} />
    </Togglable>
  );

  const updateLikesOf = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
  };

  return (
    <div>
      {user === null ? (
        <LoginForm getBlogMutation={getBlogMutation} />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} is logged in
            <button onClick={handleLogout} id='logout-button'>
              Logout
            </button>
          </p>
          <Notification />
          {blogForm()}
          {result.isLoading ? (
            <>loading data...</>
          ) : (
            <div>
              {blogs.map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  user={user}
                  deleteBlogMutation={deleteBlogMutation}
                  blogs={blogs}
                  updateLikes={() => updateLikesOf(blog.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
