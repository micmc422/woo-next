import Error from "./Error";
import { isEmpty, map } from "lodash";
import Abbr from "./form-elements/Abbr";
import ArrowDown from "../icons/ArrowDown";

const CountrySelection = ({ input, handleOnChange, countries, isShipping }) => {
  const { country, errors } = input || {};

  const inputId = `country-${isShipping ? "shipping" : "billing"}`;

  return (
    <div className="mb-3">
      <label className="text-sm leading-7 text-gray-700" htmlFor={inputId}>
        Country
        <Abbr required />
      </label>
      <div className="relative w-full border-none">
        <select
          onChange={handleOnChange}
          value={country}
          name="country"
          className="inline-block w-full py-3 pl-3 pr-8 leading-tight text-gray-500 bg-gray-100 bg-opacity-50 border-gray-500 rounded appearance-none border-b-1"
          id={inputId}
        >
          <option value="">Select a country...</option>
          {!isEmpty(countries) &&
            map(countries, (country) => (
              <option
                key={country?.countryCode}
                data-countrycode={country?.countryCode}
                value={country?.countryCode}
              >
                {country?.countryName}
              </option>
            ))}
        </select>
        <span
          className="absolute right-0 mr-1 text-gray-500"
          style={{ top: "25%" }}
        >
          <ArrowDown width={24} height={24} className="fill-current" />
        </span>
      </div>
      <Error errors={errors} fieldName={"country"} />
    </div>
  );
};

export default CountrySelection;
