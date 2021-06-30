import Error from "./Error";
import { isEmpty, map } from "lodash";
import Abbr from "./form-elements/Abbr";
import ArrowDown from "../icons/ArrowDown";
import { ThemeTitre } from "../themeComponents";

const CountrySelection = ({ input, onChange, countries, isShipping }) => {
  const { country, errors } = input || {};

  const inputId = `country-${isShipping ? "shipping" : "billing"}`;

  return (
    <div className="FormRow">
      <label className="FormRowLabel" htmlFor={inputId}>
        Country
      </label>
      <select
        value={country}
        name="country"
        className="FormRowInput"
        id={inputId}
        onChange={onChange}

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
    </div>
  );
};

export default CountrySelection;
