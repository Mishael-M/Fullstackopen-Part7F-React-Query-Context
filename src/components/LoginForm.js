import { useState } from 'react';
import { useNotificationDispatch } from '../contexts/NotificationContext';
import { useUserDispatch } from '../contexts/UserContext';
import blogService from '../services/blogs';
import loginService from '../services/login';
import Notification from './Notification';

const LoginForm = ({ getBlogMutation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const notificationDispatch = useNotificationDispatch();

  const userDispatch = useUserDispatch();

  // const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      userDispatch({
        type: 'UPDATE_USER',
        name: user.name,
        token: user.token,
        username: user.username,
      });
      // dispatch(userChange(user));
      getBlogMutation.mutate();

      setUsername('');
      setPassword('');
      // const response = await blogService.getAll();
      // dispatch(blogChange(response.sort((a, b) => b.likes - a.likes)));
    } catch (exception) {
      notificationDispatch({
        type: 'ERROR_MESSAGE',
        notification: 'Wrong Username or Password',
      });

      // Removes notification
      setTimeout(() => {
        notificationDispatch({
          type: 'CLEAR_MESSAGE',
        });
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Log in to Application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            id='password'
            type='password'
            value={password}
            name='current-password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit' id='login-button'>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
