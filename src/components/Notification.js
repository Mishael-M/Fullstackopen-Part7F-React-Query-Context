import { useNotificationValue } from '../contexts/NotificationContext';

const Notification = () => {
  const acceptedStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const message = useNotificationValue();

  // const message = useSelector((state) => state.notifications);

  if (message.errorState === false && message.message === '') {
    return null;
  }
  if (message.errorState === true) {
    return (
      <div style={errorStyle} className='error'>
        {message.message}
      </div>
    );
  }

  return (
    <div style={acceptedStyle} className='error'>
      {message.message}
    </div>
  );
};

export default Notification;
