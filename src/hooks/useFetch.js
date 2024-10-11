import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

export const useFetch = (table, columns = "*") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: fetchData, error } = await supabase
          .from(table)
          .select(columns);

        if (error) throw error;
        setData(fetchData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [table, columns]);

  return { data, loading, error };
};
