import { useEffect, useState } from "react";
import ChatInput from "../components/ChatInput";
import { useParams } from "react-router-dom";
import { useFetchUsers } from "../hooks/follow/useFetchUsers";
import { useSendMessages } from "../hooks/chat/useSendMessages";
import { useUsername } from "../hooks/profile/useUsername";
import { useFetchMessages } from "../hooks/chat/useFetchMessages";
import { convertToIST } from "../utils/timestamp";
import { TrashIcon } from "@heroicons/react/16/solid";
import { useDeleteMessage } from "../hooks/chat/useDeleteMessage";

function Chat() {
  const { username } = useParams();
  const { fetchUsers } = useFetchUsers(username);
  const { sendMessage, isSendingMessage } = useSendMessages();
  const { username: sender } = useUsername();
  const { getMessages, isFetchingMessages } = useFetchMessages(
    sender?.username,
    username
  );
  const { deleteMessage, isDeletingMessage } = useDeleteMessage();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (getMessages && !isFetchingMessages) {
      setMessages(getMessages);
    }
  }, [getMessages, isFetchingMessages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const formData = {
      sender: sender?.username,
      recipient: username,
      content: input,
    };

    sendMessage(formData);
    setMessages([...messages, { content: input, sender: sender?.username }]);
    setInput("");
  };

  const handleDeleteMessage = function (id) {
    deleteMessage(id);
  };

  return (
    <div className="flex flex-col h-[82vh] sm:h-[85vh] w-full lg:h-[92vh] max-w-lg mx-auto rounded-lg border-2 border-[#1abc9c]">
      {fetchUsers?.map((user) => (
        <>
          <div
            className="flex bg-[#1abc9c] mb-4 p-2 items-center"
            key={user.id}
          >
            <img
              src={user.avatar}
              alt={`${user.username}'s avatar`}
              className="w-12 h-12 rounded-full mr-2"
            />
            <span className="font-semibold">{user.username}</span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto ">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-2 p-2 rounded-lg  max-w-xs text-gray-800  ${
                  message.sender_username === sender?.username
                    ? "bg-[#1abc9c] self-end text-right"
                    : "bg-gray-200 self-start text-left"
                }`}
              >
                {message.sender_username === sender?.username ? (
                  <button
                    onClick={() => handleDeleteMessage(message.id)}
                    disabled={isDeletingMessage}
                  >
                    <TrashIcon className="size-5 cursor-pointer" />
                  </button>
                ) : null}

                {message.content}

                {message.sender_username === sender?.username ? (
                  <p className="text-sm">you</p>
                ) : (
                  <p className="text-sm">{message.sender_username}</p>
                )}

                <p className="text-sm">{convertToIST(message.created_at)}</p>
              </div>
            ))}
          </div>
        </>
      ))}
      <ChatInput
        isSendingMessage={isSendingMessage}
        handleSendMessage={handleSendMessage}
        input={input}
        setInput={setInput}
      />
    </div>
  );
}

export default Chat;
