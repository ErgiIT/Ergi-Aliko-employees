import React, { useState } from "react";
import EmployeeProjects from "./components/Employee/EmployeeProjects";
import CSVInput from "./components/CSV/CSVInput";
import { Navbar } from "./components/Navbar/Navbar";

export default function App() {
  const [emplArray, setEmplArray] = useState(null);

  const handleData = (data) => {
    setEmplArray(data);
  };

  return (
    <div>
      <Navbar />
      {emplArray && <EmployeeProjects emplArray={emplArray} />}
      <CSVInput handleData={handleData} />
    </div>
  );
}
