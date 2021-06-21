import Error from "../Error";
import PropTypes from "prop-types";
import Abbr from "./Abbr";
import { ThemeTitre } from "../../themeComponents";

const InputField = ({
  handleOnChange,
  inputValue,
  name,
  type,
  label,
  errors,
  placeholder,
  required,
  containerClassNames,
  isShipping,
}) => {
  const inputId = `${name}-${isShipping ? "shipping" : ""}`;

  return (
    <div className={containerClassNames}>
      <label className="text-sm leading-7 text-gray-600" htmlFor={inputId}>
        <ThemeTitre>
          {label || ""}<Abbr required={required} />
        </ThemeTitre>
      </label>
      <input
        onChange={handleOnChange}
        value={inputValue}
        placeholder={placeholder}
        type={type}
        name={name}
        className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border-0 border-b-2 border-gray-300 outline-none focus:bg-transparent focus:border-gray-500"
        id={inputId}
      />
      <Error errors={errors} fieldName={name} />
    </div>
  );
};

InputField.propTypes = {
  handleOnChange: PropTypes.func,
  inputValue: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  errors: PropTypes.object,
  required: PropTypes.bool,
  containerClassNames: PropTypes.string,
};

InputField.defaultProps = {
  handleOnChange: () => null,
  inputValue: "",
  name: "",
  type: "text",
  label: "",
  placeholder: "",
  errors: {},
  required: false,
  containerClassNames: "",
};

export default InputField;
