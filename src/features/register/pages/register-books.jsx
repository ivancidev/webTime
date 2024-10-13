import FormBook from "../components/form-book";
import { Navbar } from "../components/navbar";

export const Register = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <FormBook />
      </main>
    </div>
  );
};
