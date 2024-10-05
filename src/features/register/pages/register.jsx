import React, { useState } from "react";
import FormBook from "../components/form-book";
import FooterButtons from "../components/footer-buttons";

export const Register = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">
        <FormBook />
      </main>
      <FooterButtons />
    </div>
  );
};
