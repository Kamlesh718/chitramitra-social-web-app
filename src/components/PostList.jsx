import Post from "./Post";

function PostList({ following, isFetchingFollowedPosts }) {
  // const filteredPosts = posts.filter((post) =>
  //   following.includes(post.username)
  // );
  return (
    <div className="mb-12 mt-2 ">
      {following?.map((post) => (
        <Post
          key={post.id}
          post={post}
          isFetchingFollowedPosts={isFetchingFollowedPosts}
        />
      ))}
    </div>
  );
}

export default PostList;
