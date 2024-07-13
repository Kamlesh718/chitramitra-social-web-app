import Heading from "./Heading";
import FollowingList from "./FollowingList";

function ChatList() {
  return (
    <div>
      <Heading>Chat List</Heading>
      <FollowingList route="/chat" />
    </div>
  );
}

export default ChatList;
