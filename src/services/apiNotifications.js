import supabase from "../services/supabase";

export function setupMessageNotifications(handleNotification) {
  const messageListener = supabase
    .from("messages")
    .on("INSERT", (payload) => {
      const { new: message } = payload;
      handleNotification(message);
    })
    .subscribe();

  return messageListener;
}

export function unsubscribeMessageNotifications(listener) {
  if (listener) {
    listener.unsubscribe();
  }
}

export function subscribeToMessagesFromUser(specificUsername) {
  const subscription = supabase
    .channel("messages")
    .on("INSERT", (payload) => {
      const newMessage = payload.new;
      if (newMessage.sender_username === specificUsername) {
        console.log("You got a new notifications", newMessage); // Call the provided callback function with the new message
      }
    })
    .subscribe();

  return subscription;
}
subscribeToMessagesFromUser("Kamlesh");
