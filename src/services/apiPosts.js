import supabase, { supabaseUrl } from "./supabase";

export async function getPosts() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Error fetching Posts");
  }

  return posts;
}

export async function deletePost({ id, oldImage }) {
  const { error: storageError } = await supabase.storage
    .from("post-image")
    .remove([oldImage]);

  const { error: likeError } = await supabase
    .from("likes")
    .delete()
    .eq("post_id", id);

  const { error: commentError } = await supabase
    .from("comments")
    .delete()
    .eq("post_id", id);

  if (likeError) {
    console.error(likeError.message);
    throw new Error(likeError.message);
  }
  if (storageError) {
    console.error(storageError.message);
    throw new Error(storageError.message);
  }
  if (commentError) {
    console.error(commentError.message);
    throw new Error(commentError.message);
  }

  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Error fetching Posts");
  }
}

export async function getIndividualPosts(username) {
  const { data, error } = await supabase
    .from("posts")
    .select("id,caption,image")
    .eq("username", username)
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Error fetching followed users");
  }
  return data;
}

export async function getSinglePostData(id) {
  const { data, error } = await supabase
    .from("posts")
    .select("image,caption,likes_count")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Error fetching followed users");
  }
  return data;
}

export async function updatePostCaption({ caption, id }) {
  const { error } = await supabase
    .from("posts")
    .update({ caption })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Error fetching followed users");
  }
}

export async function updatePostImage({ id, image, oldImage }) {
  const fileName = `image-${id}-${Math.random()}`;

  const { error: storageError1 } = await supabase.storage
    .from("post-image")
    .remove([oldImage]);

  if (storageError1) throw new Error(storageError.message);

  const { error: storageError } = await supabase.storage
    .from("post-image")
    .upload(fileName, image);

  if (storageError) throw new Error(storageError.message);

  // Update postImage in post table
  const { data: updatedImage, error: error } = await supabase
    .from("posts")
    .update({
      image: `${supabaseUrl}/storage/v1/object/public/post-image/${fileName}`,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  return updatedImage;
}

export async function getFollowedPosts(userId) {
  const { data: follows, error: followError } = await supabase
    .from("follows")
    .select("followed_id")
    .eq("follower_id", userId)
    .eq("status", true);

  if (followError) {
    console.error(followError);
    throw new Error("Error fetching followed users");
  }

  const followedIds = follows.map((follow) => follow.followed_id);

  const { data: posts, error: postError } = await supabase
    .from("posts")
    .select("*")
    .in("user_id", followedIds)
    .order("id", { ascending: true });

  if (postError) {
    console.error(postError);
    throw new Error("Error fetching followed posts");
  }

  return posts;
}

export async function addPosts({ caption, image, username, avatar, user_id }) {
  if (!image) {
    throw new Error("Image field are required to create a post ");
  }
  const hasImagePath = image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? image
    : `${supabaseUrl}/storage/v1/object/public/post-image/${imageName}`;

  // 1.Create Post
  let query = supabase.from("posts");

  // A)Create
  query = query.insert([
    {
      caption,
      image: imagePath,
      username,
      avatar,
      user_id,
    },
  ]);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Post could not be created!!");
  }

  // 2.Upload Image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("post-image")
    .upload(imageName, image);

  // 3.Delete the post if there is an error uploading an image
  if (storageError) {
    await supabase.from("posts").delete().eq(data.id);

    console.error(storageError);
    throw new Error(
      "Post image could not be uploaded,and the post was not created"
    );
  }

  return data;
}

export async function updateLikes({ post_id, user_id, liked }) {
  const { data: existingLikes, error: fetchError } = await supabase
    .from("likes")
    .select("id, liked")
    .eq("post_id", post_id)
    .eq("user_id", user_id);

  if (fetchError) {
    console.error(fetchError);
    throw new Error("Error fetching likes");
  }

  if (existingLikes.length > 0) {
    const { data: updatedLikes, error: updateError } = await supabase
      .from("likes")
      .upsert([
        {
          id: existingLikes[0].id,
          post_id,
          user_id,
          liked,
        },
      ])
      .select();

    if (updateError) {
      console.error(updateError);
      throw new Error("Error updating likes");
    }

    return updatedLikes;
  } else {
    const { data: newLikes, error: insertError } = await supabase
      .from("likes")
      .upsert([{ post_id, user_id, liked }])
      .select();

    if (insertError) {
      console.error(insertError);
      throw new Error("Error inserting likes");
    }

    return newLikes;
  }
}

export async function getLikes({ userId, postId }) {
  if (!userId) return;
  const { data: currentUserLikes, error } = await supabase
    .from("likes")
    .select("liked")
    .eq("user_id", userId)
    .eq("post_id", postId)
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error(error);
  }

  return currentUserLikes;
}

export async function updatePostLikes({ postId, likeCount }) {
  const { data, error } = await supabase
    .from("posts")
    .update({ likes_count: likeCount })
    .eq("id", postId);

  if (error) {
    console.error(error);
    throw new Error("Error fetching Posts");
  }

  return data;
}

export async function fetchComments(postId) {
  const { data, error } = await supabase
    .from("comments")
    .select("id,created_at,comment,username,avatar")
    .eq("post_id", postId);

  if (error) {
    console.error(error);
    throw new Error("Error fetching Posts");
  }

  return data;
}

export async function addComments({
  postId,
  comment,
  username,
  avatar,
  userId,
}) {
  const { error } = await supabase.from("comments").insert([
    {
      post_id: postId,
      comment,
      username,
      avatar,
      user_id: userId,
    },
  ]);

  if (error) {
    console.error(error);
    throw new Error("Error fetching Posts");
  }
}

export async function deleteComment(id) {
  const { error } = await supabase.from("comments").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Error fetching Posts");
  }
}
