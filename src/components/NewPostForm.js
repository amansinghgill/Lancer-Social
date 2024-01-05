import React, { useState } from "react";
import isValidHttpUrl from "../utilities/isValidHttpUrl";
import { CATEGORIES } from "../constants/categories";
import supabase from "../supabase/supabase";

function NewPostForm({ setPosts, setShowForm }) {
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    // 1. Prevent browser reload
    e.preventDefault();

    // 2. Check if data is valid. If so, create a new post
    if (text && category && textLength <= 200) {
      // Check link validity if it's not empty
      if (link && !isValidHttpUrl(link)) {
        alert("Please enter a valid link.");
        return;
      }
      // 3. Create a new post object
      // const newPost = {
      //   id: Math.round(Math.random() * 10000),
      //   text,
      //   link,
      //   category,
      //   votesUp: 0,
      //   votesMid: 0,
      //   votesDown: 0,
      // };

      // 3. Upload a post to Supabase and recieve the new post object
      setIsUploading(true);
      const { data: newPost, error } = await supabase
        .from("posts")
        .insert([{ text, link, category }])
        .select();
      setIsUploading(false);

      // 4. Add the new post to the UI: add the post to state
      if (!error) setPosts((posts) => [newPost[0], ...posts]);

      // 5. Reset input fields
      setText("");
      setLink("");
      setCategory("");

      // 6. Close the form
      setShowForm(false);
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        value={link}
        type="text"
        placeholder="Link (Optional)"
        onChange={(e) => setLink(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option value={cat.name}>{cat.name.toUpperCase()}</option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

export default NewPostForm;
