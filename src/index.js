import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import App from './App';
import { NotificationContextProvider } from './contexts/NotificationContext';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';
import { UserContextProvider } from './contexts/UserContext';

const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
});

const store = createStore(reducer);
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <NotificationContextProvider>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <App />
          </Provider>
        </QueryClientProvider>
      </NotificationContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
