import Heading from "../components/Heading";
import IndividualNotifications from "../components/IndividualNotifications";
import dummyNotifications from "../dummyNotifications";
import { subscribeToMessagesFromUser } from "../services/apiNotifications";

function Notifications() {
  let notifications = dummyNotifications;
  const n = subscribeToMessagesFromUser("virat.kohli");
  // notifications = [];
  return (
    <div className=" w-full p-4 mb-12 mt-2">
      <Heading>Notifications</Heading>
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-2xl">No notifications</p>
      ) : (
        notifications.map((notification) => (
          <IndividualNotifications
            key={notification.id}
            notification={notification}
          />
        ))
      )}
    </div>
  );
}

export default Notifications;
