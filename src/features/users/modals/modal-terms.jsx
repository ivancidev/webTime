import CloseIcon from "../../../icons/close";

const TermsModal = ({ onClose }) => {
  const termsText = `
  
Última actualización: 29/10/2024

Bienvenido a WebTime. Al acceder a nuestro sitio web y utilizar nuestros servicios, aceptas cumplir y estar sujeto a los siguientes Términos y Condiciones. Si no estás de acuerdo con alguno de los términos aquí descritos, te recomendamos no utilizar nuestros servicios.

1. Descripción del Servicio

WebTime es una plataforma en línea dedicada al aprendizaje de desarrollo web, que ofrece una colección de libros y audiolibros sobre programación y tecnología web. Nuestro objetivo es facilitar el acceso a contenido relevante y estructurado para que usuarios de todos los niveles, especialmente principiantes e intermedios, puedan mejorar sus habilidades de programación de manera efectiva.

2. Aceptación de los Términos

Al utilizar WebTime, aceptas cumplir con estos Términos y Condiciones. WebTime se reserva el derecho de modificar estos términos en cualquier momento. Se te notificará de cualquier cambio, y tu uso continuado del servicio después de dichos cambios implica la aceptación de los nuevos términos.

3. Registro y Cuenta

Para acceder a ciertos servicios de WebTime, deberás crear una cuenta proporcionando información veraz y completa. Es tu responsabilidad mantener la confidencialidad de tus credenciales de inicio de sesión y notificar a WebTime de inmediato si detectas cualquier uso no autorizado de tu cuenta.

4. Uso del Contenido

El contenido de WebTime, incluyendo libros y audiolibros, es únicamente para uso personal y educativo. No está permitido distribuir, modificar, reproducir o explotar el contenido sin autorización previa por escrito de WebTime. Todos los derechos de autor y otros derechos de propiedad intelectual de los materiales en WebTime pertenecen a sus respectivos autores o a WebTime, según corresponda.

5. Licencia de Uso

WebTime otorga a los usuarios una licencia limitada, no exclusiva y no transferible para acceder y utilizar el contenido de acuerdo con estos Términos y Condiciones. Cualquier violación de esta licencia puede resultar en la suspensión o cancelación de tu cuenta.

6. Responsabilidades del Usuario

- No utilizarás WebTime para actividades ilegales o no autorizadas.
- No intentarás hackear, interrumpir o dañar la plataforma.
- No compartirás tu cuenta o el contenido con terceros no autorizados.

7. Limitación de Responsabilidad

WebTime no se hace responsable de los daños o perjuicios derivados del uso de los materiales proporcionados en la plataforma. La información en WebTime se ofrece "tal cual" y no garantiza la precisión o actualización del contenido.

8. Modificaciones al Servicio

WebTime se reserva el derecho de modificar o descontinuar, temporal o permanentemente, cualquiera de sus servicios sin previo aviso. Haremos todo lo posible para notificar a los usuarios en caso de cambios significativos.

9. Cancelación y Terminación

Puedes cancelar tu cuenta en cualquier momento desde la configuración de tu perfil. WebTime también se reserva el derecho de suspender o cancelar cuentas que violen estos Términos y Condiciones.

10. Propiedad Intelectual

Todo el contenido de WebTime, incluyendo diseño, gráficos, texto y otros elementos visuales, es propiedad exclusiva de WebTime o de los proveedores de contenido. Cualquier uso no autorizado de estos materiales constituye una violación de derechos de autor.

Al utilizar WebTime, reconoces que has leído, comprendido y aceptado estos Términos y Condiciones.
  `;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-neu1 bg-opacity-30 z-50">
      <div className="relative w-full sm:w-3/4 md:w-3/5 h-screen sm:max-h-[80vh] bg-primary-pri3 rounded-xl shadow-lg">
        <div className="sticky top-0 w-full flex justify-end p-2 z-10">
          <button
            onClick={onClose}
            className="w-8 h-8 bg-combColBlack2 rounded-full flex items-center justify-center hover:bg-opacity-80"
          >
            <CloseIcon className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto h-[87%] sm:max-h-[70vh]">
          <h2 className="font-body text-body-md font-bold text-primary-pri1 px-2">
            Términos y Condiciones
          </h2>
          <p className="font-body text-body-sm text-primary-pri1 p-2 whitespace-pre-line">
            {termsText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
