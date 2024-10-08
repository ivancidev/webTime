import { useEffect, useState } from "react";
import { fetchData } from "../services/book-service";

export const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetcData = async () => {
      try {
        const data = await fetchData(endpoint);
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetcData();
  }, [endpoint]);

  return { data, loading, error };
};
