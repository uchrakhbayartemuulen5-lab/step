"use client";
import { useState } from "react";
const addSteponeValuesLocalStorage = (values) => {
  localStorage.setItem("Stepthree", JSON.stringify(values));
};
export const Stepthree = (props) => {
  const { handleBackStep } = props;
  const { handleNextStep } = props;

  const getSteponeValuesFromLocalStorege = () => {
    const values = localStorage.getItem("Stepthree");

    if (values) {
      return JSON.parse(values);
    } else {
      return {
        dateofBirth: "",
        profileImage: "",
      };
    }
  };
  const [values, setValues] = useState(getSteponeValuesFromLocalStorege());

  const handleinput = (event) => {
    const newObj3 = { ...values, [event.target.name]: event.target.value };
    setValues(newObj3);
  };
  const [errorstate, setErrorState] = useState({});
  const [imgUrl, setImgUrl] = useState(null);

  const validateInput = () => {
    const errors = {};
    if (values.dateofBirth.length == 0) {
      errors.dateofBirth = "Please select a date.";
    } else {
      const today = new Date();
      const todays = new Date(values.dateofBirth);

      let age = today.getFullYear() - todays.getFullYear();
      const monthdiff = today.getMonth() - todays.getMonth();
      const todaydiff = today.getDate() - todays.getDate();
      if (monthdiff < 0 || (monthdiff == 0 && todaydiff < 0)) {
        age--;
      }

      if (age < 18) {
        errors.dateofBirth = "error";
      }
    }
    if (values.profileImage == 0) {
      errors.profileImage = "Image cannot be blank.";
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

  const handleImage = (event) => {
    const file = event.target.files[0];
    const newObj3 = { ...values, [event.target.name]: event.target.value };
    setValues(newObj3);
    if (file) {
      setImgUrl(URL.createObjectURL(file));
    }
  };

  const shouldDisabledButton = () => {
    return values.dateofBirth === 0 || values.profileImage == null;
  };
  console.log("haha", values);
  console.log("hehe", imgUrl);

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

          <div className="formcont4">
            <div className="textfield1">
              <div className="label">
                Date of birth
                <p className="sign">*</p>
              </div>
              <input
                type="date"
                className="inputcont"
                name="dateofBirth"
                placeholder="Placeholder"
                value={values.dateofBirth}
                onChange={handleinput}
              ></input>
              {errorstate && (
                <div
                  style={{ color: "red", fontSize: "10px", marginLeft: "3px" }}
                >
                  {errorstate.dateofBirth}
                </div>
              )}
            </div>
          </div>

          <div className="formcont4-1">
            <div className="textfield1">
              <div className="label">
                Profile image
                <p className="sign">*</p>
              </div>
              {!imgUrl ? (
                <div className="inputfile">
                  <label className="customFile">
                    {" "}
                    Add image
                    <input
                      type="file"
                      name="profileImage"
                      onChange={handleImage}
                    ></input>{" "}
                  </label>
                </div>
              ) : (
                <img
                  style={{
                    width: "100%",
                    height: "150px",
                    borderRadius: "10px",
                    border: "none",
                  }}
                  src={imgUrl ? imgUrl : values.profileImage}
                />
              )}
            </div>
            {errorstate && (
              <div
                style={{
                  color: "red",
                  fontSize: "10px",
                  marginLeft: "3px",
                  marginTop: "5px",
                }}
              >
                {errorstate.profileImage}
              </div>
            )}
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
            <div>Continue</div>
            <div> 3/3 </div>
          </button>
        </div>
      </div>
    </div>
  );
};
