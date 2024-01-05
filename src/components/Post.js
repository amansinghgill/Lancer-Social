import React, { useState } from "react";
import supabase from "../supabase/supabase";
import { CATEGORIES } from "../constants/categories";

function Post({ post, setPosts }) {
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleVote(columnName) {
    const hasVoted = localStorage.getItem(`voted_${post.id}`);

    if (hasVoted) {
      alert("You have already voted on this post.");
      return;
    }

    setIsUpdating(true);
    const { data: updatedPost, error } = await supabase
      .from("posts")
      .update({ [columnName]: post[columnName] + 1 })
      .eq("id", post.id)
      .select();
    setIsUpdating(false);

    if (!error)
      setPosts((posts) =>
        posts.map((f) => (f.id === post.id ? updatedPost[0] : f))
      );

    localStorage.setItem(`voted_${post.id}`, "true");
  }

  return (
    <li className="post">
      <p>
        {post.text}
        <a className="link" href={post.link} target="_blank">
          (Link)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === post.category)
            .color,
        }}
      >
        {post.category}
      </span>
      <div className="vote-buttons">
        <button onClick={() => handleVote("votesUp")} disabled={isUpdating}>
          👍 {post.votesUp}
        </button>
        <button onClick={() => handleVote("votesMid")} disabled={isUpdating}>
          😐 {post.votesMid}
        </button>
        <button onClick={() => handleVote("votesDown")} disabled={isUpdating}>
          👎 {post.votesDown}
        </button>
      </div>
    </li>
  );
}

export default Post;
