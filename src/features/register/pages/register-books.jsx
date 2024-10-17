import FormBook from "../components/form-book";
import { Navbar } from "../components/navbar";

export const Register = () => {
  return (
    <div className=" min-h-screen flex flex-col bg-primary">      
      {/* <Navbar /> */}
      <main className="flex-grow">
        <FormBook />
      </main>
    </div>
  );
};
