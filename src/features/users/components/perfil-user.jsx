export const PerfilUser = () => {

    return (
        <div>
            <h1 className="text-secondary-sec2 font-title text-title-lg">Perfil de usuario</h1>

            <div className="mt-8 ml-8 flex md:flex-row flex-col">
                <div className="w-[120px] h-[120px] rounded-full overflow-hidden ml-20 md:ml-0">
                    <img src="/src/assets/images/userDefault.jpg" alt="Imagen de perfil" class="w-full h-full object-cover"/>
                </div>
                <div className="md:ml-[70px] mt-4 md:mt-0">
                    <h2 className="font-title text-title-md mt-1">nombre_completo</h2>
                    <h2 className="font-label text-label-lg mt-3">nickname</h2>
                    <h2 className="font-label text-label-lg mt-2">correoelectronico@gmail.com</h2>
                
                </div>
            </div>
        </div>
    ) 
}