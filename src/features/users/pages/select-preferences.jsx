import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/buttons/button";
import CheckS from "../../../icons/checkSmall";
import Preferences from "../components/preferences";
import { useGetTable } from "../../../hooks/use-get-table";
import { Navbar } from "../../register/components/navbar";
import { getLastUser } from "../../../utils/get-user-end";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { supabase } from "../../../services/supabaseClient";
import { Modal, CircularProgress } from "@mui/material";

export const SelectPreferences = () => {
  const { data: categories } = useGetTable("categoria");
  const { data: times } = useGetTable("tiempos_lectura");
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usuario = await getLastUser();
        setUser(usuario);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSelectCategory = (category, isSelected) => {
    setSelectedCategories((prevSelected) =>
      isSelected
        ? [...prevSelected, category]
        : prevSelected.filter(
            (item) => item.codCategoria !== category.codCategoria
          )
    );
  };

  const handleSelectTime = (time) => {
    setSelectedTime(time);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const onSubmit = async () => {
    if (selectedCategories.length === 0 || !selectedTime) {
      setSnackbar({
        open: true,
        message: "Selecciona al menos una categoría y un tiempo de lectura.",
        severity: "warning",
      });
      return;
    }

    if (!user || !user.id_usuario) {
      setSnackbar({
        open: true,
        message:
          "Error: Usuario no definido. Intenta iniciar sesión nuevamente.",
        severity: "error",
      });
      return;
    }

    setLoading(true);

    const categoryInsertions = selectedCategories.map(async (category) => {
      const { data, error } = await supabase
        .from("preferencias_categorias")
        .insert({
          id_usuario: user.id_usuario,
          codCategoria: category.codCategoria,
        });

      if (error) {
        console.error("Error al insertar categoría:", error);
        return { error };
      }

      return data;
    });

    const { data: timeData, error: timeError } = await supabase
      .from("preferencias_tiempos")
      .insert({
        id_usuario: user.id_usuario,
        id_tiempo_lectura: selectedTime.id_tiempo_lectura,
      });

    try {
      const categoryResponses = await Promise.all(categoryInsertions);

      const hasCategoryErrors = categoryResponses.some(
        (response) => response && response.error
      );

      if (hasCategoryErrors || timeError) {
        const errorMessage = hasCategoryErrors
          ? "Error al guardar las categorías seleccionadas."
          : "Error al guardar el tiempo de lectura: " + timeError.message;

        setSnackbar({ open: true, message: errorMessage, severity: "error" });
        return;
      }

      setSnackbar({
        open: true,
        message: "Preferencias guardadas con éxito.",
        severity: "success",
      });
      navigate("/", { state: { selectedCategories, selectedTime } });
    } catch (error) {
      console.error("Error en la inserción de preferencias:", error);
      setSnackbar({
        open: true,
        message: "Hubo un error inesperado al guardar las preferencias.",
        severity: "error",
      });
    } finally {
      // Cierra el modal de carga
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col">
        <Preferences
          text="Elige las categorías de tu interés"
          icons={categories}
          variant="c"
          onSelect={handleSelectCategory}
        />
        <Preferences
          text="Tiempo de lectura preferido"
          icons={times}
          variant="t"
          onSelect={(text, isSelected) =>
            isSelected ? handleSelectTime(text) : setSelectedTime(null)
          }
        />
      </div>
      <div className="flex justify-end pr-20 mt-16">
        <Button SvgIcon={CheckS} text="Aplicar" onClick={onSubmit} />
      </div>

      <Modal open={loading}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
