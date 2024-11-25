const API_URL = import.meta.env.VITE_API_URL;
export const sendEmail = async (email, url) => {
  try {
    const response = await fetch(`${API_URL}/send-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, url }),
    });

    console.log("Código enviado correctamente al servidor.");
  } catch (error) {
    throw error;
  }
};
