import { useState } from "react";
import PhoneStep from "./EmailStep";
import CodeStep from "./CodeStep";
import PasswordStep from "./PasswordStep";
import logo from "@/assets/logo.png";
import resetImage from "@/assets/reset.png";
import AuthImageSide from "@/components/AuthImageSide/AuthImageSide";

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PhoneStep
            onNext={() => setStep(2)}
            setPhoneNumber={setPhoneNumber}
          />
        );
      case 2:
        return (
          <CodeStep
            onNext={() => setStep(3)}
            phone={phoneNumber}
            onBack={() => setStep(1)}
          />
        );
      case 3:
        return <PasswordStep phone={phoneNumber} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row items-center h-screen">
      <div className="flex-1 w-full flex justify-center items-center">
        <div className="w-[90%] xl:w-[70%] mx-auto p-8 md:p-10 bg-second rounded-2xl shadow-xl">
          <div className="w-full space-y-6">
            <img src={logo} alt="Logo" className="mx-auto" />
            <h2 className="text-center text-2xl font-semibold text-gray-700">
              {step === 1 && "Enter your email"}
              {step === 2 && "Enter verification code"}
              {step === 3 && "Set new password"}
            </h2>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    step === i ? "bg-main" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            {renderStep()}
          </div>
        </div>
      </div>
      <AuthImageSide image={resetImage} />
    </div>
  );
}
