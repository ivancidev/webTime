// src/hooks/use-login.js

import { useState } from 'react';
import { supabase } from '../services/supabaseClient';

export const useLogin = () => {
  const [error, setError] = useState(null);

  const login = async (usernameOrEmail, password) => {
    try {
      // Realiza la consulta a la tabla 'usuario'
      const { data, error } = await supabase
        .from('usuario') // Nombre de la tabla en tu base de datos
        .select('*')
        .or(`nombre_usuario.eq.${usernameOrEmail},correo.eq.${usernameOrEmail}`)
        .eq('password', password);

      if (error) {
        setError(error.message);
        return false;
      }

      if (data.length > 0) {
        const user = data[0];

        // Almacena el usuario en localStorage (puedes ajustar esto según tus necesidades)
        localStorage.setItem('user', JSON.stringify(user));

        // Si tienes un token JWT devuelto por el backend, podrías almacenarlo aquí
        // localStorage.setItem('token', token);

        return true;
      } else {
        setError('Credenciales incorrectas');
        return false;
      }
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  return { login, error };
};
