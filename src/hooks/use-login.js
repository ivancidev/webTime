import { useState } from 'react';
import { supabase } from '../services/supabaseClient';

export const useLogin = () => {
  const [error, setError] = useState(null);

  const login = async (usernameOrEmail, password) => {
    try {
      const { data, error } = await supabase
        .from('usuario') 
        .select('*')
        .or(`nombre_usuario.eq.${usernameOrEmail},correo.eq.${usernameOrEmail}`)
        .eq('password', password);

      if (error) {
        setError(error.message);
        return false;
      }

      if (data.length > 0) {
        const user = data[0];

        localStorage.setItem('user', JSON.stringify(user));

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
