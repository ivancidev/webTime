import { CarouselImg } from "../components/carousel-img";
import { FormUser } from "../components/form-user";

export const RegisterUser = () => {
  return (
    <div className="flex min-h-screen justify-center lg:justify-between items-center bg-primary m-5 md:m-0">
      <div className="w-full lg:w-[65%]">
        <FormUser />
      </div>
      <div className="hidden lg:flex items-center justify-end w-[500px]">
        <div className="h-full p-10 w-[55%] bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2">
          <div className="flex justify-end">
            <CarouselImg />
          </div>
        </div>
      </div>
    </div>
  );
};
