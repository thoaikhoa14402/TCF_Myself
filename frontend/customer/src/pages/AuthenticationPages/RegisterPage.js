import RegisterForm from "../../components/Authentication/Register/RegisterForm";
import SuccessRegisterForm from "../../components/Authentication/Register/SuccessRegisterForm";
import { useState, useEffect } from "react";

const RegisterPage = () => {
  const [isRegistered, setIsRegister] = useState(false);

  const isRegisteredSuccessfully = (status) => {
    setIsRegister(status);
  };

  return (
    <>
      {!isRegistered && (
        <RegisterForm isRegistered={isRegisteredSuccessfully} />
      )}
      ;{isRegistered && <SuccessRegisterForm />}
    </>
  );
};

export default RegisterPage;
