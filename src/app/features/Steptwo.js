  "use client";
  import { useState } from "react";
  import { FormInput } from "../_components/form-input";
  const checkinputHasSpecial = (string) => {
    return /[!#$%^&*(),?":{}<>]/.test(string);
  };
  const checkIfInputHasCharacters = (string) => {
    return /^\d+$/.test(string);
  };
  const checkHasSpecial = (string) => {
    return /[!%^*(),.?":{}<>]/.test(string);
  };
  const check = (string) => {
    return /[@]/.test(string);
  };
  const addSteponeValuesLocalStorage = (values) => {
    localStorage.setItem("Steptwo", JSON.stringify(values));
  };
  export const Steptwo = (props) => {
    const { handleBackStep } = props;
    const { handleNextStep } = props;

    const getSteponeValuesFromLocalStorege = () => {
      const values = localStorage.getItem("Steptwo");
      if (values) {
        return JSON.parse(values);
      } else {
        return {
          email: "",
          phonenumber: "",
          password: "",
          confirmpassword: "",
        };
      }
    };

    const [values, setValues] = useState(getSteponeValuesFromLocalStorege());
    const handleinput = (event) => {
      const newObj2 = { ...values, [event.target.name]: event.target.value };
      setValues(newObj2);
    };
    const [errorstate, setErrorState] = useState({});

    const validateInput = () => {
      const errors = {};

      if (!values.email.trim()) {
        errors.email = "email is required";
      } else if (checkinputHasSpecial(values.email)) {
        errors.email = "Please provide a valid email address.";
      } else if (!check(values.email)) {
        errors.email = "@ not found it";
      }

      if (!values.phonenumber.trim()) {
        errors.phonenumber = "phone number is required";
      } else if (!checkIfInputHasCharacters(values.phonenumber)) {
        errors.phonenumber = "Please enter a valid phone number.";
      } else if (values.phonenumber.length !== 8) {
        errors.phonenumber = "at least 8 numbers";
      }

      if (!values.password.trim()) {
        errors.password = "password is required";
      } else if (checkHasSpecial(values.password)) {
        errors.password = "Password must include letters and numbers.";
      }

      if (!values.confirmpassword.trim()) {
        errors.confirmpassword = "confirmpassword is required";
      } else if (values.confirmpassword !== values.password) {
        errors.confirmpassword = "Password do not match. Please try again.";
      }
      return errors;
    };
    const handleButtonClick = () => {
      const errors = validateInput();
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
        values.email === 0 ||
        values.phonenumber === 0 ||
        values.password === 0 ||
        values.confirmpassword === 0
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
                inputTag={"Email"}
                name={"email"}
                handlechange={handleinput}
                value={values.email}
                error={errorstate.email}
                errormessage={errorstate.email}
              />

              <FormInput
                inputTag={" Phone number"}
                name={"phonenumber"}
                handlechange={handleinput}
                value={values.phonenumber}
                error={errorstate.phonenumber}
                errormessage={errorstate.phonenumber}
              />

              <FormInput
                inputTag={"Password"}
                name={"password"}
                type={"password"}
                handlechange={handleinput}
                value={values.password}
                error={errorstate.password}
                errormessage={errorstate.password}
              />
              <FormInput
                inputTag={"Confirm password"}
                name={"confirmpassword"}
                type={"password"}
                handlechange={handleinput}
                value={values.confirmpassword}
                error={errorstate.confirmpassword}
                errormessage={errorstate.confirmpassword}
              />
              {/* <div className="textfield1">
                <div className="label">
                  Password
                  <p className="sign">*</p>
                </div>
                <input
                  className="inputcont"
                  name="password"
                  placeholder="Placeholder"
                ></input>
              </div>
              <div className="textfield1">
                <div className="label">
                  Confirm password
                  <p className="sign">*</p>
                </div>
                <input
                  className="inputcont"
                  name="confirmpassword"
                  placeholder="Placeholder"
                ></input>
              </div> */}
            </div>
          </div>

          <div className="buttoncontainer23">
            <button className="footerBack" type="submit" onClick={handleBackStep}>
              <div>Back</div>
            </button>
            <button
              className="footerContinue"
              disabled={shouldDisabledButton()}
              onClick={handleButtonClick}
            >
              <div>Continue </div>
              <div> 2/3 </div>
            </button>
          </div>
        </div>
      </div>
    );
  };
