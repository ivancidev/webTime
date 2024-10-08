import React, { useState } from "react";
import FormBook from "../components/form-book";
import FooterButtons from "../components/footer-buttons";
import { Navbar } from "../components/navbar";

export const Register = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <FormBook />
      </main>
      <FooterButtons />
    </div>
  );
};
