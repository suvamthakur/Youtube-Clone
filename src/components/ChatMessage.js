import { FaUserCircle } from "react-icons/fa";

const ChatMessage = ({ messageData }) => {
  const { name, text } = messageData;

  return (
    <div className="flex py-1">
      <div>
        <FaUserCircle className="text-xl mt-.5" />
      </div>
      <div className="text-sm pl-3">
        <span className="mr-3 font-semibold text-neutral-400">{name}:</span>
        <span>{text}</span>
      </div>
    </div>
  );
};
export default ChatMessage;
