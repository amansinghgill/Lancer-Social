import Post from "./Post";

function PostList({ posts, setPosts }) {
  if (posts.length === 0)
    return (
      <p className="message">
        No posts for this category yet! Create the first one ✌️
      </p>
    );

  return (
    <section>
      <ul className="posts-list">
        {posts.map((post) => (
          <Post key={post.id} post={post} setPosts={setPosts} />
        ))}
      </ul>
    </section>
  );
}

export default PostList;
