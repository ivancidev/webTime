import { supabase } from "./supabaseClient";

export const forumsService = async () => {
  const { data, error } = await supabase.from("foro").select("*");

  
  if (error) {
    throw new Error(error.message);
  }

  return data;
};
