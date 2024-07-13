import { dummyInstagramData as posts } from "../../dummy";
import HPNoPosts from "../components/HomepageNoPosts";
import PostList from "../components/PostList";

import { useFetchFollowedPosts } from "../hooks/posts/useFetchFollowedPosts";

function HomePage() {
  const { getFollowedPosts: following, isFetchingFollowedPosts } =
    useFetchFollowedPosts();

  return (
    <div className="mb-12 mt-2">
      {following?.length === 0 ? (
        <HPNoPosts />
      ) : (
        <PostList
          posts={posts}
          following={following}
          isFetchingFollowedPosts={isFetchingFollowedPosts}
        />
      )}
    </div>
  );
}

export default HomePage;
