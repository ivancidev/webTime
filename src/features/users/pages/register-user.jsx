import { CarouselImg } from "../components/carousel-img";
import { FormUser } from "../components/form-user";

export const RegisterUser = () => {
  return (
    <div className="flex min-h-screen justify-evenly items-center">
      <div>
        <FormUser />
      </div>
      <div>
        <CarouselImg />
      </div>
    </div>
  );
};
