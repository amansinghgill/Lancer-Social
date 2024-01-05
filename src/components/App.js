import { useEffect, useState } from "react";
import supabase from "../supabase/supabase";
import "../style.css";

import Loader from "./Loader";
import Header from "./Header";
import NewPostForm from "./NewPostForm";
import CategoryFilter from "./CategoryFilter";
import PostList from "./PostList";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      async function getPosts() {
        setIsLoading(true);

        let query = supabase.from("posts").select("*");

        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);

        const { data: posts, error } = await query
          .order("votesUp", { ascending: false })
          .limit(1000);
        if (!error) setPosts(posts);
        else alert("There was a problem getting data");
        setIsLoading(false);
      }
      getPosts();
    },
    [currentCategory]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewPostForm setPosts={setPosts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <PostList posts={posts} setPosts={setPosts} />
        )}
      </main>
    </>
  );
}

export default App;
