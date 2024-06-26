import { FaUserCircle } from "react-icons/fa";

const Comment = ({ commentData }) => {
  const { name, text } = commentData;

  return (
    <div className="flex py-3">
      <div>
        <FaUserCircle className="text-white text-4xl" />
      </div>
      <div className="ml-3">
        <p className="font-semibold text">{name}</p>
        <p>{text}</p>
        {/* <div className="my-2 mx-1border-l border-l-slate-400">
          {replies.map((reply) => (
            <Comment commentData={reply} />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Comment;
