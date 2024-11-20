import { supabase } from "./supabaseClient";

export const verifyResetCode = async (email, code) => {
  try {
    const { data, error } = await supabase
      .from("password_reset_codes")
      .select("*")
      .eq("email", email)
      .eq("code", code)
      .single();

    if (error || !data) {
      throw new Error("Código incorrecto o no encontrado.");
    }

    const currentTime = new Date();
    const expiresAt = new Date(data.expires_at);

    if (currentTime > expiresAt) {
      throw new Error("El código ha expirado. Por favor, solicita uno nuevo.");
    }

    return data;
  } catch (error) {
    throw error;
  }
};
