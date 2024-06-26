import { useDispatch, useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import { useEffect, useState } from "react";
import { addMessage } from "../utils/chatSlice";
import { messages } from "../utils/helper";
import { BiSend } from "react-icons/bi";

const LiveChatBox = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const messageList = useSelector((store) => store.chat.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      const message = messages[Math.floor(Math.random() * messages.length)];
      dispatch(
        addMessage({
          name: message.name,
          text: message.text,
        })
      );
    }, 1500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="border border-neutral-700 rounded-xl h-96 relative mt-4 lg:mt-0">
      <div className="py-3 px-4 border-b border-neutral-700">Live chat</div>
      <div className="py-2 px-4 h-[71%] flex flex-col-reverse overflow-y-auto overscroll-y-contain">
        {messageList.map((data, index) => (
          <ChatMessage key={index} messageData={data} />
        ))}
      </div>
      <form
        className="w-full border border-neutral-700 rounded-b-xl py-3 px-4 flex items-center absolute bottom-0"
        onSubmit={(e) => {
          e.preventDefault();

          dispatch(
            addMessage({
              name: "Tester",
              text: liveMessage,
            })
          );
          setLiveMessage("");
        }}
      >
        <input
          type="text"
          className="bg-zinc-900 border px-3 py-1.5 outline-none border-none w-3/4 rounded-full"
          placeholder="Chat"
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
        />
        <button>
          <BiSend className="text-3xl ml-2" />
        </button>
      </form>
    </div>
  );
};

export default LiveChatBox;
