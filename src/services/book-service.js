const URL = "http://localhost:4000";
export const fetchData = async (endpoint) => {
  const response = await fetch(`${URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  const data = await response.json();
  return data;
};
