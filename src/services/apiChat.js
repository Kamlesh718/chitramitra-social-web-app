import supabase from "./supabase";

export async function fetchMessages(currentUser, otherUser) {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select("id,content, sender_username, recipient_username, created_at")
      .or(
        `and(sender_username.eq.${currentUser},recipient_username.eq.${otherUser}),and(sender_username.eq.${otherUser},recipient_username.eq.${currentUser})`
      )
      .order("created_at", { ascending: true });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    return [];
  }
}

export async function sendMessage({ sender, recipient, content }) {
  if (!content) throw new Error("Message cannot be sent empty");
  try {
    const { error } = await supabase
      .from("messages")
      .insert([
        { sender_username: sender, recipient_username: recipient, content },
      ]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error sending message:", error.message);
    throw error;
  }
}

export async function deleteMessage(id) {
  const { error } = await supabase.from("messages").delete().eq("id", id);

  if (error) throw new Error(error);
}
