import { CarouselImg } from "../components/carousel-img";
import { FormUser } from "../components/form-user";

export const RegisterUser = () => {
  return (
    <div className="flex min-h-screen justify-evenly items-center bg-primary m-5 md:m-0">
      <div>
        <FormUser />
      </div>
      <div className="hidden lg:block">
        <CarouselImg />
      </div>
    </div>
  );
};
