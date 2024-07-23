import React from "react";
import Form from "./components/Form";
import { useLocation } from "react-router-dom";
import FormRegister from "./components/Form-Register";
import { Toaster } from "sonner";

const MainAuth = () => {
  const { pathname } = useLocation();
  return (
    <div>
      {" "}
      <Toaster position="top-right"  richColors expand={false} />
      {pathname === "/" ? <Form /> : <FormRegister />}
    </div>
  );
};

export default MainAuth;
