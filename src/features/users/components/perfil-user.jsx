export const PerfilUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <h1 className="text-secondary-sec2 font-title text-title-lg">
        Perfil de usuario
      </h1>
      <div className="mt-8 ml-8 flex md:flex-row flex-col">
        <div className="w-[140px] h-[140px] rounded-full overflow-hidden ml-5 md:ml-0">
          <img
            src={user?.avatar || "/src/assets/images/userDefault.jpg"}
            alt="Imagen de perfil"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:ml-[40px] mt-4 md:mt-0">
          <h2 className="font-title text-title-md mt-1">{user?.nombre}</h2>
          <h2 className="text-neutral-neu0 text-label-lg mt-3">
            @{user?.nombre_usuario}
          </h2>
          <h2 className="font-label text-neutral-neu0 text-label-lg mt-2">
            {user?.correo}
          </h2>
        </div>
      </div>
    </div>
  );
};

