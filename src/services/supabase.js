import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabaseUrl = "https://eeyzznhybdqbybflfdce.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVleXp6bmh5YmRxYnliZmxmZGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0ODI0MDMsImV4cCI6MjAzNTA1ODQwM30.aZwNkv5nzqokyl3g5lF85nnQhFJM3PyKpSOPxdb0BfI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
