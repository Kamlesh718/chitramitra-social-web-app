import supabase, { supabaseUrl } from "./supabase";

export async function signup({
  username,
  email,
  password,
  profileImage,
  fullName,
}) {
  if (username.length <= 2)
    throw new Error("Username should be more than 2 chars");

  const { data: existingUsername, error: existingUsernameError } =
    await supabase.from("profiles").select("username").eq("username", username);

  if (existingUsernameError) throw new Error(existingUsernameError.message);

  if (existingUsername.length > 0) throw new Error("Username already exists");

  const profileImageName = `${Math.random()}-${profileImage.name}`;
  const { data: user, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        profile_image_url: `${supabaseUrl}/storage/v1/object/public/profile-image/${profileImageName}`,
      },
    },
  });
  const id = user.user;

  const { error: uploadError } = await supabase.storage
    .from("profile-image")
    .upload(profileImageName, profileImage);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  if (signUpError) {
    throw new Error(signUpError.message);
  }

  const { error: profileError } = await supabase.from("profiles").insert([
    {
      id: id.id,
      username: username,
      fullname: fullName,
      avatar: `${supabaseUrl}/storage/v1/object/public/profile-image/${profileImageName}`,
    },
  ]);

  if (profileError) {
    throw new Error(profileError.message);
  }
}

export async function signin({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function signout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function getUsername(id) {
  let { data: profiles, error } = await supabase
    .from("profiles")
    .select("username,fullname,bio,avatar")
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return profiles;
}

export async function updateUsername({ id, username }) {
  if (username !== "") {
    const { data, error } = await supabase
      .from("profiles")
      .update({ username })
      .eq("id", id);

    const { error: followError1 } = await supabase
      .from("follows")
      .update({ followed_username: username })
      .eq("followed_id", id);

    const { error: followError2 } = await supabase
      .from("follows")
      .update({ follower_username: username })
      .eq("follower_id", id);

    const { error: postError } = await supabase
      .from("posts")
      .update({ username: username })
      .eq("user_id", id);

    const { error: commentError } = await supabase
      .from("comments")
      .update({ username: username })
      .eq("user_id", id);

    if (followError1) throw new Error(followError1.message);
    if (followError2) throw new Error(followError2.message);
    if (postError) throw new Error(followError2.message);
    if (commentError) throw new Error(followError2.message);

    if (error) throw new Error(error);
    return data;
  }
}

export async function updateBio({ id, bio }) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ bio })
    .eq("id", id);

  if (error) throw new Error(error);
  return data;
}
export async function updateProfileImage({ id, avatar, oldAvatar }) {
  const fileName = `avatar-${id}-${Math.random()}`;

  const { error: storageError1 } = await supabase.storage
    .from("profile-image")
    .remove([oldAvatar]);

  if (storageError1) throw new Error(storageError2.message);

  const { error: storageError2 } = await supabase.storage
    .from("profile-image")
    .upload(fileName, avatar);

  if (storageError2) throw new Error(storageError2.message);

  // 3.Update avatar in user
  const { data: updatedAvatar, error: error2 } = await supabase.auth.updateUser(
    {
      data: {
        profile_image_url: `${supabaseUrl}/storage/v1/object/public/profile-image/${fileName}`,
      },
    }
  );

  if (error2) throw new Error(error2.message);

  // const newAvatarUrl = `${supabaseUrl}/storage/v1/object/public/profile-image/${fileName}`;

  // Update avatar in profiles table
  const { data: updatedAvatar2, error: error3 } = await supabase
    .from("profiles")
    .update({
      avatar: `${supabaseUrl}/storage/v1/object/public/profile-image/${fileName}`,
    })
    .eq("id", id);

  if (error3) throw new Error(error2.message);
  // Update avatar in comments table
  const { data: updatedAvatar3, error: error4 } = await supabase
    .from("comments")
    .update({
      avatar: `${supabaseUrl}/storage/v1/object/public/profile-image/${fileName}`,
    })
    .eq("user_id", id);

  if (error4) throw new Error(error2.message);

  // Update avatar in follows table
  const { error: followError1 } = await supabase
    .from("follows")
    .update({
      followed_avatar: `${supabaseUrl}/storage/v1/object/public/profile-image/${fileName}`,
    })
    .eq("followed_id", id);

  const { error: followError2 } = await supabase
    .from("follows")
    .update({
      follower_avatar: `${supabaseUrl}/storage/v1/object/public/profile-image/${fileName}`,
    })
    .eq("follower_id", id);

  const { error: postError } = await supabase
    .from("posts")
    .update({
      avatar: `${supabaseUrl}/storage/v1/object/public/profile-image/${fileName}`,
    })
    .eq("user_id", id);

  if (followError1) throw new Error(followError1.message);
  if (followError2) throw new Error(followError2.message);
  if (postError) throw new Error(postError.message);

  return updatedAvatar2, updatedAvatar, updatedAvatar3;
}

export async function updatePassword(password) {
  if (password.length < 8) throw new error("Password length should be 8");
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw new Error(error);
}
