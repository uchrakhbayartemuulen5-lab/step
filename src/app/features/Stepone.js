"use client";
import { useState } from "react";
import { FormInput } from "../_components/form-input";

const checkIfinputHasSpecialCharacters = (string) => {
  return /[!@#$%^&*(),.?":{}<>]/.test(string);
};

const checkIfinputHasNumbers = (string) => {
  return /\d/.test(string);
};
const addSteponeValuesLocalStorage = (values) => {
  localStorage.setItem("Stepone", JSON.stringify(values));
};
export const Stepone = (props) => {
  const { handleNextStep } = props;

  const getSteponeValuesFromLocalStorege = () => {
    const values = localStorage.getItem("Stepone");
    if (values) {
      return JSON.parse(values);
    } else {
      return {
        firstname: "",
        lastname: "",
        username: "",
      };
    }
  };
  const [values, setValues] = useState(getSteponeValuesFromLocalStorege());
  const handleinput = (event) => {
    const newObj = { ...values, [event.target.name]: event.target.value };
    setValues(newObj);
  };
  console.log(values);

  const [errorstate, setErrorState] = useState({});

  const validateInput = () => {
    const errors = {};
    if (
      checkIfinputHasSpecialCharacters(values.firstname) ||
      checkIfinputHasNumbers(values.firstname)
    ) {
      errors.firstname = "input should have only letters";
    }
    if (
      checkIfinputHasSpecialCharacters(values.lastname) ||
      checkIfinputHasNumbers(values.lastname)
    ) {
      errors.lastname = "input should have only letters";
    }
    if (
      checkIfinputHasSpecialCharacters(values.username) ||
      checkIfinputHasNumbers(values.username)
    ) {
      errors.username = "input should have only letters";
    }
    return errors;
  };

  const handleButtonClick = () => {
    const errors = validateInput();
    console.log(errors);
    if (Object.keys(errors).length === 0) {
      setErrorState({});
      addSteponeValuesLocalStorage(values);
      handleNextStep();
    } else {
      setErrorState(errors);
    }
  };

  const shouldDisabledButton = () => {
    return (
      values.firstname === 0 || values.lastname === 0 || values.username === 0
    );
  };
  return (
    <div className="container0">
      <div className="Formcontainer">
        <div className="container">
          <div className="formheader">
            <div className="Mainimage">
              <img src="./Main2.jpg" />
            </div>
            <div className="formtitle">Join Us!</div>
            <div className="formtitle1">
              Please provide all current information accurately.
            </div>
          </div>

          <div className="formcont">
            <FormInput
              inputTag={"First name"}
              name={"firstname"}
              handlechange={handleinput}
              value={values.firstname}
              error={errorstate.firstname}
              errormessage={
                "First name cannot contain special characters or numbers."
              }
            />
            <FormInput
              inputTag={"Last name"}
              name={"lastname"}
              handlechange={handleinput}
              value={values.lastname}
              error={errorstate.lastname}
              errormessage={
                "Last name cannot contain special characters or numbers."
              }
            />
            <FormInput
              inputTag={"Username"}
              name={"username"}
              handlechange={handleinput}
              value={values.username}
              error={errorstate.username}
              errormessage={
                "The Username is already taken. Plese choose another one."
              }
            />
          </div>
        </div>

        <div className="buttoncontainer">
          <button
            className="footer"
            disabled={shouldDisabledButton()}
            type="submit"
            onClick={handleButtonClick}
          >
            <div>Continue</div>
            <div> 1/3 </div>
          </button>
        </div>
      </div>
    </div>
  );
};
