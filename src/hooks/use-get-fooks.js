import { supabase } from "../services/supabaseClient";
import { useQuery } from "@tanstack/react-query";

export const useGetData = () => {
  return useQuery(["books"], async () => {
    const { data, error } = await supabase.from("libro").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  });
};
