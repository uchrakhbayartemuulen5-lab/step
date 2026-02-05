"use client";
import "./page.css";
import { Stepone } from "./features/Stepone";
import { Steptwo } from "./features/Steptwo";
import { Stepthree } from "./features/Stepthree";
import { Stepfour } from "./features/Stepfour";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handleBackStep = () => {
    if (step === 1) {
      return;
    } else {
      setStep(step - 1);
    }
  };
  return (
    <>
      {" "}
      {step === 1 && <Stepone handleNextStep={handleNextStep} />}{" "}
      {step === 2 && (
        <Steptwo
          handleBackStep={handleBackStep}
          handleNextStep={handleNextStep}
        />
      )}
      {step === 3 && (
        <Stepthree
          handleBackStep={handleBackStep}
          handleNextStep={handleNextStep}
        />
      )}
      {step === 4 && <Stepfour />}
    </>
  );
}
