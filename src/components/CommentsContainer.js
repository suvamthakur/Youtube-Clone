import { useState } from "react";
import Comment from "./Comment";
import { IoIosArrowDown } from "react-icons/io";

const CommentsContainer = () => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const commentsData = [
    {
      name: "Alex Johnson",
      text: "I found this video very informative!",
      replies: [
        {
          name: "Maria Garcia",
          text: "Great content, keep it up!",
          replies: [],
        },
      ],
    },
    {
      name: "Liam Smith",
      text: "Could you make a video on this topic?",
      replies: [],
    },
    {
      name: "Emma Brown",
      text: "I didn't quite understand the part about...",
      replies: [
        {
          name: "Olivia Davis",
          text: "Amazing video, thank you for sharing!",
          replies: [],
        },
        {
          name: "Sophia Anderson",
          text: "Well explained, I learned a lot.",
          replies: [
            {
              name: "Ethan Taylor",
              text: "I disagree with your point on...",
              replies: [
                {
                  name: "Maria Garcia",
                  text: "Great content, keep it up!",
                  replies: [],
                },
              ],
            },
          ],
        },
      ],
    },

    {
      name: "Noah Wilson",
      text: "This helped me a lot, thanks!",
      replies: [],
    },
    {
      name: "Ava Martinez",
      text: "Can you recommend more resources on this?",
      replies: [
        {
          name: "Ethan Taylor",
          text: "I disagree with your point on...",
          replies: [
            {
              name: "Alex Johnson",
              text: "I found this video very informative!",
              replies: [
                {
                  name: "Maria Garcia",
                  text: "Great content, keep it up!",
                  replies: [],
                },
              ],
            },
            {
              name: "Noah Wilson",
              text: "This helped me a lot, thanks!",
              replies: [],
            },
          ],
        },
      ],
    },

    {
      name: "Sophia Anderson",
      text: "Well explained, I learned a lot.",
      replies: [],
    },
  ];

  // Making another component
  const CommentList = ({ comments }) =>
    comments.map((comment, index) => (
      <div key={index} className="bg-neutral-900 px-2">
        <Comment commentData={comment} />
        <div className="ml-10 pl-2 border-l">
          <CommentList comments={comment.replies} />
        </div>
      </div>
    ));

  return (
    <div>
      <div
        className="flex items-center justify-between bg-neutral-900 mt-4 p-2 cursor-pointer"
        onClick={() => setIsCommentOpen(!isCommentOpen)}
      >
        <h1 className="font-semibold test-lg md:text-2xl">15 Comments</h1>
        <IoIosArrowDown className="text-3xl" />
      </div>
      {isCommentOpen && <CommentList comments={commentsData} />}
    </div>
  );
};
export default CommentsContainer;
