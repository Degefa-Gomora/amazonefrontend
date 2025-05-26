// Importing React to define a functional component
import React from "react";

// Importing 'numeral' library to format numbers as currency
import numeral from "numeral";

// Functional component to format and display currency values
// Props: 'amount' is the numeric value to be formatted
const CurrencyFormat = ({ amount }) => {
  // Formatting the amount into currency using numeral
  // Format explanation: "$0,0.00"
  // - $: prefix dollar sign
  // - 0,0: adds comma as thousands separator
  // - .00: forces two decimal places
  const formattedAmount = numeral(amount).format("$0,0.00");

  // Displaying the formatted amount inside a <div>
  return <div>{formattedAmount}</div>;
};

// Exporting the component for use in other parts of the app
export default CurrencyFormat;
