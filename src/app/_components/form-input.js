export const FormInput = (props) => {
  const { inputTag, name, handlechange, value, error, errormessage, type } =
    props;
  return (
    <div className="textfield1">
      <div className="label">
        {inputTag}
        <p className="sign">*</p>
      </div>
      <input
        className={error ? "inputcontError" : "inputcont"}
        name={name}
        placeholder="Placeholder"
        value={value}
        type={type || "text"}
        onChange={handlechange}
      ></input>
      {error && (
        <div style={{ color: "red", fontSize: "10px", marginLeft: "3px" }}>
          {errormessage}
        </div>
      )}
    </div>
  );
};
