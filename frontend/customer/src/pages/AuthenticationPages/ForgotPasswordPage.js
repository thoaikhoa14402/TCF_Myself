import ForgotPasswordForm from "../../components/Authentication/ForgotPassword/ForgotPassword";
import ConfirmLetterForm from "../../components/Authentication/ForgotPassword/ConfirmLetter";
import NewPasswordForm from "../../components/Authentication/ForgotPassword/NewPassword";
import SuccessChangePasswordForm from "../../components/Authentication/ForgotPassword/SuccessChangePassword";
import { useState } from "react";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState({
    inputEmail: false,
    inputVerificationCode: false,
    inputNewPassword: false,
    success: false,
  });

  const setInputEmailStep = (status) => {
    setStep((prev) => ({ ...prev, inputEmail: status }));
  };

  const setInputVerificationCodeStep = (status) => {
    setStep((prev) => ({ ...prev, inputVerificationCode: status }));
  };

  const setInputNewPasswordStep = (status) => {
    setStep((prev) => ({ ...prev, inputNewPassword: status }));
  };

  return (
    <>
      {!step.inputEmail && (
        <ForgotPasswordForm isInputEmail={setInputEmailStep} />
      )}
      ;
      {!step.inputVerificationCode && step.inputEmail && (
        <ConfirmLetterForm
          isInputVerificationCodeStep={setInputVerificationCodeStep}
        />
      )}
      ;
      {!step.inputNewPassword && step.inputVerificationCode && (
        <NewPasswordForm isInputNewPassword={setInputNewPasswordStep} />
      )}
      ;
      {!step.SuccessChangePasswordForm && step.inputNewPassword && (
        <SuccessChangePasswordForm />
      )}
      ;
    </>
  );
};

export default ForgotPasswordPage;
