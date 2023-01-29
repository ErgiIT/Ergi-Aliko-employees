import React from "react";
import CSVReader from "react-csv-reader";
import "./CSVInput.css";

const CSVInput = ({ handleData }) => (
  <div className="container">
    <CSVReader
      onFileLoaded={handleData}
      inputStyle={{
        color: "ivory",
        fontSize: "20px",
        margin: "auto",
        fontWeight: "bolder",
        marginTop: "100px",
      }}
    />
  </div>
);

export default CSVInput;
