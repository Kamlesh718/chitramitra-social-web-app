function IndividualNotifications({ notification }) {
  const notificationTypeStyles = {
    like: "bg-blue-100 border-blue-400 text-blue-700",
    message: "bg-green-100 border-green-400 text-green-700",
    follow: "bg-yellow-100 border-yellow-400 text-yellow-700",
  };

  return (
    <div
      className={`border-l-4 p-4 ${
        notificationTypeStyles[notification.type]
      } mb-4 shadow-2xl rounded-lg flex items-center`}
    >
      <div className="flex-1">
        {notification.type === "like" && (
          <p className="text-sm">
            <strong>{notification.user}</strong> liked your post{" "}
            <strong>{notification.post}</strong>
          </p>
        )}
        {notification.type === "message" && (
          <p className="text-sm">
            <strong>{notification.user}</strong> messaged you:
            {notification.message}
          </p>
        )}
        {notification.type === "follow" && (
          <p className="text-sm">
            <strong>{notification.user}</strong> started following you
          </p>
        )}
        <p className="text-xs text-gray-500">
          {new Date(notification.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default IndividualNotifications;
