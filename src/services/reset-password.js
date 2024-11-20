const API_URL = import.meta.env.VITE_API_URL;
export const sendVerificationCode = async (email) => {
  try {
    const response = await fetch(`${API_URL}/send-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    console.log("Código enviado correctamente al servidor.");
  } catch (error) {
    throw error;
  }
};
