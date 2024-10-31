import { supabase } from "./supabaseClient";

export const registerUser = async ({
  name,
  nickname,
  email,
  password,
  imageFile,
}) => {
  try {
    let imageUrl = null;
    if (imageFile) {
      const { data, error } = await supabase.storage
        .from("imagenes")
        .upload(`${Date.now()}_${imageFile.name}`, imageFile);

      if (error) throw error;
      const { data: publicURL, error: errorURL } = supabase.storage
        .from("imagenes")
        .getPublicUrl(data.path);

      if (errorURL) {
        console.error(`Error getting public URL for ${fileName}:`, errorURL);
        throw errorURL;
      }

      imageUrl = publicURL.publicUrl;
    }

    const { error: insertError } = await supabase.from("usuario").insert([
      {
        nombre: name,
        nombre_usuario: nickname,
        correo: email,
        password: password,
        avatar: imageUrl,
      },
    ]);
    if (insertError) throw insertError;

    return { success: true, message: "Registrado correctamente" };
  } catch (error) {
    console.log(error.message);
    return { success: false, message: error.message };
  }
};
