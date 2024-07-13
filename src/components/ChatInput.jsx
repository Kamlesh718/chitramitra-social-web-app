import SmallLoader from "./SmallLoader";

function ChatInput({ handleSendMessage, input, setInput, isSendingMessage }) {
  return (
    <form
      className="flex p-4 border-2 border-t-[#1abc9c] border-[#0000]"
      onSubmit={handleSendMessage}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="py-1 px-8 rounded-sm w-full text-gray-700 shadow-lg shadow-[#1abc9c44] cursor-text focus:accent-[#1abc9c] focus:caret-[#1abc9c]"
      />
      <button
        type="submit"
        className="ml-2 p-2 bg-[#1abc9c] py-2 px-3  rounded-md"
      >
        {isSendingMessage ? <SmallLoader /> : "Send"}
      </button>
    </form>
  );
}

export default ChatInput;
