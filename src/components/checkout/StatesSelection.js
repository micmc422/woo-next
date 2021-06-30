import PropTypes from "prop-types";
import { memo } from "react";
import cx from "classnames";

import Abbr from "./form-elements/Abbr";
import Error from "./Error";

const StateSelection = ({
  input,
  states,
  isFetchingStates,
  isShipping,
  onChange,
}) => {
  const { state, errors } = input || {};

  const inputId = `state-${isShipping ? "shipping" : "billing"}`;

  if (isFetchingStates) {
    // Show loading component.
    return (
      <div className="FormRow">
        <label className="FormRowLabel">State/County</label>
        <select
          disabled
          value=""
          name="state"
          className="FormRowInput"
          onChange={onChange}
        >
          <option value="">Loading...</option>
        </select>
      </div>
    );
  }

  if (!states.length) {
    return null;
  }

  return (
    <div className="FormRow">
      <label className="FormRowLabel" htmlFor={inputId}>
        State/County
      </label>
      <select
        disabled={isFetchingStates}
        onChange={onChange}
        value={state}
        name="state"
        className={cx("FormRowInput", { "opacity-50": isFetchingStates })}
        id={inputId}
      >
        <option value="">Select a state...</option>
        {states.map((state, index) => (
          <option
            key={state?.stateCode ?? index}
            value={state?.stateName ?? ""}
          >
            {state?.stateName}
          </option>
        ))}
      </select>
    </div>
  );
};

StateSelection.propTypes = {
  handleOnChange: PropTypes.func,
  input: PropTypes.object,
  states: PropTypes.array,
  isFetchingStates: PropTypes.bool,
  isShipping: PropTypes.bool,
};

StateSelection.defaultProps = {
  handleOnChange: () => null,
  input: {},
  states: [],
  isFetchingStates: false,
  isShipping: true,
};

export default memo(StateSelection);
