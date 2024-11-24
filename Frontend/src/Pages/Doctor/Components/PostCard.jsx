import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const PostCard = ({ post }) => {
  return (
    <div className="post-card justify-between flex bg-cyan-200 p-4 border rounded-lg shadow-md">
      <div>
        <h4 className="text-xl">
          <strong>Title: </strong>
          {post.title}
        </h4>
        <p>
          <strong>Content: </strong>
          {post.content}
        </p>
        <p className="text-sm">
          <strong>Created At: </strong>
          {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faThumbsUp}
            className={"text-lg text-blue-500"}
          />
          <span className="ml-2">{post.likes?.length} Likes</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
