import supabase from "./supabase";

export async function fetchUsers(search) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id,username,bio,avatar")
      .ilike("username", `%${search}%`);

    if (error) throw new Error(error.message);
    return data || [];
  } catch (err) {
    throw new Error(`${err.message} or check your internet connection`);
  }
}

export async function fetchFollowing(follower_username) {
  const { data, error } = await supabase
    .from("follows")
    .select("id,followed_username,followed_avatar")
    .eq("follower_username", follower_username)
    .eq("status", true);

  if (error) throw new Error(error.message);

  return data.map((f) => f);
}

export async function fetchFollowers(followed_username) {
  const { data, error } = await supabase
    .from("follows")
    .select("follower_username,followed_username,followed_avatar,status")
    .eq("followed_username", followed_username)
    .eq("status", true);

  if (error) throw new Error(error.message);

  return data;
}

export async function followUser({
  followed_id,
  follower_id,
  follower_username,
  followed_username,
  followed_avatar,
}) {
  // Check if the follow relationship already exists
  const { data, error } = await supabase
    .from("follows")
    .select("status")
    .eq("follower_username", follower_username)
    .eq("followed_username", followed_username)
    .eq("follower_id", follower_id)
    .eq("followed_id", followed_id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // No existing relationship, insert a new one
      const { error: insertError } = await supabase.from("follows").insert({
        follower_username,
        followed_username,
        followed_avatar,
        followed_id,
        follower_id,
        unique_id: `-${follower_username}**${followed_username}-`,
        status: true,
      });

      if (insertError) throw new Error(insertError.message);
    } else {
      throw new Error(error.message);
    }
  } else if (data.status === false) {
    // Existing relationship, just update the status
    const { error: updateError } = await supabase
      .from("follows")
      .update({ status: true })
      .eq("follower_username", follower_username)
      .eq("followed_username", followed_username)
      .eq("follower_id", follower_id)
      .eq("followed_id", followed_id);

    if (updateError) throw new Error(updateError.message);
  }
}

export async function fetchStatus(unique_id) {
  try {
    const { data, error } = await supabase
      .from("follows")
      .select("status")
      .eq("unique_id", unique_id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("No data found for the unique_id.");
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function unfollowUser({
  follower_username,
  followed_username,
  followed_id,
  follower_id,
}) {
  const { error } = await supabase
    .from("follows")
    .update({ status: false })
    .eq("follower_username", follower_username)
    .eq("followed_username", followed_username)
    .eq("follower_id", follower_id)
    .eq("followed_id", followed_id);

  if (error) throw new Error(error.message);
}

export async function getUniqueId(unique_id) {
  const { data, error } = await supabase
    .from("follows")
    .select("unique_id")
    .eq("unique_id", unique_id);
  if (error) throw new Error(error.message);

  return data;
}
