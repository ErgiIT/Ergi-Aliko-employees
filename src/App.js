import React, { useState } from "react";
import CSVReader from "react-csv-reader";
import EmployeeProjects from "./components/EmployeeProjects";

export default function App() {
  const [emplArray, setEmplArray] = useState(null);

  const handleData = (data) => {
    setEmplArray(data);
  };

  return (
    <div>
      {emplArray && <EmployeeProjects emplArray={emplArray} />}
      <CSVReader
        onFileLoaded={handleData}
        inputStyle={{
          color: "#9c27b0",
          fontSize: "20px",
          margin: "auto",
          fontWeight: "bolder",
          width: "fit-content",
        }}
      />
    </div>
  );
}
