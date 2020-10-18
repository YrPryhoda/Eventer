import { NotificationManager } from 'react-notifications';

const renderNotification = (type, message) => {
  const title = type[0].toUpperCase() + type.slice(1);
  return NotificationManager[type](
    message,
    title,
    4000
  );
}

export default renderNotification
